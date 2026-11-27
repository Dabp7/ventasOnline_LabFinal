# Ventas Online
API académica Node.js, Express y MongoDB para catálogo, carrito, compra y comprobantes. Datos de demostración propios; no procesa pagos ni emite documentos fiscales.

## Arranque reproducible
Requisitos: Node.js 22.15+ o 24, npm y Docker Compose.
```sh
git clone https://github.com/Dabp7/ventasOnline_LabFinal.git
cd ventasOnline_LabFinal
npm ci
docker compose up -d --wait
cp .env.example .env
npm run seed
npm start
```
En PowerShell usar `Copy-Item .env.example .env`. Elegir un secreto local de al menos 32 caracteres. La base replica set es necesaria para las transacciones. También se admite un replica set externo de demo configurando URI_MONGO.

API: http://127.0.0.1:3001, salud /health, documentación /api-docs.
Usuarios sintéticos: admin@example.test, alice@example.test y bob@example.test. Contraseña solo de demo: Demo-password-123! El seed no elimina datos y se limita a venta_online_demo. No se crea un administrador con datos personales al iniciar.

El seed también crea de forma idempotente la categoría Demo y la Categoria Predeterminada. Al borrar una categoría normal, sus productos se reasignan a esa categoría de respaldo, que no puede eliminarse. Ejecutar el seed otra vez no duplica los datos ni reinicia existencias.

## Recorrido de compra
1. POST /ventaOnline/v1/auth/login con email y password; usar userDetails.token como Authorization: Bearer.
2. GET /ventaOnline/v1/product/ obtiene el catálogo.
3. POST /ventaOnline/v1/cart/addProductCart con nameProduct y quantity entero positivo.
4. GET /ventaOnline/v1/cart/getCart muestra únicamente el carrito propio.
5. POST /ventaOnline/v1/buy/completeBuy confirma la compra.
6. GET del pdfPath devuelto descarga un PDF autenticado; GET /ventaOnline/v1/invoice/getInvoices muestra el historial propio.

El carrito no reserva stock. Al confirmar se descuentan unidades y se incrementan ventas dentro de una transacción con la factura y el vaciado del carrito. Una compra concurrente que pierde el último producto responde 409 y conserva su carrito. Repetir una compra sobre carrito vacío responde 409; no implementa una clave HTTP de idempotencia entre carritos diferentes.
Los precios se convierten a centavos para calcular líneas y totales. La moneda de la demo es GTQ. El PDF usa el snapshot de compra.

## Verificación
```sh
npm test
```
Los tests descargan y levantan MongoDB real temporal con replica set (mongodb-memory-server); no necesitan Docker ni .env. Verifican compras concurrentes, doble confirmación, rollback, cantidades inválidas, acceso a comprobantes y elevación de rol. npm ci no descarga MongoDB: la primera ejecución de las pruebas obtiene el binario oficial 8.0.16 elegido por la suite. GitHub Actions ejecuta instalación limpia y esta misma suite.

## Configuración y límites
.env.example documenta PORT, URI_MONGO y SECRETORPRIVATEKEY. No versionar .env, dumps con usuarios ni comprobantes. Si alguna credencial del historial correspondió a un servicio real, debe rotarse en ese servicio; borrar el archivo actual no revoca una credencial histórica.
Las rutas académicas de administración se conservan. Esta demo local no es una tienda productiva. Las decisiones y criterios están en docs/SPEC.md.

Crear o editar productos admite únicamente nombre, descripción, precio, stock y categoría existente. El stock es un entero no negativo y el precio admite hasta dos decimales; soldUnits se calcula al comprar y no es un campo editable. La categoría predeterminada no puede borrarse, para conservar las referencias del catálogo.
