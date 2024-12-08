// Comprobar si hay sesión activa
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    alert('Debes iniciar sesión para acceder a esta página.');
    window.location.href = 'index.html';
} else {
    // Inicializar saldo del usuario
    let userBalance = user.balance;

    const transferForm = document.getElementById('transfer-form');
    const transferStatus = document.getElementById('transfer-status');

    // Manejar envío del formulario de transferencia
    transferForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const recipientEmail = document.getElementById('recipient-email').value;
        const transferAmount = parseFloat(document.getElementById('transfer-amount').value);
        const transferMessage = document.getElementById('transfer-message').value;

        // Validar datos
        if (!recipientEmail || transferAmount <= 0) {
            transferStatus.textContent = 'Por favor, complete todos los campos correctamente.';
            transferStatus.style.color = 'red';
            return;
        }

        if (transferAmount > userBalance) {
            transferStatus.textContent = 'Saldo insuficiente para realizar esta transferencia.';
            transferStatus.style.color = 'red';
            return;
        }

        // Simular transferencia
        userBalance -= transferAmount;

        // Actualizar el saldo en el almacenamiento local
        user.balance = userBalance;
        localStorage.setItem('user', JSON.stringify(user));

        // Mostrar confirmación
        transferStatus.innerHTML = `
            <p>Transferencia realizada con éxito:</p>
            <ul>
                <li><strong>Destinatario:</strong> ${recipientEmail}</li>
                <li><strong>Monto:</strong> $${transferAmount.toFixed(2)}</li>
                <li><strong>Mensaje:</strong> ${transferMessage || 'Ninguno'}</li>
            </ul>
            <p>Tu saldo actual es: $${userBalance.toFixed(2)}</p>
        `;
        transferStatus.style.color = 'green';

        // Resetear formulario
        transferForm.reset();
    });
}

// Cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});
