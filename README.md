
# Proyecto React + Python

Este proyecto utiliza React para el frontend y Python (Django) para el backend. Asegúrate de tener instaladas las dependencias necesarias antes de comenzar.

## Requisitos previos

- Node.js y npm (o Yarn)
- Python 3.x
- pip (gestor de paquetes de Python)
- Virtualenv (opcional, recomendado)
- Base de datos configurada (por ejemplo, SQLite, PostgreSQL, etc.)

---

## Configuración del Backend (Django)

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <CARPETA_DEL_BACKEND>
   ```

2. Crear y activar un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

3. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Configurar la base de datos en `settings.py` (si no usas SQLite).

5. Ejecutar migraciones:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Crear un superusuario:
   ```bash
   python manage.py createsuperuser
   ```

7. Ejecutar el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

El servidor estará disponible en `http://127.0.0.1:8000/`.

---

## Configuración del Frontend (React)

1. Moverte a la carpeta del frontend:
   ```bash
   cd <CARPETA_DEL_FRONTEND>
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```
   O si prefieres Yarn:
   ```bash
   yarn install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm start
   ```
   O con Yarn:
   ```bash
   yarn start
   ```

El servidor estará disponible en `http://localhost:3000/`.

---

## Comandos útiles

### Crear un superusuario (Backend):
```bash
python manage.py createsuperuser
```

### Ejecutar migraciones:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Instalar dependencias adicionales en el backend:
```bash
pip install <nombre_paquete>
```

### Instalar dependencias adicionales en el frontend:
```bash
npm install <nombre_paquete>
```

-------------------------------------------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
