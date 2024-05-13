// Check if there are any existing items in local storage
let items = JSON.parse(localStorage.getItem('items')) || [];

// Function to render items
function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    let totalExpense = 0; // Initialize total expense

    items.forEach(item => {
        const row = document.createElement('tr');
        const total = item.amount * item.quantity;
        totalExpense += total;

        // Format amount to display in dollar format
        const amountFormatted = `$${item.amount.toFixed(2)}`;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${amountFormatted}</td>
            <td>${item.quantity}</td>
            <td>$${total.toFixed(2)}</td>
        `;
        itemList.appendChild(row);
    });

    // Display total expense
    document.getElementById('totalExpense').textContent = `$${totalExpense.toFixed(2)}`;
}

// Function to add an item
function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemAmount = parseFloat(document.getElementById('itemAmount').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    // Check if all fields are filled and amount and quantity are valid numbers
    if (itemName && !isNaN(itemAmount) && !isNaN(itemQuantity) && itemAmount > 0 && itemQuantity > 0) {
        const newItem = {
            name: itemName,
            amount: itemAmount,
            quantity: itemQuantity
        };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
        // Clear input fields after adding item
        document.getElementById('itemName').value = '';
        document.getElementById('itemAmount').value = '';
        document.getElementById('itemQuantity').value = '';
    } else {
        alert('Please fill all fields with valid values');
    }
}

// Function to clear all items
function clearAll() {
    localStorage.removeItem('items');
    items = [];
    renderItems();
}

// Initial render
renderItems();
