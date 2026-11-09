const express = require('express');
const ProdutosRoutes = require('./routes/produtosroutes');
const PrivateRoutes = require('./routes/PrivateRoutes');
const TasksRoutes = require('./routes/TasksRoutes');

const host = "localhost";
const port = 3000;

const app = express();
app.use(express.json());
app.use(ProdutosRoutes);
app.use(TasksRoutes);
app.use(PrivateRoutes);





app.get('/', (request, response)=>{

    return response.send("Hello World!");

})



app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});