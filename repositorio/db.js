import { Client } from "pg";

const client = new Client({
    user:"postgres",
    host:"localhost",
    password:"palmeiras23",
    database:"Anime.db",
    port:5432,
});

export async function connection() {
    try {
        await client.connect();
        console.log("Banco conectado com sucesso!!");
     } catch (err) {
        console.log(`Was not possible to conect because:${err}`);
     }
}

export default {connection, client};

