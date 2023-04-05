const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let whiteListSchema= new Schema({
    txHash:{
        type:String,
        required:true
    },
    whiteListedAddress:{
        type:String,
        required:true
    },
    blockno:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('WhiteList',whiteListSchema);