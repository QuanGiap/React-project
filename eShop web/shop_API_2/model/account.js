const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name:{
        type: String,
        require:true
    },
    pass:{
        type: String,
        require:true
    }
},{timestamps: true})
const account = mongoose.model('accounts',accountSchema);
module.exports = account;