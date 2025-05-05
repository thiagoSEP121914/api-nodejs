import express from 'express';
import bodyParse from 'body-parser';
import animesRoutes from './routes/Animeroutes.js';

const app = express();
const PORT = 8080;

app.use(bodyParse.json());
app.use("/", animesRoutes);

app.listen(PORT, () => {
    console.log(`The server is running on the port ${PORT}`);
});

