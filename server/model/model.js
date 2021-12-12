const mongoose = require("mongoose");
const sys = require("quick.db");



exports.getGuid =(symbol="GUID-MODEL")=> {
    sys.add(symbol, 1)
    return sys.get(symbol)
}
exports.createConnection = function(dbName='test') {
    return mongoose.createConnection(`mongodb://localhost:27017/${dbName}`, {autoIndex: false});
}
exports.createModel = function(nameClass, schema={}, nameConnectiondb) {
    let Model;
    let schems = new mongoose.Schema({_id: Number, ...schema})
    schems.methods.getNewId =()=> getGuid(nameClass)
    
    if(nameConnectiondb){
        Model = exports.createConnection(nameConnectiondb).model(nameClass, schems)
    }
    else Model = exports.createConnection('SYS').model(nameClass, schems)
    
    return Model
}