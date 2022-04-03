// 1 Importaciones 
//importacion de la librería de express
// realizar nuestra gestión de rutas. 
const express = require('express');
// 2 Middlewares
require("dotenv").config()

const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();

const cors = require("cors");

// 2 Middlewares
//función que se ejectua previo a las rutas.
app.use(express.json({extended: true}));

//flexibilidad en el manejo de peticiones de cliente a servidor.
app.use(cors());

// 3 Ruteo
app.get("/", async (req, res) => {
   // console.log(stripe);

        //1. Establecer los IDs de los precios de STRIPE. 
        const productId = "price_1KkXzpAM8E9TFlUQRhFUu3Se";

        //2. Generar una sesión. Esto es un momento en el cual stripe ya sabe que el usuario quiere comprar. 
        // por lo tanto emite la información requerida para la compra.
        // entre esa información está la URL de compra. 

        const session = await stripe.checkout.sessions.create({
            // el primer dato que tengo que mandar es la linea de producto
            line_items: [
                {
                    price: productId,
                    quantity: 1
                }
            ],
            payment_method_types: [
                "card"
            ],
            mode: "payment", //3. este es el tipo de pago
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000?cancelled=true`
        })

          //  console.log(session);
          //  res.send("Hola mundo");
            res.json({
                stripe_info: session
            })

})

    


/// 4 Servidor 
app.listen(process.env.PORT, () => {
    console.log("Servidor activo");
})