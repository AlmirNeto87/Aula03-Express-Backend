const express = require('express');
require('./models/models');
require('dotenv').config();
const syncDatabase = require('./database/syncforce');
const ProdutosRoutes = require('./routes/Produtosroutes');
const PrivateRoutes = require('./routes/PrivateRoutes');
const PublicRoutes = require('./routes/PublicRoutes');


const host = "localhost";
const port = 3000;

const app = express();
app.use(express.json());


app.get('/', (request, response)=>{

    return response.send("Hello World!");

})

async function startServer() {
    try {
        await syncDatabase();

        app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}`);
        });

    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

startServer();


app.use(ProdutosRoutes);
app.use(PublicRoutes);

app.use(PrivateRoutes);


app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});