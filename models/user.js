var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstName: {type: String, maxLength: 50, minLength: 3, required: true},
    lastName: {type: String, maxLength: 50, minLength: 3, required: true},
    username: {type: String, maxLength: 50, minLength: 3, required: true},
    password: {type: String, required: true, minLength: 8},
    membership_status: {type: Boolean, required: true},
    admin_status: {type: Boolean, required: true}
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