import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Venta Online API",
            version: "1.0.0",
            description: "API para la gestion de una tienda online",
            contact:{
                name: "Diego Bercian",
                email: "dbercian-2020527@kinal.edugt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/ventaOnline /v1"
            }
        ]
    },
    apis:[
        "./src/auth/*",
        "./src/buys/*",
        "./src/category/*",
        "./src/invoice/*",
        "./src/products/*",
        "./src/user/*"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}