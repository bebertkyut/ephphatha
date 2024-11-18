import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW65C2w8uxxDw9Va_GFOoCYQUVgm21cM4",
  authDomain: "ephphathadb.firebaseapp.com",
  projectId: "ephphathadb",
  storageBucket: "ephphathadb.appspot.com",
  messagingSenderId: "408778244868",
  appId: "1:408778244868:web:43bb14d52f45c4c5424651",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch audit data and populate the tables
async function fetchAuditData() {
  const querySnapshot = await getDocs(collection(db, "UserAccount"));
  const activeAccountsTableBody = document.querySelector('#activeAccountsTable tbody');
  const inactiveAccountsTableBody = document.querySelector('#inactiveAccountsTable tbody');

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const birthday = data.Birthday && data.Birthday.seconds
      ? new Date(data.Birthday.seconds * 1000).toLocaleDateString()
      : 'N/A';

    const dateCreated = data.DateCreated && data.DateCreated.seconds
      ? new Date(data.DateCreated.seconds * 1000).toLocaleDateString()
      : 'N/A';

    const row = `
      <tr>
          <td>${data.Name || 'N/A'}</td>
          <td>${data.Username || 'N/A'}</td>
          <td>${data.Role || 'N/A'}</td>
          <td>${data.Gender || 'N/A'}</td>
          <td>${birthday}</td>
          <td>${dateCreated}</td>
      </tr>
    `;

    // Check the Status field to determine where to add the row
    if (data.Status === "Active") {
      activeAccountsTableBody.innerHTML += row;
    } else if (data.Status === "Inactive") {
      inactiveAccountsTableBody.innerHTML += row;
    }
  });
}
fetchAuditData();

document.getElementById('printBtn').addEventListener('click', function () {
  const pdf = new window.jspdf.jsPDF(); // Access jsPDF via window object

  // Get today's date
  const today = new Date();
  const dateString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

  // Add title
  pdf.setFontSize(16);
  pdf.text("Account Records", 14, 20);
  pdf.text(dateString, 14, 30);

  // Create a table
  const activeTable = document.getElementById('activeAccountsTable');
  const inactiveTable = document.getElementById('inactiveAccountsTable');

  // Add active accounts to PDF
  pdf.autoTable({
    html: activeTable,
    startY: 40,
    theme: 'grid'
  });

  // Add space before the next table
  pdf.addPage();
  pdf.text("Inactive Accounts", 14, 20);
  pdf.autoTable({
    html: inactiveTable,
    startY: 30,
    theme: 'grid'
  });

  // Save the PDF with today's date
  pdf.save(`Account Records ${dateString}.pdf`);
});
