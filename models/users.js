const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema= new Schema({
    walletAddress:{
        type:String,
        required:true
    },
    balance:{
        type:String,
        required:true
    },
    whitelisted:{
        type:Boolean,
        required:true
    }

});

module.exports = mongoose.model('User',userSchema);