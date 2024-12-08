const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { full_name, email, password } = req.body;

    // Validaciones básicas
    if (!full_name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar si el correo ya existe
        const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario en la base de datos
        await db.promise().query('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)', [
            full_name,
            email,
            hashedPassword,
        ]);

        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

module.exports = router;
