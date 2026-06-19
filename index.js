/**
 * @fileoverview API REST de películas construida con Express.js
 * Proporciona endpoints para consultar, filtrar y obtener información de películas
 * 
 * @version 1.0.0
 * @author API Render
 */

import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Datos de películas cargados desde el archivo peliculas.json
 * @type {Object}
 * @property {Array<Object>} peliculas - Array de objetos película
 * @property {Object} indice_por_genero - Índice de películas por género
 */
const datos = JSON.parse(readFileSync(join(__dirname, "peliculas.json"), "utf-8"));

/** @type {express.Application} */
const app = express();
app.use(cors());
app.use(express.json());

/** @type {number} Puerto en el que se ejecuta el servidor */
const PORT = process.env.PORT || 3000;

/**
 * GET / - Endpoint raíz con información de bienvenida
 * 
 * @route GET /
 * @returns {Object} Objeto con mensaje de bienvenida y lista de endpoints disponibles
 * @returns {string} returns.mensaje - Mensaje de bienvenida
 * @returns {Array<string>} returns.endpoints - Array con rutas disponibles
 * 
 * @example
 * GET /
 * Response:
 * {
 *   "mensaje": "Bienvenidos a nuestra API",
 *   "endpoints": ["/api/peliculas", ...]
 * }
 */
app.get("/", (req, res) => {
    res.json({
        mensaje: "Bienvenidos a nuestra API",
        endpoints: [
            "/api/peliculas",
            "/api/peliculas&generos=acción",
            "/api/peliculas/:id",
            "/api/generos"
        ]
    });
});

/**
 * GET /api/peliculas - Obtiene todas las películas o las filtra por género
 * 
 * @route GET /api/peliculas
 * @query {string} [genero] - Género para filtrar películas (opcional, case-insensitive)
 * 
 * @returns {Object} Objeto con el total de películas y lista filtrada
 * @returns {number} returns.total - Cantidad total de películas retornadas
 * @returns {Array<Object>} returns.peliculas - Array de películas
 * @returns {number} returns.peliculas[].id - ID único de la película
 * @returns {string} returns.peliculas[].titulo - Título de la película
 * @returns {number} returns.peliculas[].año - Año de lanzamiento
 * @returns {string} returns.peliculas[].genero - Género de la película
 * @returns {string} returns.peliculas[].director - Director de la película
 * @returns {number} returns.peliculas[].rating - Calificación de la película
 * @returns {string} returns.peliculas[].sinopsis - Sinopsis de la película
 * @returns {number} returns.peliculas[].duracion - Duración en minutos
 * @returns {string} returns.peliculas[].poster - URL del poster
 * 
 * @example
 * GET /api/peliculas
 * Response: { "total": 5, "peliculas": [...] }
 * 
 * @example
 * GET /api/peliculas?genero=Drama
 * Response: { "total": 1, "peliculas": [{ "titulo": "El Padrino", ... }] }
 */
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

/**
 * GET /api/peliculas/:id - Obtiene una película específica por su ID
 * 
 * @route GET /api/peliculas/:id
 * @param {number} id - ID único de la película (en la URL)
 * 
 * @returns {Object} Objeto con información completa de la película
 * @returns {number} returns.id - ID único de la película
 * @returns {string} returns.titulo - Título de la película
 * @returns {number} returns.año - Año de lanzamiento
 * @returns {string} returns.genero - Género de la película
 * @returns {string} returns.director - Director de la película
 * @returns {number} returns.rating - Calificación de la película
 * @returns {string} returns.sinopsis - Sinopsis de la película
 * @returns {number} returns.duracion - Duración en minutos
 * @returns {string} returns.poster - URL del poster
 * 
 * @throws {Object} Retorna 404 si la película no existe
 * @throws {string} throws.error - Mensaje de error "Película no encontrada"
 * 
 * @example
 * GET /api/peliculas/1
 * Response: { "id": 1, "titulo": "Inception", "año": 2010, ... }
 * 
 * @example
 * GET /api/peliculas/999
 * Response: { "error": "Película no encontrada" } (HTTP 404)
 */
app.get("/api/peliculas/:id", (req, res) => {
    const pelicula = datos.peliculas.find((p) => p.id === Number(req.params.id));
    if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
    res.json(pelicula);
});

/**
 * GET /api/generos - Obtiene la lista de todos los géneros disponibles
 * 
 * @route GET /api/generos
 * 
 * @returns {Object} Objeto con array de géneros disponibles
 * @returns {Array<string>} returns.generos - Array de nombres de géneros únicos
 * 
 * @example
 * GET /api/generos
 * Response: { "generos": ["Ciencia Ficción", "Drama", "Animación", ...] }
 */
app.get("/api/generos", (req, res) => {
    res.json({ generos: Object.keys(datos.indice_por_genero) });
});

/**
 * Inicia el servidor Express en el puerto especificado
 * 
 * Maneja dos casos:
 * 1. Inicio exitoso: Imprime mensaje en consola
 * 2. Error EADDRINUSE: Sugiere cambiar de puerto
 * 3. Otros errores: Imprime el mensaje de error
 * 
 * @event Server#listening - Se ejecuta cuando el servidor está listo
 * @event Server#error - Se ejecuta si hay error al iniciar el servidor
 * 
 * @returns {void}
 * 
 * @example
 * // Inicia en puerto 3000 (por defecto)
 * npm start
 * 
 * @example
 * // Inicia en puerto personalizado
 * set PORT=8080 && npm start
 */
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
}).on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`El puerto ${PORT} ya está en uso. Cierra el otro proceso o ejecuta: set PORT=3001 && npm start`);
    } else {
        console.error("Error al iniciar el servidor:", err.message);
    }
    process.exit(1);
});