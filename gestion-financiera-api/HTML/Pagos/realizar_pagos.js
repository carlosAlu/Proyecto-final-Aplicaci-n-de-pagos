// Comprobar si hay sesión activa
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    alert('Debes iniciar sesión para acceder a esta página.');
    window.location.href = 'index.html';
} else {
    const paymentForm = document.getElementById('payment-form');
    const paymentMethod = document.getElementById('payment-method');
    const cardSelection = document.getElementById('card-selection');
    const cardSelect = document.getElementById('card-select');
    const paymentStatus = document.getElementById('payment-status');

    // Cargar tarjetas guardadas
    const userCards = user.cards || [];
    if (userCards.length > 0) {
        userCards.forEach((card, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${card.cardNumber} - Vence: ${card.expiryDate}`;
            cardSelect.appendChild(option);
        });
    }

    // Mostrar u ocultar la selección de tarjeta según el método de pago
    paymentMethod.addEventListener('change', (e) => {
        if (e.target.value === 'tarjeta') {
            cardSelection.style.display = 'block';
        } else {
            cardSelection.style.display = 'none';
        }
    });

    // Manejar envío del formulario de pago
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const method = paymentMethod.value;
        const amount = parseFloat(document.getElementById('payment-amount').value);

        // Validar monto
        if (amount <= 0) {
            paymentStatus.textContent = 'Por favor, ingrese un monto válido.';
            paymentStatus.style.color = 'red';
            return;
        }

        if (method === 'saldo') {
            // Validar saldo suficiente
            if (amount > user.balance) {
                paymentStatus.textContent = 'Saldo insuficiente para realizar el pago.';
                paymentStatus.style.color = 'red';
                return;
            }

            // Descontar el saldo
            user.balance -= amount;
        } else if (method === 'tarjeta') {
            // Validar tarjeta seleccionada
            if (cardSelect.value === '') {
                paymentStatus.textContent = 'Por favor, seleccione una tarjeta.';
                paymentStatus.style.color = 'red';
                return;
            }

            // Simular pago con tarjeta
            paymentStatus.textContent = 'Procesando pago con tarjeta...';
        }

        // Guardar los cambios en el almacenamiento local
        localStorage.setItem('user', JSON.stringify(user));

        // Mostrar mensaje de éxito
        paymentStatus.innerHTML = `
            <p>Pago realizado con éxito:</p>
            <ul>
                <li><strong>Método:</strong> ${method === 'saldo' ? 'Saldo' : 'Tarjeta'}</li>
                <li><strong>Monto:</strong> $${amount.toFixed(2)}</li>
            </ul>
            <p>Tu saldo actual es: $${user.balance.toFixed(2)}</p>
        `;
        paymentStatus.style.color = 'green';

        // Resetear formulario
        paymentForm.reset();
        cardSelection.style.display = 'none';
    });
}

// Cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});
