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

Verificación adicional 2026-11-27: seed en base vacía, proceso real `node index.js`, health, login y catálogo aprobados. Se añadió la ruta pública de catálogo `/product/` documentada (se conserva `/getProducts`) y se espera la creación de índices antes de escuchar. Un fallo de arranque desconecta MongoDB.
`npm audit --omit=dev`: cero vulnerabilidades.

Revisión independiente adicional: tres regresiones reprodujeron respuestas 200 que dejaban stock negativo, ejecutaban un operador MongoDB recibido en el body y borraban la categoría predeterminada con productos que la referenciaban. Se añadieron validación y lista de campos editables en altas/ediciones, actualizaciones mediante $set y protección del respaldo. La suite final pasó nueve pruebas reales, incluida una edición válida y el id de categoría tanto en minúsculas como en mayúsculas.

`config.mongodbMemoryServer.disablePostinstall=true` evita la descarga de otro binario durante npm ci; el resolver de la dependencia confirmó true. La suite sigue eligiendo 8.0.16 y esta ejecución reutilizó el mongod local 8.0.8 mediante las variables ya descritas. No se cambiaron dependencias ni se utilizaron datos personales.
