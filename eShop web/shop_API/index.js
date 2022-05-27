let express = require('express');
let bodyParser = require('body-parser')
let app = express();
let ProRepo = require("./repo/ProRepo");
let errorHelpers = require("./helpers/errorHelpers")
//use express Router object
let router = express.Router();
//allow this website to share inform
let cors = require('cors');
//configure middleware to support JSON data parsing in request object
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//Configure CORS(at default it will allow every website to get the inform)
app.use(cors());

//create get to return a list of all pies
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
router.post('/',function(req,res,next){
    ProRepo.postPro(req.body,function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message":"Mew products Added",
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
var server = app.listen(5000, function(){
    console.log('Node is running on local host:5000');
});