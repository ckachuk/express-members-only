var mongoose = require("mongoose");
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;



var PostSchema = new Schema({
    title: {type: String, required:true, maxLength: 100},
    text: {type: String, required:true, maxLength: 144},
    timestamp: {type:Date, required:true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required:true}
})


PostSchema
.virtual('url')
.get(function(){
    return /post/ + this._id;
})


PostSchema
.virtual('timestamp_yyyy_mm_dd')
.get(function () {
  return DateTime.fromJSDate(this.timestamp).toISODate(); //format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Post", PostSchema)