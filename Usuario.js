const { connect } = require("./db");
class Usuario{
     constructor(nome,senha) {
 this.nome = nome;
 this.senha=senha;
 }

async buscar(filtro) {
 
 const { db, client } = await connect();
 //const Usuario = await
 await db.collection("Usuario").insertOne({
 nome:"Jao",
 senha:"124",
 });
return await db.collection('Usuario').find({content: new RegExp('^' + filtro)}).toArray();
console.log(Usuario);
 console.log("Hey");
client.close();
}
}
module.exports = { Usuario };