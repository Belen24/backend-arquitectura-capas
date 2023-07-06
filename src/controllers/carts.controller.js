import { CartsMongo } from "../dao/managers/carts.mongo.js";

const cartsService = new CartsMongo();

export const getCart = async(req,res)=>{
    try {
        const cart = await cartsService.getCarts();
       //res.json({status:"success",data:cart});
       res.render("carts", {data:cart})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:"Hubo un error al obtener el carrito"});
    }
};

export const getCartId = async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        console.log(cart); // por consola me trae los productos_Id y la propiedad quantity, pero no logro visualizarlos en la vista "carts.hbs"
       res.json({status:"success",data:cart});
       //res.render("carts", {data:cart})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:"Hubo un error al obtener el carrito"});
    }
};

export const cartPopulate = async(req,res)=>{
    try {
        const {cid} = req.params;
        const cart =(await cartsService.getPopulate(cid));
        res.json(cart);
        console.log (cart);
        //res.render("carts", {cart});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:"Hubo un error al obtener la información"});
    }
};

export const createCarts = async(req,res)=>{
    try {
        const cartCreated = await cartsService.createCart();
        res.json({status:"success",data:cartCreated});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }
};

export const addProducts = async(req,res)=>{
    try {
        //const {price}= req.body;
        //const modProduct = 
        await cartsService.addProduct(req.params.cid , req.params.pid);
        const updatedCart = await cartsService.getCartById(req.params.cid);

    res.json({ status: "success", data: updatedCart });
        //res.json({status:"success",data:modProduct});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }

};

export const updateCarts = async(req,res)=>{
    try {
        const { quantity } = req.body;

        if (!quantity || isNaN(quantity)) {
          throw new Error("La cantidad debe ser un número válido");
        }
    
        const modCart = await cartsService.updateCart(
          req.params.cid,
          req.params.pid,
          parseInt(quantity)
        );
    
        res.json({ status: "success", data: modCart });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }

};

export const deleteCarts = async(req,res)=>{
    try {
        const resultId = await cartsService.deleteCart(req.params.cid);
        res.json({status:"success",data:resultId.message});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }
};

export const deleteProduct = async(req,res)=>{
    try {
        const resultId = await cartsService.deleteProduct(req.params.cid , req.params.pid);
        res.json({status:"success",data:resultId.message});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }
}