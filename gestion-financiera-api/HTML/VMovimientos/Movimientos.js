// Comprobar si hay sesión activa
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    alert('Debes iniciar sesión para acceder a esta página.');
    window.location.href = 'index.html';
} else {
    const transactions = [
        { date: '2024-12-01', type: 'income', amount: 200.00, description: 'Salario' },
        { date: '2024-12-03', type: 'expense', amount: -50.00, description: 'Supermercado' },
        { date: '2024-12-05', type: 'income', amount: 100.00, description: 'Venta de productos' },
        { date: '2024-12-06', type: 'expense', amount: -30.00, description: 'Transporte' }
    ];

    const transactionList = document.getElementById('transaction-list');
    const filterForm = document.getElementById('filter-form');

    // Función para mostrar transacciones
    function displayTransactions(filteredTransactions) {
        transactionList.innerHTML = '';
        if (filteredTransactions.length === 0) {
            transactionList.innerHTML = '<li>No hay movimientos que mostrar.</li>';
            return;
        }

        filteredTransactions.forEach((transaction) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Fecha:</strong> ${transaction.date}<br>
                <strong>Monto:</strong> $${transaction.amount.toFixed(2)}<br>
                <strong>Tipo:</strong> ${transaction.type === 'income' ? 'Ingreso' : 'Gasto'}<br>
                <strong>Descripción:</strong> ${transaction.description}
            `;
            transactionList.appendChild(listItem);
        });
    }

    // Mostrar todas las transacciones al cargar la página
    displayTransactions(transactions);

    // Filtrar transacciones
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const transactionType = document.getElementById('transaction-type').value;

        const filteredTransactions = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);

            if (startDate && transactionDate < new Date(startDate)) {
                return false;
            }

            if (endDate && transactionDate > new Date(endDate)) {
                return false;
            }

            if (transactionType !== 'all' && transaction.type !== transactionType) {
                return false;
            }

            return true;
        });

        displayTransactions(filteredTransactions);
    });
}

// Cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});
