import {Router} from "express";
import { addProducts, cartPopulate, createCarts, deleteCarts, deleteProduct, getCart, getCartId, updateCarts } from "../controllers/carts.controller.js";


const router = Router();

//cart routes
//Ruta para visualizar los carritos
router.get("/", getCart);


//ruta para visualizar un carrito por su ID
router.get("/:cid", getCartId);


//Populate
router.get("/population/:cid",cartPopulate);


//ruta para crear un carrito
router.post("/", createCarts);

//ruta para buscar un carrito y agregar un producto solo con su ID
router.post("/:cid/product/:pid", addProducts);

//ruta para actualizar un carrito
router.put("/:cid/product/:pid", updateCarts);

//ruta para eliminar un carrito
router.delete("/:cid", deleteCarts);

//ruta para eliminar producto por ID del carrito
router.delete("/:cid/product/:pid", deleteProduct);

export {router as cartsRouter}