const express = require('express');
const cors = require('cors');
const app = express();

// Configuración de CORS flexible
app.use(cors()); 
app.use(express.json());

// Base de datos temporal (Se borra al reiniciar el servidor)
const usuariosDB = [];

// Ruta de prueba para verificar que el servidor vive
app.get('/', (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

// --- 1. RUTA DE REGISTRO ---
app.post('/api/register', (req, res) => {
    const { email, usuario, password } = req.body;
    const existe = usuariosDB.find(u => u.email === email);
    if (existe) {
        return res.status(400).json({ message: "El usuario ya existe" });
    }
    usuariosDB.push({ email, usuario, password });
    console.log("Nuevo usuario:", usuario);
    res.status(201).json({ message: "Usuario creado con éxito" });
});

// --- 2. RUTA DE LOGIN ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const usuarioEncontrado = usuariosDB.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
        res.status(200).json({ 
            message: "Login correcto", 
            usuario: usuarioEncontrado.usuario 
        });
    } else {
        res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }
});

// Usar el puerto de Koyeb o 8080 por defecto
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
