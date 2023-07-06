import {Router} from "express";
import { get, getCarts } from "../controllers/views.controller.js";





const router = Router ();

router.get("/",(req,res)=>{
  res.render("home");
});

router.get("/products", get);

router.get("/carts/:cid",getCarts)

export { router as viewsRouter}