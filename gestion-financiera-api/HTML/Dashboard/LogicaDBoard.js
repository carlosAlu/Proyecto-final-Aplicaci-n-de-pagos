// Comprobar si hay sesión activa
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    alert('Debes iniciar sesión para acceder al dashboard.');
    window.location.href = 'index.html'; // Redirige al login si no hay sesión activa
} else {
    // Mostrar saldo actual
    document.getElementById('current-balance').textContent = `$${user.balance.toFixed(2)}`;

    // Historial de transacciones (simulación)
    const transactions = [
        { type: 'Ingreso', amount: 200.00, date: '2024-12-01' },
        { type: 'Gasto', amount: -50.00, date: '2024-12-03' },
        { type: 'Ingreso', amount: 100.00, date: '2024-12-05' },
    ];

    const transactionHistory = document.getElementById('transaction-history');
    transactionHistory.innerHTML = ''; // Limpiar contenido inicial

    transactions.forEach((transaction) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.date}: ${transaction.type} de $${Math.abs(transaction.amount.toFixed(2))}`;
        transactionHistory.appendChild(listItem);
    });
}

// Cerrar sesión
document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('user'); // Eliminar sesión
    window.location.href = 'index.html'; // Redirigir al login
});
