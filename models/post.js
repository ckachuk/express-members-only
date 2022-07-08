var mongoose = require("mongoose");
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;



var PostSchema = new Schema({
    title: {type: String, required:true, maxLength: 100},
    text: {type: String, required:true, maxLength: 144},
    timestamp: {type:DateTime, required:true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required:true}
})


PostSchema
.virtual('url')
.get(function(){
    return /post/ + this._id;
})

module.exports = mongoose.model("Post", PostSchema)