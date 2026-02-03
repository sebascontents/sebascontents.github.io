const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
const MONGO_URI = "mongodb+srv://sebastiandemarco2019_db_user:DzzeZ99FABzaFaD9@cluster0.vfksv7p.mongodb.net/video_app?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000 
})
  .then(() => console.log("Conectado a MongoDB Atlas ✅"))
  .catch(err => console.error("❌ ERROR DE CONEXIÓN:", err.message));

// --- MODELO DE USUARIO ---
const Usuario = mongoose.model('Usuario', new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    usuario: String,
    password: { type: String, required: true },
    favoritos: { type: Array, default: [] }
}));

// --- RUTAS (TODAS ANTES DEL LISTEN) ---

app.get('/', (req, res) => {
    res.send("Servidor LOCAL Activo y Funcionando 🚀");
});

app.post('/api/register', async (req, res) => {
    try {
        const { email, usuario, password } = req.body;
        const existe = await Usuario.findOne({ email: email.toLowerCase() });
        if (existe) return res.status(400).json({ message: "El correo ya está registrado" });

        const nuevoUser = new Usuario({ email: email.toLowerCase(), usuario, password });
        await nuevoUser.save();
        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usuario.findOne({ email: email.toLowerCase(), password: password });
        if (user) {
            res.status(200).json({ usuario: user.usuario, email: user.email, favoritos: user.favoritos || [] });
        } else {
            res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ESTA RUTA ESTABA MAL UBICADA, AHORA ESTÁ BIEN:
app.get('/api/favoritos/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await Usuario.findOne({ email: email.toLowerCase() }); // Agregué toLowerCase()
        if (user) {
            res.status(200).json({ favoritos: user.favoritos || [] });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
});

app.post('/api/favoritos', async (req, res) => {
    const { email, pelicula } = req.body;
    try {
        const user = await Usuario.findOne({ email: email.toLowerCase() });
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

// --- EL LISTEN SIEMPRE AL FINAL ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en: http://localhost:${PORT}`);
});
