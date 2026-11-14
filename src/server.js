const express = require('express');
require('./models/models');
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


app.use(ProdutosRoutes);
app.use(PublicRoutes);

app.use(PrivateRoutes);







app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});