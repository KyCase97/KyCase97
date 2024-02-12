import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiA-CPBjHgdNMSkECYJ3D55S-OJWeRpNM",
  authDomain: "noir-b0cf8.firebaseapp.com",
  databaseURL:
    "https://noir-b0cf8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "noir-b0cf8",
  storageBucket: "noir-b0cf8.appspot.com",
  messagingSenderId: "265741421264",
  appId: "1:265741421264:web:5d6af087a996b58a9cecd5",
  measurementId: "G-CDZKCSXS56",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoTable = document.getElementById("todo-table");

// Function to add a new task to Firebase
const addTask = (task) => {
  push(ref(database, "tasks"), {
    task: task,
    date: new Date().toISOString().slice(0, 10), // Today's date
    completed: false,
  });
};

// Function to delete a task from Firebase
const deleteTask = (taskId) => {
  remove(ref(database, `tasks/${taskId}`));
};

// Function to edit a task in Firebase
const editTask = (taskId, newTask) => {
  const taskRef = ref(database, `tasks/${taskId}`);
  update(taskRef, {
    task: newTask,
  })
    .then(() => {
      console.log("Task updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating task: ", error);
    });
};

// Function to render tasks
const renderTasks = (snapshot) => {
  todoTable.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th colspan="3">Tugas</th>
        <th>Tanggal</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;
  let counter = 1;
  snapshot.forEach((childSnapshot) => {
    const task = childSnapshot.val().task;
    const date = childSnapshot.val().date;
    const taskId = childSnapshot.key;
    const taskRow = document.createElement("tr");
    taskRow.innerHTML = `
      <td>${counter}</td>
      <td colspan="3">${task}</td>
      <td>${date}</td>
      <td>
        <button class="btn btn-success edit-btn" style="font-size: 0.8rem;" data-task-id="${taskId}">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn btn-danger delete-btn" style="font-size: 0.8rem;" data-task-id="${taskId}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    todoTable.querySelector("tbody").appendChild(taskRow);
    counter++;
  });

  // Add event listener to edit buttons
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      const newTask = prompt("Edit task:");
      if (newTask && newTask.trim() !== "") {
        editTask(taskId, newTask.trim());
      }
    });
  });

  // Add event listener to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      deleteTask(taskId);
    });
  });
};

// Event listener for form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task !== "") {
    addTask(task);
    todoInput.value = "";
  }
});

// Firebase event listener for fetching tasks
onValue(ref(database, "tasks"), (snapshot) => {
  renderTasks(snapshot);
});
