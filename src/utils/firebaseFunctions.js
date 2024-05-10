import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteItem = async (id) => {
  try {
    const q = query(collection(firestore, "foodItems"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } else {
      console.error("No document found with id:", id);
    }
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const updateItem = async (id, data) => {
  try {
    const q = query(collection(firestore, "foodItems"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, data);
      console.log("Document successfully updated!");
    } else {
      console.error("No document found with id:", id);
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const getItem = async (id) => {
  try {
    const q = query(collection(firestore, "foodItems"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.error("No item found with id:", id);
      return null;
    }
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};

// Create a new order
export const createOrder = async (order) => {
  try {
    await setDoc(doc(firestore, "orders", `${Date.now()}`), order, {
      merge: true,
    });
    console.log("Order successfully created!");
  } catch (error) {
    console.error("Error creating order: ", error);
  }
};

// get all orders
export const getAllOrders = async () => {
  const ordersQuerySnapshot = await getDocs(collection(firestore, "orders"));
  return ordersQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const docRef = doc(firestore, "orders", orderId);
    await updateDoc(docRef, { status: newStatus });
    console.log("Order status successfully updated!");
  } catch (error) {
    console.error("Error updating order status: ", error);
  }
};

export const deleteDeliveredOrders = async () => {
  try {
    const q = query(
      collection(firestore, "orders"),
      where("status", "==", "Delivered")
    );
    const querySnapshot = await getDocs(q);

    // Create an array of delete promises
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    console.log("Delivered orders successfully deleted!");
  } catch (error) {
    console.error("Error deleting delivered orders: ", error);
  }
};

// Update order confirmation
export const updateOrderConfirmation = async (orderId, confirmed) => {
  try {
    const docRef = doc(firestore, "orders", orderId);
    await updateDoc(docRef, { confirmed: confirmed });
    console.log("Order confirmation successfully updated!");
  } catch (error) {
    console.error("Error updating order confirmation: ", error);
  }
};

// Save FCM token
export const saveToken = async (token) => {
  try {
    await setDoc(
      doc(firestore, "fcmTokens", "admin"),
      { token: token },
      {
        merge: true,
      }
    );
    console.log("Token successfully saved!");
  } catch (error) {
    console.error("Error saving token: ", error);
  }
};
