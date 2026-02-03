const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
// RECUERDA: Cambia 'TU_CONTRASEÑA' por la clave real de tu usuario de MongoDB
const MONGO_URI = "mongodb+srv://sebastiandemarco2019_db_user:DzzeZ99FABzaFaD9@cluster0.vfksv7p.mongodb.net/video_app?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000 // Si en 5 segundos no conecta, avisa
})
  .then(() => console.log("Conectado a MongoDB Atlas ✅"))
  .catch(err => {
    if (err.message.includes("ETIMEDOUT")) {
        console.error("❌ ERROR: Tiempo de espera agotado. Probablemente tu Firewall o IP están bloqueando el acceso.");
    } else if (err.message.includes("Authentication failed")) {
        console.error("❌ ERROR: Usuario o Contraseña incorrectos en la base de datos.");
    } else {
        console.error("❌ ERROR DE CONEXIÓN:", err.message);
    }
  });

// --- MODELO DE USUARIO ---
const Usuario = mongoose.model('Usuario', new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    usuario: String,
    password: { type: String, required: true },
    favoritos: { type: Array, default: [] }
}));

// --- RUTA: GUARDAR FAVORITOS ---
app.post('/api/favoritos', async (req, res) => {
    const { email, pelicula } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (user) {
            const existe = user.favoritos.find(f => f.id === pelicula.id);
            if (!existe) {
                user.favoritos.push(pelicula);
                await user.save();
            }
            res.status(200).json({ message: "Sincronizado", favoritos: user.favoritos });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- RUTA: LOGIN MEJORADA ---
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        const user = await Usuario.findOne({ email: email.toLowerCase(), password: password });
        
        if (user) {
            res.status(200).json({ 
                usuario: user.usuario, 
                email: user.email, 
                favoritos: user.favoritos || [] 
            });
        } else {
            res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        console.error("Error en Login:", error);
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
});

// --- RUTA: REGISTRO MEJORADA ---
app.post('/api/register', async (req, res) => {
    try {
        const { email, usuario, password } = req.body;
        
        // Verificamos si ya existe para evitar el error de MongoDB
        const existe = await Usuario.findOne({ email: email.toLowerCase() });
        if (existe) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        const nuevoUser = new Usuario({ 
            email: email.toLowerCase(), 
            usuario, 
            password 
        });
        
        await nuevoUser.save();
        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
        console.error("Error en Registro:", error);
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
});

app.get('/', (req, res) => res.send("Servidor con Base de Datos Activa 🚀"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

// --- RUTA PARA OBTENER FAVORITOS DE UN USUARIO ---
// Esta es la ruta que te está dando el error "Cannot GET"
app.get('/api/favoritos/:email', async (req, res) => {
    try {
        const { email } = req.params;
        console.log("Buscando favoritos para:", email);

        const user = await Usuario.findOne({ email: email });
        
        if (user) {
            res.status(200).json({ favoritos: user.favoritos || [] });
        } else {
            // Si el usuario no existe en MongoDB aún
            res.status(404).json({ message: "Usuario no encontrado en la base de datos" });
        }
    } catch (error) {
        console.error("Error en servidor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
