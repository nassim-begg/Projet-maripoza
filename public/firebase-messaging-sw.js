//Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBn8et8S5mFDcJgYCuHRtHc_82eQtQ8K2w",
  authDomain: "restaurantapp-d60e5.firebaseapp.com",
  databaseURL: "https://restaurantapp-d60e5-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-d60e5",
  storageBucket: "restaurantapp-d60e5.appspot.com",
  messagingSenderId: "840086223606",
  appId: "1:840086223606:web:e1b1e6e7d28d2df45ccad7",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
