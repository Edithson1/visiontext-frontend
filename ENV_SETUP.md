# API de la web

La web utiliza por defecto la API publicada:

```dotenv
VITE_API_URL=https://visiontext-backend.onrender.com
```

Ese valor está en `.env.example` y en el `.env.local` de este equipo.
Todos los endpoints y enlaces de imágenes usan la misma base, sin barra final.
El tiempo de espera es de 180 segundos para el arranque después de una pausa.

Para desarrollo, copia `.env.example` como `.env.local` si falta, ejecuta
`npm ci` y `npm run dev`. Reinicia Vite después de cambiar el archivo.

En Vercel configura esa misma variable y vuelve a desplegar. Vite fija su valor
al compilar. Si existe una variable antigua en Vercel, reemplázala: tiene prioridad
sobre la URL predeterminada del código. Usa Vite, `npm run build` y salida `dist`.
El `vercel.json` incluido permite enlaces directos a las rutas de la aplicación.

El Dockerfile recibe la dirección como argumento:

```powershell
docker build --build-arg VITE_API_URL=https://visiontext-backend.onrender.com -t visiontext-web .
```

El origen de la web publicada debe figurar en `CORS_ORIGINS` del backend en Render.
Usa el dominio HTTPS real del frontend sin ruta ni barra final. El backend ya
permite `http://localhost:5173` y `http://127.0.0.1:5173`. Android no depende de CORS.

Para usar el backend local deliberadamente, configura
`VITE_API_URL=http://localhost:8000` en `.env.local` y reinicia Vite.

Las variables `VITE_*` son públicas. Las contraseñas de Supabase, Google y
administrador pertenecen al backend; no las copies a este proyecto.

El botón **Descargar app (APK)** usa `GET /api/app/download` de esa misma API.
No necesita nuevas variables ni login. El backend debe incluir esa ruta y tener
una APK publicada en su carpeta de Drive. El botón espera hasta 180 segundos,
valida el tipo de archivo y muestra los errores sin descargar JSON o HTML como APK.
Las nuevas APK publicadas se descargan desde el mismo botón sin recompilar la web.
