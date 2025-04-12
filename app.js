// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDYtS1CxqZYJoOOTLElZhc3MQAgCMTbZzw",
  authDomain: "chatbot-70d4d.firebaseapp.com",
  databaseURL: "https://chatbot-70d4d-default-rtdb.firebaseio.com",
  projectId: "chatbot-70d4d",
  storageBucket: "chatbot-70d4d.appspot.com",
  messagingSenderId: "935113084879",
  appId: "1:935113084879:web:ca705a2aad45cd9056ccba",
  measurementId: "G-K9VTF16WXY"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const chatBox = document.getElementById("chat");
const msgInput = document.getElementById("message");

// Listen for messages
function listenForMessages() {
  const messagesRef = ref(db, "messages");
  onChildAdded(messagesRef, (data) => {
    const msgData = data.val();
    const p = document.createElement("p");
    p.className = "msg";
    p.innerHTML = `<strong>${msgData.user}:</strong> ${msgData.message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Send message
window.sendMessage = function () {
  const msg = msgInput.value.trim();
  if (msg !== "") {
    push(ref(db, "messages"), {
      user: "Anonymous",
      message: msg
    });
    msgInput.value = "";
  }
};

listenForMessages();
