# API de Películas

Una API REST construida con Express.js que proporciona información sobre películas, géneros y permite filtrar contenido.

## 📋 Descripción

Esta aplicación es una API que expone un conjunto de endpoints para gestionar y consultar información de películas. Los datos se almacenan en un archivo JSON y se sirven a través de endpoints HTTP.

## 🚀 Características

- ✅ Obtener todas las películas
- ✅ Filtrar películas por género
- ✅ Obtener película por ID
- ✅ Listar todos los géneros disponibles
- ✅ CORS habilitado para solicitudes desde el navegador
- ✅ Manejo de errores robusto

## 📦 Requisitos Previos

- Node.js (versión 14 o superior)
- npm

## 🔧 Instalación

1. **Clonar o descargar el proyecto:**
   ```bash
   cd api-render
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

## ▶️ Ejecución

Para iniciar el servidor:

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000` (o en el puerto especificado en la variable `PORT`).

**Nota:** Si el puerto 3000 ya está en uso, ejecuta:
```bash
set PORT=3001 && npm start
```

## 📚 Endpoints

### 1. Inicio / Información General
```
GET /
```
Devuelve un mensaje de bienvenida y lista todos los endpoints disponibles.

**Respuesta:**
```json
{
  "mensaje": "Bienvenidos a nuestra API",
  "endpoints": [
    "/api/peliculas",
    "/api/peliculas&generos=acción",
    "/api/peliculas/:id",
    "/api/generos"
  ]
}
```

### 2. Obtener Todas las Películas
```
GET /api/peliculas
```
Devuelve la lista completa de todas las películas.

**Respuesta:**
```json
{
  "total": 5,
  "peliculas": [
    {
      "id": 1,
      "titulo": "Inception",
      "año": 2010,
      "genero": "Ciencia Ficción",
      "director": "Christopher Nolan",
      "rating": 8.8,
      "sinopsis": "Un ladrón especializado en extraer secretos...",
      "duracion": 148,
      "poster": "/img/peliculas/p1.jpg"
    },
    ...
  ]
}
```

### 3. Filtrar Películas por Género
```
GET /api/peliculas?genero=Ciencia%20Ficción
```
Devuelve solo las películas del género especificado.

**Parámetros de Consulta:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `genero` | string | Nombre del género (opcional) |

**Ejemplo:**
```
GET /api/peliculas?genero=Drama
```

**Respuesta:**
```json
{
  "total": 1,
  "peliculas": [
    {
      "id": 2,
      "titulo": "El Padrino",
      "año": 1972,
      ...
    }
  ]
}
```

### 4. Obtener Película por ID
```
GET /api/peliculas/:id
```
Devuelve la información completa de una película específica.

**Parámetros de Ruta:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | número | ID de la película |

**Ejemplo:**
```
GET /api/peliculas/1
```

**Respuesta:**
```json
{
  "id": 1,
  "titulo": "Inception",
  "año": 2010,
  "genero": "Ciencia Ficción",
  "director": "Christopher Nolan",
  "rating": 8.8,
  "sinopsis": "Un ladrón especializado en extraer secretos...",
  "duracion": 148,
  "poster": "/img/peliculas/p1.jpg"
}
```

**Error (404):**
```json
{
  "error": "Película no encontrada"
}
```

### 5. Obtener Géneros Disponibles
```
GET /api/generos
```
Devuelve la lista de todos los géneros disponibles.

**Respuesta:**
```json
{
  "generos": [
    "Ciencia Ficción",
    "Drama",
    "Animación",
    ...
  ]
}
```

## 🗂️ Estructura del Proyecto

```
api-render/
├── index.js              # Archivo principal de la aplicación
├── package.json          # Dependencias y configuración del proyecto
├── peliculas.json        # Datos de películas en formato JSON
└── README.md             # Este archivo
```

## 📦 Dependencias

- **express** (^5.2.1) - Framework web para Node.js
- **cors** (^2.8.6) - Middleware para habilitar CORS

## 🧪 Pruebas Manuales

Puedes probar los endpoints utilizando:

### Con cURL:
```bash
# Obtener todas las películas
curl http://localhost:3000/api/peliculas

# Filtrar por género
curl "http://localhost:3000/api/peliculas?genero=Drama"

# Obtener película por ID
curl http://localhost:3000/api/peliculas/1

# Obtener géneros
curl http://localhost:3000/api/generos
```

### Con Postman:
1. Importa la colección o crea nuevas solicitudes
2. Usa los endpoints mencionados arriba
3. Selecciona el método GET
4. Envía las solicitudes

## ⚙️ Configuración

### Puerto Personalizado
Por defecto, la API corre en el puerto 3000. Para cambiar el puerto:

```bash
set PORT=8080 && npm start  # En Windows
PORT=8080 npm start         # En Mac/Linux
```

## 📝 Notas Importantes

- La API implementa CORS, por lo que puede ser accedida desde aplicaciones web en otros dominios
- Los filtros de género son **case-insensitive**
- El servidor maneja automáticamente errores de puerto en uso
- Los datos se cargan del archivo `peliculas.json` al iniciar la aplicación

## 🐛 Solución de Problemas

### Error: "El puerto 3000 ya está en uso"
**Solución:** Usa un puerto diferente:
```bash
set PORT=3001 && npm start
```

### La API no responde
**Verifica:**
1. Que el servidor esté corriendo: `npm start`
2. Que estés usando la URL correcta: `http://localhost:3000`
3. Que las solicitudes sean GET (para los endpoints actuales)

## 📄 Licencia

ISC

## 👨‍💻 Autor

Desarrollado para Render API

---

**¿Necesitas ayuda?** Consulta los endpoints disponibles visitando la raíz de la API: `GET /`
