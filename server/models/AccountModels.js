import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    transactionType: String,
    transactionAmount: Number
})

const AccountSchema = new Schema({
    accountType: String,
    accountName: String,
    accountBalance: Number,
    transactions: [TransactionSchema]
})

export const TransactionModel = mongoose.model("Transactions", TransactionSchema)

export const AccountModel = mongoose.model("Account", AccountSchema)

