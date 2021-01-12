const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    pass: {type: String, required: true},
    company: {type: String, required: true}
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
    next();
});

module.exports = mongoose.model("User", UserSchema);