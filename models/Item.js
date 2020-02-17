
const db = require('../connectDB');
var Item={

    getAll:(callback) => { 
        return db.query("Select * from item",callback);
    },

    getById:(id,callback) => {
        return db.query("select * from item where ID=?",[id],callback);
    },

    add:function( dt ,callback){
        return db.query("Insert into item values(?,?,?)", [ dt.name, dt.sku, dt.price ],callback);
    },

    delete:(id,callback) => {
        return db.query("delete from item where ID=?",[id],callback);
    },

    update:( sku, dt ,callback ) => {
        return db.query("update item set PRECO=? where SKU=?", [ dt.price, sku], callback);
    }
 
};

module.exports = Item;