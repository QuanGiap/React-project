const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    stars:{
        type: Number,
        required: true
    },
    imgURL:{
        type: String,
        required: true
    }
},
    {timestamps: true}
)

const Blog = mongoose.model('blog',blogSchema);
module.exports = Blog;