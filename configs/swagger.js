import swaggerUi from 'swagger-ui-express';
export const swaggerDocs = {
  "openapi": "3.0.3",
  "info": {
    "title": "Ventas Online — demo académica",
    "version": "2.0.0",
    "description": "Catálogo, carrito sin reservas y compra transaccional en GTQ. Datos ficticios; no procesa pagos."
  },
  "servers": [
    {
      "url": "http://127.0.0.1:3001/ventaOnline/v1"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/auth/login": {
      "post": {
        "summary": "Iniciar sesión",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string"
                  }
                },
                "required": [
                  "email",
                  "password"
                ]
              }
            }
          }
        },
        "security": []
      }
    },
    "/auth/register": {
      "post": {
        "summary": "Registrar un cliente; no permite asignarse administrador",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "fullName": {
                    "type": "string"
                  },
                  "username": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string",
                    "format": "email"
                  },
                  "password": {
                    "type": "string",
                    "minLength": 8
                  },
                  "phone": {
                    "type": "string",
                    "pattern": "^[0-9]{8}$"
                  }
                },
                "required": [
                  "fullName",
                  "username",
                  "email",
                  "password",
                  "phone"
                ]
              }
            }
          }
        },
        "security": []
      }
    },
    "/product/": {
      "get": {
        "summary": "Listar catálogo público",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        },
        "security": []
      }
    },
    "/cart/addProductCart": {
      "post": {
        "summary": "Agregar intención de compra sin reservar stock",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "nameProduct": {
                    "type": "string"
                  },
                  "quantity": {
                    "type": "integer",
                    "minimum": 1
                  }
                },
                "required": [
                  "nameProduct",
                  "quantity"
                ]
              }
            }
          }
        }
      }
    },
    "/cart/getCart": {
      "get": {
        "summary": "Obtener el carrito propio",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        }
      }
    },
    "/cart/removeProduct/{idProduct}": {
      "delete": {
        "summary": "Quitar cantidad del carrito propio sin modificar stock",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "quantity": {
                    "type": "integer",
                    "minimum": 1
                  }
                },
                "required": [
                  "quantity"
                ]
              }
            }
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "idProduct",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ]
      }
    },
    "/buy/completeBuy": {
      "post": {
        "summary": "Confirmar stock, factura y carrito en una sola transacción",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        }
      }
    },
    "/invoice/getInvoices": {
      "get": {
        "summary": "Obtener historial propio",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        }
      }
    },
    "/invoice/getInvoice/{uid}": {
      "get": {
        "summary": "Obtener historial por usuario (solo administrador)",
        "responses": {
          "200": {
            "description": "Resultado correcto"
          },
          "400": {
            "description": "Entrada inválida"
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "403": {
            "description": "Rol sin permiso"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          },
          "409": {
            "description": "Conflicto de stock, carrito o unicidad"
          },
          "500": {
            "description": "Error interno sin detalles de infraestructura"
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "uid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ]
      }
    },
    "/invoice/{id}/pdf": {
      "get": {
        "summary": "Descargar PDF desde el snapshot; solo el propietario",
        "responses": {
          "200": {
            "description": "PDF de demo",
            "content": {
              "application/pdf": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          },
          "401": {
            "description": "Bearer token ausente, inválido o vencido"
          },
          "404": {
            "description": "Recurso inexistente o ajeno"
          }
        },
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ]
      }
    }
  }
};
export { swaggerUi };
