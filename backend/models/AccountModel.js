const mongoose=require("mongoose")

const accountSchema = new mongoose.Schema({
      
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserModel',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = {
	AccountModel
}