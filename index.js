const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
// RECUERDA: Cambia 'TU_CONTRASEÑA' por la clave real de tu usuario de MongoDB
const MONGO_URI = "mongodb+srv://sebastiandemarco2019_db_user:DzzeZ99FABzaFaD9@cluster0.vfksv7p.mongodb.net/video_app?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas ✅"))
  .catch(err => console.error("Error al conectar a MongoDB:", err));

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

// --- RUTA: LOGIN ---
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Usuario.findOne({ email, password });
        if (user) {
            res.status(200).json({ 
                usuario: user.usuario, 
                email: user.email, 
                favoritos: user.favoritos 
            });
        } else {
            res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// --- RUTA: REGISTRO ---
app.post('/api/register', async (req, res) => {
    const { email, usuario, password } = req.body;
    try {
        const nuevoUser = new Usuario({ email, usuario, password });
        await nuevoUser.save();
        res.status(201).json({ message: "Usuario creado" });
    } catch (err) {
        res.status(400).json({ message: "El usuario ya existe o error en datos" });
    }
});

app.get('/', (req, res) => res.send("Servidor con Base de Datos Activa 🚀"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto ${PORT}`));

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
