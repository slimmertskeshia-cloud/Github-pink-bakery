const orderButtons = document.querySelectorAll('.order-btn');
const orderList = document.getElementById('order-list');
const clearBtn = document.getElementById('clear-data');

// Load orders from LocalStorage when page opens
let orders = JSON.parse(localStorage.getItem('bakeryOrders')) || [];
renderOrders();

// Handle Customer Clicks
orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.parentElement;
        const newOrder = {
            id: Date.now(),
            name: card.dataset.name,
            price: card.dataset.price,
            status: 'Pending'
        };
        
        orders.push(newOrder);
        saveAndRender();
    });
});

// Confirm Order Logic
function confirmOrder(id) {
    orders = orders.map(order => {
        if (order.id === id) order.status = 'Confirmed';
        return order;
    });
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('bakeryOrders', JSON.stringify(orders));
    renderOrders();
}

function renderOrders() {
    if (orders.length === 0) {
        orderList.innerHTML = '<p class="empty-msg">No orders received yet.</p>';
        return;
    }

    orderList.innerHTML = '';
    orders.forEach(order => {
        const div = document.createElement('div');
        div.className = `order-entry ${order.status === 'Confirmed' ? 'confirmed-row' : ''}`;
        
        div.innerHTML = `
            <div>
                <strong>${order.name}</strong> ($${order.price})<br>
                <span class="status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
            ${order.status === 'Pending' 
                ? `<button onclick="confirmOrder(${order.id})">Confirm ✅</button>` 
                : '<span>Ready to Ship!</span>'}
        `;
        orderList.appendChild(div);
    });
}

// Clear Data
clearBtn.addEventListener('click', () => {
    if(confirm("Delete all order history?")) {
        orders = [];
        saveAndRender();
    }
});