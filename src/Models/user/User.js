const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    pass: {type: String, required: true},
    lat: {type: Number},
    long: {type: Number},
    localization: {type: String},
    access:{type: String, required: true},
    color:{type: String}
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = mongoose.model("User", UserSchema);