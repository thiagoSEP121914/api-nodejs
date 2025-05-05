import express from 'express';
import AnimeDao from '../repositorio/AnimeDao.js';

const router = express.Router();

const api_key = 
router.get("/animes", async (req, res) => {
    try {
        const animes = await AnimeDao.findAll();
        res.status(200).json(animes);
    } catch(err) {
        console.log(`Erro: ${err}`)
        res.status(500).json({mensagem: "Erro ao buscar animes", err});
    }
});

router.get("/animes/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const anime = await AnimeDao.findById(id);
        res.status(200).json(anime);
    } catch(err) {
        console.log(`Erro ${err}`);
        res.status(40).json({mensagem: "Erro ao buscar anime", err});
    }
});

router.post("/animes", async (req, res) => {
    try {
        const anime = req.body;
        
        if (!anime.titulo || !anime.id_autor || !anime.realease_data) {
            return res.status(400).json({mensagem:"Campos obrigatorios"});
        }
        const result = await AnimeDao.insert(anime);
        res.status(201).json({mensagem: "Anime inserido com sucesso!!", anime});
    } catch (err) {
        console.log(`Erro ${err}`);
        res.status(400).send({mensagem:"Erro ao cadastrar o anime", erro: err.mensagem});
    }
});

router.patch("/animes", async (req, res) => {
    const { anime_id, titulo, realease_data} = req.body;

    if (!anime_id || !titulo || !realease_data) {
        res.status(400).send({mensagem: "Não pode haver campo nulo!!"});
    }

    try {
        const oldAnime = await AnimeDao.findById(anime_id);

        if (!oldAnime) {
            return res.status(400).send({mensagem:"Id nao encontrado!!"});
        }

        const updatedAnime = {
            anime_id,
            titulo,
            realease_data
        };
        const result = await AnimeDao.update(updatedAnime);
        res.status(200).json({mensagem:"Anime atualiado com sucesso!", result});
    } catch (err) {
        console.log(`Erro: ${err}`);
        res.status(500).json("Erro interno");
    }
});

router.delete("/animes/:id", async (req, res) => {
    const id = req.params.id;
    
    if (!await AnimeDao.findById(id)) {
        console.log(`O id não existe`);
        res.status(400).json({mensagem: "O id informado não existe"});
        return
    }
    try {
        const result = await AnimeDao.deleteByid(id);
        res.status(200).json({mensagem: "Anime deletado com sucesso!!"});
    }catch(err) {
        console.log(`Deu erro: ${err}`)
        res.status(500).json({mensagem: "Erro interno"})
    }
});

export default router;