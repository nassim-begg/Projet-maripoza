import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import Modal from "react-modal";
import { createOrder } from "../utils/firebaseFunctions";
import FormComponent from "./FormComponent";

Modal.setAppElement("#root");

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [congratsModalIsOpen, setCongratsModalIsOpen] = useState(false);
  const [form, setForm] = useState({});
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(totalPrice);
  }, [cartItems, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const handleCheckout = async (personalInfo) => {
    // Create the order object
    const order = {
      user: user, // user's account information
      personalInfo: personalInfo, // user's personal information from the form
      items: cartItems, // items in the cart
      total: tot, // total price
      status: "Pending", // initial status
      confirmed: false,
      timestamp: new Date().toISOString(), // current date and time
    };

    // Create the order in Firestore
    await createOrder(order);
    clearCart();
  };

  const confirmCheckout = () => {
    setModalIsOpen(false);
    setFormModalIsOpen(true);
  };

  const handleFormSubmit = (formData) => {
    setForm(formData);
    setFormModalIsOpen(false);
    setCongratsModalIsOpen(true);
    handleCheckout(formData);

    setTimeout(() => {
      setCongratsModalIsOpen(false);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">{tot} DA</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">FREE</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">{tot} DA</p>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Order Confirmation"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
              overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
            >
              <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
                Confirm
                <span className="text-orange-600 text-xl lg:text-2xl">
                  Order
                </span>
              </h2>
              <div className="mb-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    setFlag={setFlag}
                    flag={flag}
                    className="bg-white" // Add a new class
                  />
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                  onClick={confirmCheckout}
                >
                  Confirm
                </button>
                <button
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setModalIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
            <Modal
              isOpen={formModalIsOpen}
              onRequestClose={() => setFormModalIsOpen(false)}
              contentLabel="Order Form"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
              overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
            >
              <FormComponent
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setFormModalIsOpen(false);
                  setModalIsOpen(true);
                }}
              />
            </Modal>
            <Modal
              isOpen={congratsModalIsOpen}
              onRequestClose={() => setCongratsModalIsOpen(false)}
              contentLabel="Thanks for Ordering"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
              overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
            >
              <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
                Thanks For
                <span className="text-orange-600 text-xl lg:text-2xl">
                  Ordering
                </span>
              </h2>
              <p className="mb-4">
                Thanks for ordering from us, your order will be arriving soon!
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                  onClick={() => setCongratsModalIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </Modal>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={() => setModalIsOpen(true)} // Open the modal when the button is clicked
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
