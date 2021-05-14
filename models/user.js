const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch(error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(password) {
    try {
       return await bcrypt.compare(password, this.password);
    } catch(error) {
        throw new Error('Invalid Error');
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;