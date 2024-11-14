
# Microservicio de Productos

Este proyecto es un microservicio diseñado para gestionar productos, construido con Node.js, Express, y SQL Server.
El servicio permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos y se puede ejecutar mediante Docker.

## Requisitos

- Docker
- Cuenta en Docker Hub

## Instalación

1. **Iniciar sesión en Docker Hub**

   Para descargar la imagen, primero iniciar sesión en Docker Hub con el siguiente comando:

   ```bash
   docker login
   ```

   Colocar su nombre de usuario y contraseña de Docker Hub cuando se lo solicite.

2. **Descargar la imagen Docker**

   Una vez iniciada la sesión, descargar la imagen del microservicio con:

   ```bash
   docker pull gcsimbana1/servicio-productos:v1
   ```

## Uso

1. **Configurar el Entorno**

   Se debe crear un archivo `.env` en el mismo directorio que el proyecto con las siguientes variables de entorno:

   ```plaintext
   DB_USER=sa
   DB_PASSWORD=123
   DB_SERVER=DESKTOP-5H4JARL\CAROLINA
   DB_DATABASE=Distribuidas
   PORT=3000

   ```

2. **Iniciar el Contenedor**

   Ejecutar el contenedor de Docker:

   ```bash
   docker run -d -p 1433:3000 --env-file .env gcsimbana1/servicio-productos:v1
   ```


3. **Endpoints Disponibles**

   - **Obtener productos**: `GET /productos`
   - **Agregar producto**: `POST /productos`
   - **Eliminar producto**: `DELETE /productos/:id`
   - **Actualizar producto**: `PUT /productos/:id`

   Consultar el archivo `CRUD DE DATOS.txt` para más detalles sobre cómo probar cada endpoint con Postman.

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- `dotenv`: para gestionar variables de entorno
- `express`: para crear el servidor web
- `mssql`: para conectarse a la base de datos SQL Server

## Notas

Se debe asegurar que la base de datos SQL Server esté en funcionamiento y accesible desde el contenedor para que el microservicio pueda conectarse correctamente.


