# Arias23 - Concesionario de Lujo

Este es el proyecto final de curso para un concesionario de coches de lujo. El proyecto incluye un front-end moderno construido con React y Vite, y un back-end seguro con Node.js y SQLite.

## Características

- **Diseño Premium**: Interfaz elegante y responsiva inspirada en marcas de lujo.
- **Protección SQL Injection**: Implementada mediante consultas parametrizadas en el servidor.
- **Conexión Segura (HTTPS)**: Configurado para funcionar bajo SSL tanto en desarrollo como en producción.
- **Catálogo Interactivo**: Visualización de modelos con detalles técnicos y galería de imágenes.

## Estructura del Proyecto

- `src/`: Código fuente del Front-End (React).
- `backend/`: Código fuente del servidor seguro y base de datos (Node.js + SQLite).
- `dist/`: Carpeta de distribución lista para producción.

## Requisitos

- Node.js (versión 18 o superior)
- npm

## Instalación y Uso

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
2. Instala las dependencias del servidor:
   ```bash
   cd backend
   npm install
   cd ..
   ```
3. Inicia el servidor de seguridad:
   ```bash
   node backend/server.js
   ```
4. Inicia la aplicación web (en otra terminal):
   ```bash
   npm run dev
   ```

## Despliegue en GitHub Pages

La carpeta `dist` ha sido configurada con rutas relativas para facilitar el despliegue directo en GitHub Pages.

---
*Desarrollado para el trabajo final de curso.*
