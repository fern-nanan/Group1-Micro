// 1. Target DOM Nodes (Matching Slide 7)

const categoryNameInput = document.getElementById("txtCatName");
const categoryDescInput = document.getElementById("txtCatDesc");
const addCategoryBtn = document.getElementById("btnAdd");
const incomeTableBody = document.getElementById("listIncomeCat");

// 2. Attach Non-Inline Event Listener
addCategoryBtn.addEventListener("click", handleAddCategory);

// 3. Controller Action
function handleAddCategory() {
const catName = categoryNameInput.value.trim();
const catDesc = categoryDescInput.value.trim();

// Guard Clause Validation
if (!catName || !catDesc) {
alert("Please complete both input fields.");
return;
}

// Construct Row Markup
// Added a third <td> that holds the red "Delete" button for this row.
// The button uses Bootstrap's btn-danger class so it appears red,
// and a "delete-btn" class so our event listener can recognize it.
const newRowHTML = `
<tr>
<td class="fw-semibold text-dark">${catName}</td>
<td class="text-secondary">${catDesc}</td>
<td class="text-center">
  <button type="button" class="btn btn-danger btn-sm delete-btn">
    Delete
  </button>
</td>
</tr>
`;

// Dynamic RAM Insertion
incomeTableBody.insertAdjacentHTML("beforeend", newRowHTML);

// Reset Inputs & Refocus
categoryNameInput.value = "";
categoryDescInput.value = "";
categoryNameInput.focus();
}

// 4. Delete Button Handling (Event Delegation)
// We attach ONE listener to the table body instead of one listener per
// button. This works even for rows that get added later, because the
// listener lives on the parent container and "catches" clicks that
// bubble up from any button inside it.
incomeTableBody.addEventListener("click", function (event) {

  // Check whether the clicked element (or something inside it) is a
  // delete button. This lets the click work even if the user clicks
  // slightly off-center on the button text.
  if (event.target.classList.contains("delete-btn")) {

    // Mandatory DOM traversal technique:
    // Starting from the clicked button, walk UP the DOM tree until we
    // find the closest ancestor <tr> (the table row), then remove it.
    // This removes only the row the button belongs to.
    event.target.closest('tr').remove();
  }
});
