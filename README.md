# Hexlet Chat

[![Actions Status](https://github.com/luisfelipemontoya/fullstack-javascript-project-139/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/luisfelipemontoya/fullstack-javascript-project-139/actions/workflows/hexlet-check.yml)

Aplicación de chat en tiempo real que permite registrarse, iniciar sesión e intercambiar mensajes en distintos canales. Desarrollada como proyecto del programa Fullstack JavaScript de Hexlet.

## Demo

[Ver la aplicación](https://fullstack-javascript-project-139-oosz.onrender.com)

## Funcionalidades
- Registro, inicio y cierre de sesión.
- Rutas protegidas para usuarios autenticados.
- Mensajes en tiempo real mediante Socket.IO.
- Canales predeterminados `general` y `random`.
- Creación, renombrado y eliminación de canales personalizados.
- Validación de formularios y filtrado de lenguaje inapropiado.
- Bloqueo del envío de mensajes mientras se procesa la petición.
- Notificaciones de operaciones y errores de red.

## Tecnologías

- React y React Router.
- Redux Toolkit y React Redux.
- React Bootstrap y Bootstrap.
- Formik y Yup.
- Axios y Socket.IO Client.
- i18next y react-i18next.
- React Toastify y leo-profanity.
- Vite y ESLint.
- Backend proporcionado por `@hexlet/chat-server`.

## Requisitos

- Node.js y npm.
- Git.
- Make para utilizar los comandos del Makefile.

En Windows se puede trabajar desde WSL con Ubuntu.

## Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/luisfelipemontoya/fullstack-javascript-project-139.git
cd fullstack-javascript-project-139
```

Instala las dependencias del backend y del frontend:

```bash
make install
```

Si no tienes Make, utiliza:

```bash
npm install
npm --prefix frontend install
```

## Desarrollo local

Ejecuta los siguientes comandos desde la raíz del proyecto, en dos terminales diferentes.

### Terminal 1: backend

```bash
make start
```

El backend escucha en `http://localhost:5001`.

Comando equivalente sin Make:

```bash
npx start-server -s ./frontend/dist
```

### Terminal 2: frontend

```bash
npm --prefix frontend run dev
```

Abre la dirección que muestra Vite, normalmente:

[http://localhost:5173](http://localhost:5173)

Vite redirige las peticiones `/api` y `/socket.io` al backend del puerto `5001`.

Mantén ambas terminales abiertas. Los cambios del frontend se actualizan mediante Vite y no requieren reiniciar el backend.

## Compilación y ejecución de la versión compilada

Desde la raíz:

```bash
make build
make start
```

La compilación genera los archivos estáticos en `frontend/dist`. El servidor los publica junto con la API en:

[http://localhost:5001](http://localhost:5001)

Si ya tienes el backend ejecutándose en ese puerto, detén esa instancia antes de iniciar otra.

## Verificación

Ejecuta el linter:

```bash
npm --prefix frontend run lint
```

Comprueba la compilación:

```bash
npm --prefix frontend run build
```

Las pruebas de Hexlet se ejecutan automáticamente en GitHub Actions al hacer push. Su resultado puede consultarse en el badge del inicio o en la pestaña Actions del repositorio.

El comando `npm test` de la raíz todavía contiene el script predeterminado de npm y no ejecuta las pruebas de Hexlet.

## Organización del código

```text
.
├── src/
│   └── init.ts           # Punto de entrada para Hexlet
├── frontend/
│   ├── src/
│   │   ├── api/          # API HTTP, rutas y acceso a localStorage
│   │   ├── components/   # Componentes compartidos y modales
│   │   ├── pages/        # Login, registro, chat y página no encontrada
│   │   ├── routes/       # Protección de rutas
│   │   ├── socket/       # API de suscripción a eventos del socket
│   │   ├── store/        # Store y slices de Redux
│   │   ├── i18n.js       # Traducciones e inicialización asíncrona
│   │   └── init.jsx      # Inicialización de la aplicación y proveedores
│   └── vite.config.js
├── Makefile
└── package.json
```

Cada inicialización de la aplicación crea su propio store e instancia de i18n. Las traducciones se preparan antes de renderizar los componentes. El canal seleccionado se administra dentro del slice de canales.

## Solución de problemas

### Error `ECONNREFUSED` en el puerto 5001

Comprueba que el backend esté ejecutándose con `make start`. Iniciar Vite no inicia automáticamente el backend.

### Respuesta 401 en canales o mensajes

El servidor no está aceptando la autenticación. Cierra sesión y vuelve a entrar. Si el login también responde 401, comprueba las credenciales y que estés utilizando el mismo servidor donde registraste la cuenta.

### El usuario existe en la demo, pero no en local

La demo y el servidor local son entornos independientes. Una cuenta registrada en uno no se crea automáticamente en el otro.