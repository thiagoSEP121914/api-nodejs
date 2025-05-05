import db from "./db.js";

db.connection();

export async function findAll() {
    const sql = "SELECT * FROM animes "+
                "INNER JOIN author ON animes.id_autor = author.id_autor;";
    
    try {
        const result = await db.client.query(sql);
        return result.rows;
    } catch (err) {
        console.log(`Erro da porrua: ${err}`)
    }
}

export const findById = async (id) => {
    const sql = `SELECT * FROM animes ` +
                `INNER JOIN author ON animes.id_autor = author.id_autor `+
                `WHERE animes.anime_id = $1`;
    try {
        const result = await db.client.query(sql,[id]);
        return result.rows[0];
    } catch(err){
        console.log(`Erro da pourra: ${err}`)
    }
}

export const insert = async (anime) => {
    const sql = `INSERT INTO animes (titulo, id_autor, realease_date) ` +
                `VALUES ($1, $2, $3)`;
    try {
        const result = await db.client.query(sql, [ anime.titulo, 
        anime.id_autor, 
        anime.realease_data
    ]);
    return result.rows[0];
    }catch(err) {
        console.log(`Erro nessa porra caralho nao deu para inserir. motivo:  ${err} `);
        throw err;
    }        
}


export const update = async (anime) => {
    const sql  = `UPDATE animes `+
                 `SET titulo = $1, realease_date = $2 ` +
                 `WHERE anime_id = $3`;
    try {
        const result = await db.client.query(sql,[
            anime.titulo,
            anime.realease_data,
            anime.anime_id
        ]);
        return result.rows[0];
    } catch(err) {
        console.log(`Erro ${err}`);
        throw err;
    }
}

export const deleteByid = async (id) => {
    const sql = `DELETE FROM animes ` +
                `WHERE anime_id = $1`;
    try {
        const anime = await findById(id);
        const result = await db.client.query(sql, [id]);
        return anime;
    }catch(err) {
        console.log(`Erro ao delete anime: ${err}`);
        throw err;
    }
}

export default {findAll, findById, insert, update, deleteByid};

/*
const listOfanimes = await findAll();
for (const anime of listOfanimes) {
    console.log(anime);
}


console.log("=================================");
console.log("BUSCA POR ID");
console.log("=================================");
const anime = await findById();
console.log(anime);
*/