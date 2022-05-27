let fs = require('fs')
const FILE_NAME = "./info/ProductsInfo.json"

ProRepo = {
    get:function(resolve,reject){
        fs.readFile(FILE_NAME,function(err,data){
            if(err) reject(err);
            else{
                resolve(JSON.parse(data));
            }
        })
    },
    postPro:function(newData,resolve,reject){
        fs.readFile(FILE_NAME,function(err,data){
            if(err) reject(err);
            else{
                let arr = JSON.parse(data);
                arr.push(newData);
                fs.writeFile(FILE_NAME,JSON.stringify(arr),function(err){
                    if(err) reject(err);
                    else{
                        resolve(newData);
                    }
                })
            }
        })
    }
}

module.exports = ProRepo;