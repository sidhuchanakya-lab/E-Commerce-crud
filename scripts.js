const productForm = document.getElementById('productForm');
const productTableBody = document.querySelector('#productTable tbody');

let products = [];
let editIndex = null;

// Handle form submit
productForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;

    if (editIndex === null) {
        // CREATE
        products.push({ name, price, category });
    } else {
        // UPDATE
        products[editIndex] = { name, price, category };
        editIndex = null;
    }

    productForm.reset();
    renderTable();
});

// Render table
function renderTable() {
    productTableBody.innerHTML = '';
    products.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.category}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
        row.innerHTML = `
  <td>${product.name}</td>
  <td>$${product.price}</td>
  <td>${product.category}</td>
  <td>
    <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
    <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
  </td>
`;

        productTableBody.appendChild(row);
    });
}

// EDIT
function editProduct(index) {
    document.getElementById('name').value = products[index].name;
    document.getElementById('price').value = products[index].price;
    document.getElementById('category').value = products[index].category;

    editIndex = index;
}

// DELETE
function deleteProduct(index) {
    products.splice(index, 1);
    renderTable();
}