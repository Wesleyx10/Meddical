// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHs8iLP-6PSO3ALoCKFlIG5znXVpfi7_E",
  authDomain: "meddical-b5528.firebaseapp.com",
  projectId: "meddical-b5528",
  storageBucket: "meddical-b5528.firebasestorage.app",
  messagingSenderId: "606489345774",
  appId: "1:606489345774:web:faa26d461e6125a2af7dff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newsletterBtn = document.querySelector("#newsletter-btn");
const thanksMsg = document.querySelector("#thanksMsg");
const emailInput = document.querySelector("#newsletter-input");

if (newsletterBtn) {
  newsletterBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const newsLetter = emailInput.value.trim();
    if (!newsLetter) return;

    try {
      await addDoc(collection(db, "newsletter"), { email: newsLetter });

      emailInput.value = "";

      thanksMsg.style.display = "block";
      thanksMsg.style.animation = "slideIn 0.8s ease-out forwards";

      setTimeout(() => {
        thanksMsg.style.display = "none";
        thanksMsg.style.animation = "";
      }, 4000);
    } catch (err) {
      console.error("Error saving email:", err);
    }
  });
}

const contactButton = document.querySelector("#contact-btn");
if (contactButton) {
  contactButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();
    const msg = document.querySelector(".contact-msg");

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields!");
      return;
    }

    const data = {
      name,
      email,
      subject,
      message,
      timestamp: new Date(),
    };

    contactButton.disabled = true;
    contactButton.textContent = "Sending...";

    try {
      await addDoc(collection(db, "UserContact"), data);

      msg.style.display = "block";
      msg.classList.add("animate");

      document.querySelector("#name").value = "";
      document.querySelector("#email").value = "";
      document.querySelector("#subject").value = "";
      document.querySelector("#message").value = "";

      setTimeout(() => {
        msg.style.display = "none";
        msg.classList.remove("animate");
      }, 3000);
    } catch (err) {
      console.error("Error collecting data:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      contactButton.disabled = false;
      contactButton.textContent = "SUBMIT";
    }
  });
}

const ApptConfirmationBtn = document.querySelector("#submit-appt");
if (ApptConfirmationBtn) {
  ApptConfirmationBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#appt-name").value.trim();
    const email = document.querySelector("#appt-email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const gender = document.querySelector("#gender").value.trim();
    const date = document.querySelector("#date").value.trim();
    const time = document.querySelector("#time").value.trim();
    const doctor = document.querySelector("#doctor").value.trim();
    const department = document.querySelector("#dept").value.trim();
    const message = document.querySelector("#appt-message").value.trim();
    const msg = document.querySelector(".appt-msg");

    const selectedDate = new Date(date + " " + time);
    const now = new Date();

    if (selectedDate <= now) {
      alert("Please select a future date and time!");
      return;
    }

    if (
      !name ||
      !email ||
      !phone ||
      !gender ||
      !date ||
      !time ||
      !doctor ||
      !department ||
      !message
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const data = {
      name,
      email,
      phone,
      gender,
      date,
      time,
      doctor,
      department,
      message,
      timestamp: new Date(),
    };

    ApptConfirmationBtn.disabled = true;
    ApptConfirmationBtn.textContent = "Booking.....";

    try {
      await addDoc(collection(db, "Appointments"), data);

      msg.style.display = "block";
      msg.classList.add("animate");

      document.querySelector("#appt-name").value = "";
      document.querySelector("#appt-email").value = "";
      document.querySelector("#phone").value = "";
      document.querySelector("#gender").value = "";
      document.querySelector("#date").value = "";
      document.querySelector("#time").value = "";
      document.querySelector("#doctor").value = "";
      document.querySelector("#dept").value = "";
      document.querySelector("#appt-message").value = "";

      setTimeout(() => {
        msg.style.display = "none";
        msg.classList.remove("animate");
      }, 4000);
    } catch (err) {
      console.error("Error Booking Appointment:", err);
      alert("Failed to book appointment. Please try again.");
    } finally {
      ApptConfirmationBtn.disabled = false;
      ApptConfirmationBtn.textContent = "BOOK";
    }
  });
}

const barsContainer = document.querySelector(".bars");
const menu = document.querySelector(".links");
const appointmentBtn = document.querySelector("#appointment");

barsContainer.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = menu.classList.contains("open");

  if (!isOpen) {
    barsContainer.classList.add("close");
    menu.classList.add("open");

    setTimeout(() => {
      appointmentBtn.classList.add("show");
    }, 600);
  } else {
    barsContainer.classList.remove("close");
    appointmentBtn.classList.remove("show");

    setTimeout(() => {
      menu.classList.remove("open");
    }, 200);
  }
});

document.addEventListener("click", (e) => {
  if (!barsContainer.contains(e.target) && !menu.contains(e.target)) {
    barsContainer.classList.remove("close");
    menu.classList.remove("open");
    appointmentBtn.classList.remove("show");
  }
});


