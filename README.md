

# API de Venta Online

Este repositorio contiene una API para la gestión de usuarios, autenticación, categorías y productos en un sistema de venta en línea. La API proporciona funcionalidades como el registro y login de usuarios, así como la administración de roles, categorías y productos.

## Requisitos

Antes de comenzar, asegúrate de tener las siguientes dependencias instaladas:

- **Node.js**: 14.x o superior.
- **MongoDB**: Asegúrate de tener MongoDB ejecutándose en tu máquina o utiliza un servicio de MongoDB en la nube.

- ## Credenciales por Defecto

Para realizar pruebas con un usuario administrador, puedes usar las siguientes credenciales:

- **Correo electrónico**: `dbercian@gmail.com`
- **Contraseña**: `dBerc1an!`

## Consideraciones

1. Asegúrate de tener un entorno adecuado para ejecutar el servidor (Node.js, MongoDB).
2. Utiliza el token de autenticación en las solicitudes que lo requieran.
3. Los roles de los usuarios se gestionan a través de la API, y el rol `ADMIN_ROLE` se asigna automáticamente a los administradores.

## Instalación

Para instalar las dependencias y comenzar a trabajar con la API, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno necesarias, como la conexión a la base de datos MongoDB, en un archivo `.env`. Si usas MongoDB local, la cadena de conexión debe lucir algo así:

   ```bash
   MONGO_URI=mongodb://localhost:27017/ventaOnline
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

La API debería estar ejecutándose en `http://localhost:3001`.

## Endpoints

### 1. **Autenticación**

#### 1.1 **Login**
- **Método**: POST
- **Ruta**: `/ventaOnline/v1/auth/login`
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "dbercian@gmail.com",
    "password": "dBerc1an!"
  }
  ```
- **Descripción**: Permite a los usuarios iniciar sesión proporcionando su correo electrónico y contraseña.

#### 1.2 **Register**
- **Método**: POST
- **Ruta**: `/ventaOnline/v1/auth/register`
- **Cuerpo de la solicitud**:
  ```json
  {
    "fullName": "Usuario Prueba admin",
    "username": "pruebaAdmin",
    "email": "pruebaAdmin@gmail.com",
    "password": "dBerc1an!",
    "profilePicture": "<URL_DE_LA_IMAGEN>",
    "phone": "49985236",
    "role": "ADMIN_ROLE"
  }
  ```
- **Descripción**: Registra un nuevo usuario. El campo `role` se establece en `ADMIN_ROLE` para el administrador por defecto.

### 2. **Gestión de Usuarios**

#### 2.1 **Actualizar Role**
- **Método**: PATCH
- **Ruta**: `/ventaOnline/v1/user/editRole/:id`
- **Cuerpo de la solicitud**:
  ```json
  {
    "role": "ADMIN_ROLE"
  }
  ```
- **Descripción**: Actualiza el rol de un usuario existente. Este endpoint requiere un token de autenticación en el encabezado `Authorization`.

#### 2.2 **Actualizar Usuario**
- **Método**: PUT
- **Ruta**: `/ventaOnline/v1/user/editUser/:id`
- **Cuerpo de la solicitud**:
  ```json
  {
    "fullName": "Nuevo Nombre",
    "phone": "12345678"
  }
  ```
- **Descripción**: Permite actualizar la información de un usuario. Este endpoint requiere un token de autenticación en el encabezado `Authorization`.

#### 2.3 **Eliminar Usuario**
- **Método**: DELETE
- **Ruta**: `/ventaOnline/v1/user/deleteUser/:id`
- **Cuerpo de la solicitud**:
  ```json
  {
    "password": "dBerc1an!"
  }
  ```
- **Descripción**: Elimina un usuario del sistema. Este endpoint requiere un token de autenticación en el encabezado `Authorization`.

### 3. **Categorías**

#### 3.1 **Agregar Categoría**
- **Método**: POST
- **Ruta**: `/ventaOnline/v1/category/addCategory`
- **Cuerpo de la solicitud**:
  ```json
  {
    "nameCategory": "Prueba Categoria",
    "description": "Equipamiento y accesorios deportivos"
  }
  ```
- **Descripción**: Crea una nueva categoría de productos.

#### 3.2 **Listar Categorías**
- **Método**: GET
- **Ruta**: `/ventaOnline/v1/category/`
- **Descripción**: Obtiene una lista de todas las categorías disponibles.

#### 3.3 **Actualizar Categoría**
- **Método**: PATCH
- **Ruta**: `/ventaOnline/v1/category/editCategory/:id`
- **Cuerpo de la solicitud**:
  ```json
  {
    "description": "Equipamiento y accesorios deportivos de futbol"
  }
  ```
- **Descripción**: Actualiza la descripción de una categoría existente.

#### 3.4 **Eliminar Categoría**
- **Método**: DELETE
- **Ruta**: `/ventaOnline/v1/category/deleteCategory/:id`
- **Descripción**: Elimina una categoría del sistema.

### 4. **Productos**

#### 4.1 **Agregar Producto**
- **Método**: POST
- **Ruta**: `/ventaOnline/v1/product/addProduct`
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "Producto de Prueba",
    "category": "Categoría de Ejemplo",
    "price": 29.99,
    "description": "Descripción del producto"
  }
  ```
- **Descripción**: Permite agregar un nuevo producto al sistema.



**Productos Más Vendidos**
   - **GET**: `http://localhost:3001/ventaOnline/v1/product/getTopProducts`
   - Obtiene los productos más vendidos.

**Productos Agotados**
   - **GET**: `http://localhost:3001/ventaOnline/v1/product/getStockProducts`
   - Obtiene los productos que están agotados.

**Mayor Stock**
   - **GET**: `http://localhost:3001/ventaOnline/v1/product/getMostProducts`
   - Obtiene los productos con mayor stock disponible.

**Productos por Categoría**
   - **GET**: `http://localhost:3001/ventaOnline/v1/product/getProductsByCategory/{categoryId}`
   - Obtiene los productos de una categoría específica.

5. **Categoría por Nombre**
   - **GET**: `http://localhost:3001/ventaOnline/v1/product/getProductsByName/{categoryName}`
   - Obtiene productos según el nombre de la categoría.

### Carrito

**Agregar al Carrito**
   - **POST**: `http://localhost:3001/ventaOnline/v1/cart/addProductCart`
   - Se utiliza para agregar productos al carrito.
   - Se incluye un `bearer token` para autenticación.

**Ver mi Carrito**
 - **GET**: `http://localhost:3001/ventaOnline/v1/cart/getCart`
   - Muestra los productos actualmente en el carrito del usuario.

**Eliminar Producto del Carrito**
   - **DELETE**: `http://localhost:3001/ventaOnline/v1/cart/removeProduct/{productId}`
   - Elimina un producto del carrito.

### Compras

**Confirmar Compra**
   - **POST**: `http://localhost:3001/ventaOnline/v1/buy/completeBuy`
   - Completa la compra, se debe pasar un token de autenticación.

### Facturas

**Historial de Compra**
   - **GET**: `http://localhost:3001/ventaOnline/v1/invoice/getInvoices`
   - Obtiene el historial de compras del usuario.





