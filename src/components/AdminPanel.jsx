import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Fuse from "fuse.js";
import { MdSearch } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";

import {
  getAllFoodItems,
  deleteItem,
  updateItem,
} from "../utils/firebaseFunctions";

Modal.setAppElement("#root");

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [{ user }] = useStateValue();
  const adminEmail = "beggachenassim6@gmail.com"; // Replace with your admin email
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email === adminEmail) {
      getAllFoodItems().then(setItems);
    } else {
      navigate("/"); 
    }
  }, [user, navigate]);

  useEffect(() => {
    const fuse = new Fuse(items, { keys: ["title", "category"] });
    setResults(
      searchTerm ? fuse.search(searchTerm).map((result) => result.item) : items
    );
  }, [items, searchTerm]);

  const handleDelete = (id) => {
    setSelectedItemId(id);
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    deleteItem(selectedItemId).then(() => {
      setItems(items.filter((item) => item.id !== selectedItemId));
      setModalIsOpen(false);
    });
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  if (!user || user.email !== adminEmail) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <p className="text-[2.5rem] lg:text-[3.5rem] font-bold tracking-wide text-headingColor mx-auto py-4">
        Admin
        <span className="text-orange-600 text-[3rem] lg:text-[4rem]">
          Panel
        </span>
      </p>
      <div className="relative w-1/2 mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full pr-10"
        />
        <button
          onClick={() => {
            const fuse = new Fuse(items, { keys: ["title"] });
            setResults(
              searchTerm
                ? fuse.search(searchTerm).map((result) => result.item)
                : items
            );
          }}
          className="absolute right-0 top-0 mt-2 mr-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <MdSearch />
        </button>
      </div>
      <div className="overflow-hidden shadow-md rounded-lg w-1/2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.length > 0 ? (
              results.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Delete Confirmation"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-3/5 max-w-md"
        overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center backdrop-blur-md"
      >
        <h2 className="text-lg lg:text-xl font-bold tracking-wide text-headingColor mb-4">
          Confirm
          <span className="text-orange-600 text-xl lg:text-2xl">Delete</span>
        </h2>
        <p className="mb-6">Are you sure you want to delete this item?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
            onClick={confirmDelete}
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
    </div>
  );
};

export default AdminPanel;
