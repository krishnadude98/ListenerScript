require('dotenv').config()
const abi = require('./contracts/whitelist.json')
const contractAddress= "0x2eF714468311FB2B0aDe30A074EDAe324aBf4d5a";
const mongoose= require('mongoose');
const WhiteList= require('./models/whitelist');
const User= require('./models/users');
const Event= require('./models/events')
var Web3 = require('web3');
var web3 = new Web3(process.env.GORELLI_PROVIDER);
var MyContract = new web3.eth.Contract(abi, contractAddress);


mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("listening for  events")
    MyContract.once("addToWhitelistEvent", async function (error, event) {
        console.log("addToWhitelistEvent event happened");
        if(!error) {
           
            let list= new WhiteList({
                txHash:event.transactionHash,
                whiteListedAddress:event.returnValues["users"],
                blockno:event.blockNumber
            });
            let data= await web3.eth.getBlock(event.blockNumber);
            console.log("TIMESTAMP=>",data.timestamp);
            let newevent= new Event({
                name:event.event,
                data: event.raw.data,
                txHash: event.transactionHash,
                blockNo:event.blockNumber,
                blockTimestamp: data.timestamp
            })
    
            try{
                let savedlist=list.save();
                let saveEvent= newevent.save();
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            console.log(error);
        }
        
    });

    MyContract.once("balanceUpdated", async function (error, event) {
        console.log("balanceUpdated event happened");
        if(!error) {
           if(User.findOne({walletAddress:event.returnValues["users"]})){
                User.findOneAndUpdate({walletAddress:event.returnValues["users"]},{balance:event.returnValues["updatedBalance"]})
           }
           else{
            let list= new User({
                walletAddress:event.returnValues["users"],
                balance:event.returnValues["updatedBalance"],
                whitelisted: await MyContract.methods.viewIsWhitelisted(event.returnValues["users"]).call()
            });
            let data= await web3.eth.getBlock(event.blockNumber);
            let newevent= new Event({
                name:event.event,
                data: event.raw.data,
                txHash: event.transactionHash,
                blockNo:event.blockNumber,
                blockTimestamp: data.timestamp
            })
    
            try{
                let savedlist=list.save();
                let saveEvent= newevent.save();
            }
            catch(err){
                console.log(err);
            }
         }
        }

            
        else{
            console.log(error);
        }
        
    });


   
}).catch(err=>{console.log(err)});