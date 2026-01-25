const express = require('express');
const cors = require('cors');
const app = express();

// Borra el cors anterior y pon este:
app.use(cors({
  origin: "http://localhost:5173", // La URL de tu React
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Base de datos temporal
const usuariosDB = [];

// --- 1. RUTA DE REGISTRO ---
app.post('/api/register', (req, res) => {
    const { email, usuario, password } = req.body;
    const existe = usuariosDB.find(u => u.email === email);
    if (existe) {
        return res.status(400).json({ message: "El usuario ya existe" });
    }
    usuariosDB.push({ email, usuario, password });
    console.log("Usuarios en DB:", usuariosDB);
    res.status(201).json({ message: "Usuario creado con éxito" });
});

// --- 2. RUTA DE LOGIN --- (Debe ir antes del listen)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Intento de login:", email);
    
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
