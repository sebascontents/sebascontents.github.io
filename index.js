const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos temporal
let usuariosDB = [];

// Ruta de prueba
app.get('/', (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

// --- RUTA PARA GUARDAR/SINCRONIZAR FAVORITOS ---
app.post('/api/favoritos', (req, res) => {
    const { email, pelicula } = req.body;
    console.log("Recibida petición de favoritos para:", email);

    // Buscamos al usuario en la lista
    let usuario = usuariosDB.find(u => u.email === email);

    // Si el usuario no existe (porque el servidor se reinició), lo creamos al vuelo
    if (!usuario) {
        usuario = { email: email, favoritos: [] };
        usuariosDB.push(usuario);
    }

    // Evitamos duplicados
    const yaExiste = usuario.favoritos.some(f => f.id === pelicula.id);
    if (!yaExiste) {
        usuario.favoritos.push(pelicula);
        console.log("Película guardada:", pelicula.titulo);
    }

    res.status(200).json({ 
        message: "Sincronizado con éxito", 
        favoritos: usuario.favoritos 
    });
});

// --- RUTA DE LOGIN (ACTUALIZADA) ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const usuarioEncontrado = usuariosDB.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
        res.status(200).json({ 
            message: "Login correcto", 
            usuario: usuarioEncontrado.usuario,
            email: usuarioEncontrado.email,
            favoritos: usuarioEncontrado.favoritos || [] 
        });
    } else {
        res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }
});

// --- RUTA DE REGISTRO ---
app.post('/api/register', (req, res) => {
    const { email, usuario, password } = req.body;
    const existe = usuariosDB.find(u => u.email === email);
    if (existe) return res.status(400).json({ message: "El usuario ya existe" });
    
    usuariosDB.push({ email, usuario, password, favoritos: [] });
    res.status(201).json({ message: "Usuario creado con éxito" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
