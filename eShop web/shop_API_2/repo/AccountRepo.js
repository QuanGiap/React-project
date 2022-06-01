let fs = require('fs')
let Account = require('../model/account')
let jwn = require('jsonwebtoken')
let bcrypt = require('bcrypt')
const FILE_NAME = "./info/AccountInformation.json"
let AccountRepo={
    get:function(name,resolve,reject){
        console.log(name);
        Account.findOne({name:name},'name')
        .then((data)=>resolve(data))
        .catch((err)=>reject(err))
    },
    post:function(newData,resolve,reject){
        bcrypt.hash(newData.pass,Number(process.env.hassPass)).then((hassPass)=>{              
            const account = new Account({
                name:newData.name,
                pass:hassPass
            })
            account.save().then((data)=>resolve(data)).catch((err)=>reject(err));
        }).catch((err)=>reject(err))
    },
    comparePass:function(data,resolve,reject){
        try{
        Account.findOne({name:data.name},'name pass')
        .then((res)=>{
            if(res){
                console.log(bcrypt.compare(data.pass,res.pass));
                bcrypt.compare(data.pass,res.pass,function(err, res){
                    if(err) reject(err);
                    else return resolve(res);
                })
            }
            else return resolve(false);
        })
        }catch(err) {reject(err)};
    }
}
module.exports=AccountRepo;