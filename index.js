import express from "express";
import cors from "cors";
import datos from "./peliculas.json" with { type: "json" };

const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ mensaje: "Bienvenidos a nuestra API" });
});
app.get("/api", (req, res) => {
    res.json(
        {
            nombre: "Jose",
            email: "canodelacuadra@gmail.com"
        });
});

app.get("/api/peliculas", (req, res) => {
    const { genero } = req.query;
    let peliculas = datos.peliculas;
    if (genero) {
        peliculas = peliculas.filter(
            (p) => p.genero.toLowerCase() === genero.toLowerCase()
        );
    }
    res.json({ total: peliculas.length, peliculas });
});

app.get("/api/peliculas/:id", (req, res) => {
    const pelicula = datos.peliculas.find((p) => p.id === Number(req.params.id));
    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
    res.json(pelicula);
});

app.get("/api/generos", (req, res) => {
    res.json({ generos: Object.keys(datos.indice_por_genero) });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});