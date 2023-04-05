const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    data:{
        type:Object,
        required:true
    },
    txHash:{
        type:String,
        required:true
    },
    blockNo:{
        type:String,
        required:true
    },
    blockTimestamp:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Event',eventSchema);