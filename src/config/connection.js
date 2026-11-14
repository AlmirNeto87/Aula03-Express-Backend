const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

console.log(process.env.BD_KEY)

const connection = new Sequelize({
  database:"blog", 
  username:"root", 
  password:process.env.BD_KEY,
  host: "localhost",
  dialect: "mysql",
  port: 3306
});

// connection.define("Teste",{
//  coluna_teste: DataTypes.STRING
// },{
//   tableName: "teste" /* comando para forcar o nome da tabela  */
// }
// );

/* Comando para sincronizar com o BD 
  Caso queira forcar toda vida para reiniciar a criacao da tabela utiliza-se
  connection.sync({force: true})
  Caso queira somente fazer alteracoes apos ja ter criado a tabela utiliza-se 
  connection.sync({alter:true})
*/
// connection.sync();


module.exports = connection;