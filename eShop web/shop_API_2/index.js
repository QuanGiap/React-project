//main for generate api task and create local server
let express = require('express');
let bodyParser = require('body-parser')
let app = express();
let ProRepo = require("./repo/ProRepo");
let errorHelpers = require("./helpers/errorHelpers")
let AccountRepo = require("./repo/AccountRepo")
let Blog = require('./model/blog')
require('dotenv').config();
let mongoose = require('mongoose')
//behind the quession mark in URL(.env) if objectName doesn't exist . it will create a new one
const dbURI = process.env.dbURL;
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(5000, function(){
    console.log('Node is running on local host:5000');
})).catch((err)=>console.log(err));
//use express Router object
let router = express.Router();
//allow this website to share inform
let cors = require('cors');
//configure middleware to support JSON data parsing in request object
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Configure CORS(at default it will allow every website to get the inform)
app.use(cors());-

//create get to return a list of all products
router.get('/',function(req,res,next){
    ProRepo.get(function(data){    
        res.status(200).json({
        "status" : 200,
        "statusText" : "ok",
        "message" : "all Product retrieves",
        "data" : data
    });},function(err){
        next(err);
    })
})
//search product
router.get('/search',function(req,res,next){
    let name = req.query.name || "not found";
    ProRepo.search(req.query.name,function(data){
        res.status(200).json({"status" : 200,
        "statusText" : "ok",
        "message" : "Search success",
        "searchName" : name, 
        "data" : data})
    },function(err){
        next(err);
    })
})
//create get to return a account
router.get('/accounts/search',function(req,res,next){
    AccountRepo.get(req.query.name,function(data){
        res.status(200).json({"status" : 200,
        "statusText" : "ok",
        "message" : "an accounts retrieves",
        "data" : data})
    },function(err){
        next(err);
    })
})
//check password
router.get('/accounts/check',function(req,res,next){
    AccountRepo.comparePass(req.query,function(data){
        let result = (data==true)? "Valid sign in" : "Not valid sign in"
        res.status(201).json({
            "status": 200,
            "statusText": "Checked",
            "message":result,
            "result":data
        })
    },function(err){
        next(err);
    })
})
//add new accounts to mongo
router.post('/accounts',function(req,res,next){
    AccountRepo.post(req.body,function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message":"New account Added",
        })
    },function(err){
        next(err);
    })
})
router.post('/',function(req,res,next){
    console.log(req.body);
    ProRepo.postPro(req.body,function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message":"New products Added",
            "data":data
        })
    },function(err){
        next(err);
    })
})
//configure router so all routes are prefixed with api/v1
app.use('/api/',router);
app.use(errorHelpers.logError);
app.use(errorHelpers.clientErrorHandler);
app.use(errorHelpers.errorHandler);