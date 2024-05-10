import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/messaging";
import {
  updateOrderStatus,
  deleteDeliveredOrders,
  updateOrderConfirmation,
  saveToken,
} from "../utils/firebaseFunctions";
import OrderItem from "./OrderItem";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root"); 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useStateValue();
  const adminEmail = "beggachenassim6@gmail.com"; // Replace with your admin email
  const navigate = useNavigate();

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  
  const ordersRef = useRef();

  useEffect(() => {
    if (user && user.email === adminEmail) {
      const messaging = firebase.messaging();


      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          
          messaging
            .getToken()
            .then((token) => {
              console.log("FCM Token:", token);


              saveToken(token)
                .then(() => console.log("Token saved successfully"))
                .catch((error) => console.log("Error saving token:", error));
            })
            .catch((error) => {
              console.log("Error getting FCM token:", error);
            });
        }
      });

      const unsubscribe = firebase
        .firestore()
        .collection("orders")
        .orderBy("timestamp", "asc") 
        .onSnapshot((snapshot) => {
          const newOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

     
          setOrders(newOrders);
          const oldOrders = ordersRef.current;
          ordersRef.current = newOrders;


          if (oldOrders) {
            newOrders.forEach((order) => {
              if (!oldOrders.find((o) => o.id === order.id)) {
                new Notification(
                  `New order received. ID: ${order.id}, Customer: ${
                    order.personalInfo.firstName
                  } ${order.personalInfo.lastName}, Items: ${
                    order.items.length
                  }, Total: ${order.total}, Time: ${new Date(
                    order.timestamp
                  ).toLocaleString()}`
                );
              }
            });
          }
        });

      return () => unsubscribe();
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  const updateOrder = async (orderId, newStatus) => {

    const order = orders.find((order) => order.id === orderId);


    if (!order.confirmed && newStatus === "Delivered") {
      setErrorMessage(
        "The order must be confirmed before it can be marked as delivered."
      );
      setErrorModalIsOpen(true);
      return;
    }

    // Update the order status in the database
    await updateOrderStatus(orderId, newStatus);

    // Update the order status in the state
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDeleteDeliveredOrders = async () => {
    setDeleteModalIsOpen(false);
    await deleteDeliveredOrders();
    setOrders(orders.filter((order) => order.status !== "Delivered"));
  };

  const confirmOrder = async (orderId, confirmed) => {
    // Find the order with the given ID
    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex !== -1) {
      // Update the 'confirmed' property of the order in the database
      await updateOrderConfirmation(orderId, confirmed);

      // Update the 'confirmed' property of the order in the state
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        confirmed: confirmed,
      };

      // Update the state
      setOrders(updatedOrders);
    }
  };

  return (
    <div>
      <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor mx-auto py-4 mb-20">
        Orders
        <span className="text-orange-600 text-[3rem] lg:text-[5rem]">Page</span>
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Of Order
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Address
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Items
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confirmed
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <OrderItem
                key={order.id}
                order={order}
                updateOrder={updateOrder}
                confirmOrder={confirmOrder}
                isNew={index === orders.length - 1} // Check if the order is the last one
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8"> 
      <button
        onClick={() => setDeleteModalIsOpen(true)}
        className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Delete Delivered Orders
      </button>
    </div>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        contentLabel="Deletion Confirmation"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
      >
        <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
          Confirm
          <span className="text-orange-600 text-xl lg:text-2xl">Deletion</span>
        </h2>
        <p className="mb-6">
          Are you sure you want to delete all delivered orders?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
            onClick={handleDeleteDeliveredOrders}
          >
            Confirm
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={() => setErrorModalIsOpen(false)}
        contentLabel="Error Message"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
      >
        <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
          Error
        </h2>
        <p className="mb-6">{errorMessage}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setErrorModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
