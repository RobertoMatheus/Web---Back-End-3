const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/Login";
module.exports = class Posts {
    static async find(usuario,password) {
   
        const conn = await MongoClient.connect('mongodb://localhost:27017/');
        
            const db = conn.db("Login");
            return db.collection('Usuario').findOne({nome:usuario,senha:password},{ projection: { _id: 0, nome: 1,senha:1} }, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
        //return await db.collection('Usuario').find().toArray();*/
    }
}