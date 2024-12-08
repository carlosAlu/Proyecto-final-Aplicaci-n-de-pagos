// Comprobar si hay sesión activa
const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    alert('Debes iniciar sesión para acceder a esta página.');
    window.location.href = 'index.html';
} else {
    const cardForm = document.getElementById('card-form');
    const cardStatus = document.getElementById('card-status');

    // Manejar el envío del formulario de tarjeta
    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        // Validar datos de la tarjeta
        if (!validateCardNumber(cardNumber)) {
            cardStatus.textContent = 'El número de tarjeta es inválido.';
            cardStatus.style.color = 'red';
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            cardStatus.textContent = 'La fecha de vencimiento es inválida o ya pasó.';
            cardStatus.style.color = 'red';
            return;
        }

        if (!validateCVV(cvv)) {
            cardStatus.textContent = 'El código de seguridad (CVV) es inválido.';
            cardStatus.style.color = 'red';
            return;
        }

        // Simular el guardado de la tarjeta
        const newCard = {
            cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
            expiryDate,
        };

        user.cards = user.cards || [];
        user.cards.push(newCard);
        localStorage.setItem('user', JSON.stringify(user));

        // Mostrar mensaje de éxito
        cardStatus.innerHTML = `
            <p>Tarjeta agregada con éxito:</p>
            <ul>
                <li><strong>Número:</strong> ${newCard.cardNumber}</li>
                <li><strong>Fecha de Vencimiento:</strong> ${expiryDate}</li>
            </ul>
        `;
        cardStatus.style.color = 'green';

        // Resetear formulario
        cardForm.reset();
    });

    // Validaciones
    function validateCardNumber(number) {
        // Validar que tenga 16 dígitos y sea numérico
        const regex = /^\d{16}$/;
        return regex.test(number);
    }

    function validateExpiryDate(date) {
        const today = new Date();
        const [year, month] = date.split('-').map(Number);
        const expiryDate = new Date(year, month - 1);
        return expiryDate > today;
    }

    function validateCVV(cvv) {
        // Validar que tenga 3 dígitos y sea numérico
        const regex = /^\d{3}$/;
        return regex.test(cvv);
    }
}

// Cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});
