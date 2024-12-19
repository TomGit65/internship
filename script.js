// Modal and Button References for Add Patient
const addBtn = document.querySelector(".add-botton"); // Add new patient button
const modal = document.querySelector("#add-patient-form"); // Modal form container
const closeBtn = document.querySelector("#close-btn"); // Close button on modal
const cancelBtn = document.querySelector("#cancel-btn"); // Cancel button
const saveBtn = document.querySelector("#save-btn"); // Save button
const tableBody = document.querySelector("#Patient-table tbody"); // Table body
let currentEditRow = null; // Variable to track the row being edited
let currentDeleteRow = null; // Variable to track the row being deleted

// Modal and Button References for Delete Confirmation
const deleteModal = document.getElementById("delete-confirmation-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");

// Open Add Patient Modal when "Add new patient" button is clicked
addBtn.addEventListener("click", () => {
  currentEditRow = null; // Reset the edit row
  document.querySelector("#patient-form").reset(); // Reset the form
  modal.classList.remove("hidden"); // Show the modal
});

// Close Add Patient Modal when "close" or "cancel" button is clicked
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); // Hide the modal
});
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); // Hide the modal
});

// Function to generate random ID for new patients
function generateRandomID() {
  const prefixes = ["B", "S", "G"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${randomPrefix}-${randomNumber}`;
}

// Function to open delete confirmation modal
function openDeleteModal() {
  deleteModal.classList.remove("hidden"); // Show the modal
}

// Function to close delete confirmation modal
function closeDeleteModal() {
  deleteModal.classList.add("hidden"); // Hide the modal
}

// Event listener for "Yes" button (confirm delete)
confirmDeleteBtn.addEventListener("click", function() {
  // Remove the row when confirmed
  if (currentDeleteRow) {
    currentDeleteRow.remove();
  }
  // Close the modal after confirming
  closeDeleteModal();
});

// Event listener for "No" button (cancel delete)
cancelDeleteBtn.addEventListener("click", function() {
  closeDeleteModal(); // Close the modal without deleting
});

// Event listener for Save button (Save or Edit patient)
saveBtn.addEventListener("click", () => {
  // Retrieve form data
  const petName = document.querySelector("#pet-name").value;
  const status = document.querySelector("#status").value;
  const pawrent = document.querySelector("#pawrent").value;
  const breed = document.querySelector("#breed").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const dob = document.querySelector("#dob").value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const township = document.querySelector("#township").value;

  // Validate form data
  if (
    !petName ||
    !pawrent ||
    !breed ||
    !status ||
    !gender ||
    !dob ||
    !phone ||
    !address
  ) {
    alert("All fields are required!");
    return;
  }

  const statusIcon =
    status === "Under Treatment"
      ? "images/allergy.png"
      : "images/picky eater.png"; // Dynamic status icon
  if (currentEditRow) {
    // Edit existing patient
    currentEditRow.children[2].textContent = petName;
    currentEditRow.children[3].innerHTML = `<img src="${statusIcon}" alt="Status" class="icon">`; // Set status icon
    currentEditRow.children[4].textContent = pawrent;
    currentEditRow.children[5].textContent = breed;
    currentEditRow.children[6].textContent = gender;
    currentEditRow.children[7].textContent = dob;
    currentEditRow.children[8].textContent = phone;
    currentEditRow.children[9].textContent = address;
    // Close the modal
    modal.classList.add("hidden");
  } else {
    // Add new patient
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${generateRandomID()}</td>
      <td>${petName}</td>
      <td><img src="${statusIcon}" alt="Status" class="icon"></td>
      <td>${pawrent}</td>
      <td>${breed}</td>
      <td>${gender}</td>
      <td>${dob}</td>
      <td>${phone}</td>
      <td>${address}</td>
      <td>
        <button class="action-btn-edit">Edit</button>
        <button class="action-btn-delete">Delete</button>
      </td>
    `;
    // Append the new row to the table
    tableBody.appendChild(newRow);
    // Add event listeners for edit and delete buttons
    newRow.querySelector(".action-btn-edit").addEventListener("click", () => {
      // Populate modal with the patient's current data for editing
      currentEditRow = newRow;
      document.querySelector("#pet-name").value = petName;
      document.querySelector("#status").value = status;
      document.querySelector("#pawrent").value = pawrent;
      document.querySelector("#breed").value = breed;
      document.querySelector(
        `input[name="gender"][value="${gender}"]`
      ).checked = true;
      document.querySelector("#dob").value = dob;
      document.querySelector("#phone").value = phone;
      document.querySelector("#address").value = address;
      modal.classList.remove("hidden"); // Show modal for editing
    });

    newRow.querySelector(".action-btn-delete").addEventListener("click", () => {
      // Set the current row to be deleted
      currentDeleteRow = newRow;
      // Show the delete confirmation modal
      openDeleteModal();
    });

    alert("Patient added successfully!");
  }

  // Close the modal and reset the form
  modal.classList.add("hidden");
  document.querySelector("#patient-form").reset();
});

// Event listener to show delete modal from delete button
document.querySelectorAll('.action-btn-delete').forEach(button => {
  button.addEventListener('click', function() {
    openDeleteModal();
  });
});
