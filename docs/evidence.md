# Evidencia 2026-11-26

Entorno: Windows 10, Node.js 22.15.0, npm 10.9.2, MongoDB 8.0.8 real en replica set temporal.

Comando: `npm test`, con `MONGOMS_SYSTEM_BINARY` apuntando al mongod local y `MONGOMS_SYSTEM_BINARY_VERSION_CHECK=false` para usar esa instalación.

Resultado: seis pruebas aprobadas, cero fallos. La suite levanta y elimina su propia base temporal; no usa la base personal.

- Dos compradores por la última unidad: un 200 y un 409, stock cero y una factura.
- Doble confirmación: una compra.
- Fallo de segunda línea: rollback de stock y factura, carrito conservado.
- Cantidades inválidas y eliminación excesiva: no crean inventario.
- Autenticación, aislamiento del PDF y ruta administrativa.
- Registro y edición de perfil sin elevación de privilegios ni serialización de hashes.

Se retiraron del árbol versionado .env, dumps y comprobantes previos; siguen en el historial. Cualquier credencial histórica real requiere rotación por su propietario. El seed nuevo solo contiene identidades ficticias.
