var mongoose = require("mongoose");
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstName: {type: String, maxLength: 50},
    lastName: {type: String, maxLength: 50},
    username: {type: String, maxLength: 50, minLength: 3, required: true},
    password: {type: String, required: true, minLength: 8},
    membership_status: {type: String}
})


UserSchema
.virtual('url')
.get(function(){
    return '/user/' + this._id;
})


UserSchema
.virtual('full_name')
.get(function(){
    if(!firstName && !lastName){
        return '';
    }
    else if(!firstName){
        return this.lastName;
    }
    else if(!lastName){
        return this.firstName
    }
    else{
        return this.lastName + ", " + this.firstName;
    }
})


module.exports = mongoose.model('User', UserSchema);