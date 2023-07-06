import dotenv from "dotenv";
dotenv.config();

export const options = {
    server:{
        port:process.env.PORT,
        persistence: process.env.PERSITENCE
    },
    mongo:{
        url:process.env.MONGO_URL
    }
}