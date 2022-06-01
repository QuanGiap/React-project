let fs = require('fs')
let Blog = require('../model/blog')

ProRepo = {
    get:function(resolve,reject){
        Blog.find().then((data)=>resolve(data)).catch((err)=>reject(err));
    },
    search:function(name,resolve,reject){
        Blog.find().then((arr)=>{ 
            if(name){
                arr = arr.filter(
                    p=>{
                        return p.description.toLowerCase().indexOf(name.toLowerCase())>= 0}
                )
            }
            resolve(arr);
        }).catch((err)=>reject(err))
    },
    postPro:function(newData,resolve,reject){
        const blog =new Blog({
            description: newData.description,
            price:newData.price,
            stars:newData.stars,
            imgURL:newData.imgURL,
        });
        blog.save().then((result)=>{resolve(result)}).catch((err)=>{reject(err)})
    }
}

module.exports = ProRepo;