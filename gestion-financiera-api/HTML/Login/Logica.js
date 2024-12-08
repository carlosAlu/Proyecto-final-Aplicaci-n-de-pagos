document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password-register').value;

    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    alert('Registro exitoso!');
    // Aquí podrías enviar los datos al backend
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === '' || password === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    alert('Inicio de sesión exitoso!');
    // Aquí podrías validar las credenciales con el backend
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Validar campos
    if (email === '' || password === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Simular autenticación (puedes conectar esto con tu backend)
    if (email === 'usuario@ejemplo.com' && password === 'password123') {
        // Guardar sesión (puedes usar localStorage o cookies)
        localStorage.setItem('user', JSON.stringify({ email, balance: 1000 }));

        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});
