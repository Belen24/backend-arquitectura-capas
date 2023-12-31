import { ProductsMongo } from "../dao/managers/products.mongo.js";

const productsService = new ProductsMongo();

// Mostrar lista de productos
export const getProducts = async (req, res) => {
    try {
        const {limit=10,page=1,sort,category,stock} = req.query;
        if(!["asc","desc"].includes(sort)){
            res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"})
        };
        const sortValue = sort === "asc" ? 1 : -1;
        const stockValue = stock === 0 ? undefined : parseInt(stock);
        // console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
        let query = {};
        if(category && stockValue){
            query = {category: category, stock:stockValue}
        } else {
            if(category || stockValue){
                if(category){
                    query={category:category}
                } else {
                    query={stock:stockValue}
                }
            }
        }
        // console.log("query: ", query)
        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        //baseUrl: http://localhost:8080/api/products
        const result = await productsService.getPaginate(query, {
            page,
            limit,
            sort:{price:sortValue},
            lean:true
        });
        // console.log("result: ", result);
        const response = {
            status:"success",
            payload:result.docs,
            totalPages:result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page:result.page,
            hasPrevPage:result.hasPrevPage,
            hasNextPage:result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null,
        }
        console.log("response: ", response);
        res.json(response);
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
  };

  //Buscar un producto por medio de su ID
  export const getProductId = async(req,res)=>{
    try {
        const productId = await productsService.getProductById(req.params.pid);
        res.json({status:"success",data:productId});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }
};

//Crear un producto
export const createProducts = async(req,res)=>{
    try {
        const productCreated = await productsService.createProduct(req.body);
        res.json({status:"success",data:productCreated});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }
};

// Actualizar un producto
export const updateProducts = async(req,res)=>{
    try {
        //const {price}= req.body;
        const modProduct = await productsService.updateProduct(req.params.id , req.body);
        res.json({status:"success",data:modProduct});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }
};

// Eliminar un producto
export const deleteProducts = async(req,res)=>{
    try {
        const result = await productsService.deleteProduct(req.params.id);
        res.json({status:"success",data:result.message});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({status:"error", message:error.message});
    }
}