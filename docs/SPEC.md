# Compra concurrente y permisos
Objetivo: cada compra confirma stock, factura y vaciado de carrito en una sola transacción MongoDB.
El carrito expresa intención y no reserva unidades; agregar y quitar productos nunca modifica stock.
Dos compradores por la última unidad producen una compra y un conflicto 409.
Si falla cualquier línea, se revierte toda la transacción y se conserva el carrito.
No se mantiene una reserva en memoria ni un temporizador que desaparece al reiniciar.
Los comprobantes se regeneran desde el snapshot de la factura por una ruta autenticada.
Solo el propietario obtiene el PDF. La ruta administrativa conserva su control de rol.
Registro y edición de perfil no permiten elevar el rol. Los hashes no se serializan.
MongoDB debe ser replica set, incluso en local; una instancia standalone no cumple el contrato.
