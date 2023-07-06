import {Router} from "express";
import { getProducts , getProductId, createProducts, updateProducts, deleteProducts} from "../controllers/products.controller.js";


const router = Router();

//products routes
//ruta para mostrar lista de productos
router.get("/", getProducts );

//ruta para buscar un producto por medio de su ID
router.get("/:pid", getProductId);

//ruta para crear un producto
router.post("/", createProducts);

//ruta para actualizar un producto
router.put("/:id", updateProducts);

//ruta para eliminar un producto
router.delete("/:id", deleteProducts);

export {router as productsRouter}