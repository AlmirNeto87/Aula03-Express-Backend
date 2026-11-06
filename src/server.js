const express = require('express');
const ProdutosRoutes = require('./routes/produtosroutes');
const UsuariosRoutes = require('./routes/usuariosroutes');

const host = "localhost";
const port = 3000;

const app = express();
app.use(express.json());
app.use(ProdutosRoutes);
app.use(UsuariosRoutes);

app.get('/', (request, response)=>{

    return response.send("Hello World!");

})



app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});