import React, { useState } from "react";
import Modal from "react-modal";

const OrderItem = ({ order, updateOrder, confirmOrder, isNew }) => {
  const [deliveryModalIsOpen, setDeliveryModalIsOpen] = useState(false);
  const [pendingModalIsOpen, setPendingModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [notConfirmModalIsOpen, setNotConfirmModalIsOpen] = useState(false);
  const items = order.items
    .map(
      (item) =>
        `${item.title} (x${item.qty}) ${
          order.confirmed ? "(Confirmed)" : "(Not Confirmed)"
        }`
    )
    .join(", ");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleStatusChange = () => {
    if (order.status === "Pending") {
      setDeliveryModalIsOpen(true);
    } else {
      setPendingModalIsOpen(true);
    }
  };

  const handleConfirmationChange = () => {
    if (order.confirmed) {
      setNotConfirmModalIsOpen(true);
    } else {
      setConfirmModalIsOpen(true);
    }
  };

  const confirmDelivery = () => {
    updateOrder(order.id, "Delivered");
    setDeliveryModalIsOpen(false);
  };

  const confirmPending = () => {
    updateOrder(order.id, "Pending");
    setPendingModalIsOpen(false);
  };

  const confirmConfirmation = () => {
    confirmOrder(order.id, true);
    setConfirmModalIsOpen(false);
  };

  const confirmNotConfirmed = () => {
    confirmOrder(order.id, false);
    setNotConfirmModalIsOpen(false);
  };

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {order.personalInfo.firstName} {order.personalInfo.lastName}
          {isNew && (
            <sup>
              <span
                className="bg-green-200 text-green-800 p-1 rounded"
                style={{ fontSize: "0.85em", marginLeft: "4px" }}
              >
                New
              </span>
            </sup>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {new Date(order.timestamp).toLocaleDateString()}{" "}
          {new Date(order.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {order.personalInfo.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {order.personalInfo.phoneNumber}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {order.personalInfo.deliveryAddress}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{items}</td>
        <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={handleConfirmationChange}
            className={`px-2 py-1 rounded text-white ${
              order.confirmed ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            {order.confirmed ? "Confirmed" : "Not Confirmed"}
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={handleStatusChange}
            className={`px-2 py-1 rounded text-white ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </button>
        </td>
      </tr>

      <Modal
        isOpen={deliveryModalIsOpen}
        onRequestClose={() => setDeliveryModalIsOpen(false)}
        contentLabel="Delivery Confirmation"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
      >
        <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
          Confirm
          <span className="text-orange-600 text-xl lg:text-2xl">Delivery</span>
        </h2>
        <p className="mb-6">
          Are you sure you want to mark this order as delivered?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
            onClick={confirmDelivery}
          >
            Confirm
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setDeliveryModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={pendingModalIsOpen}
        onRequestClose={() => setPendingModalIsOpen(false)}
        contentLabel="Pending Confirmation"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
      >
        <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
          Confirm
          <span className="text-orange-600 text-xl lg:text-2xl">Pending</span>
        </h2>
        <p className="mb-6">
          Are you sure you want to mark this order as pending?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
            onClick={confirmPending}
          >
            Confirm
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setDeliveryModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={confirmModalIsOpen}
        onRequestClose={() => setConfirmModalIsOpen(false)}
        contentLabel="Confirmation Confirmation"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
      >
        <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
          Confirm
          <span className="text-orange-600 text-xl lg:text-2xl">
            Confirmation
          </span>
        </h2>
        <p className="mb-6">
          Are you sure you want to mark this order as confirmed?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
            onClick={confirmConfirmation}
          >
            Confirm
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setConfirmModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={notConfirmModalIsOpen}
        onRequestClose={() => setNotConfirmModalIsOpen(false)}
        contentLabel="Not Confirmed Confirmation"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
      >
        <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
          I'm Sure
          <span className="text-orange-600 text-xl lg:text-2xl">
            Not Confirmed
          </span>
        </h2>
        <p className="mb-6">
          Are you sure you want to mark this order as not confirmed?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
            onClick={confirmNotConfirmed}
          >
            I'm sure
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setNotConfirmModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};
export default OrderItem;
