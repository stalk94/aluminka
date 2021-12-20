require('dotenv').config();
const db = require("quick.db");


console.log(db.get("tovars.plintus")[1].images.length)