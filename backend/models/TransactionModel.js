const mongoose=require("mongoose")


const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserModel',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    toAccount: {
        type:String, 
        ref: 'AccountModel',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
  
});


const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = {
    TransactionModel
};  