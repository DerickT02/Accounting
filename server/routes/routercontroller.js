import {TransactionModel, AccountModel} from '../models/AccountModels.js'


export const getAccounts = async (req, res) => {
    try{
        const Accounts = await AccountModel.find()
        res.json(Accounts)
    }
    catch(err){
        res.json(err)
    }
}

export const addAccount = async (req, res) => {
    const type = req.body.accountType
    const name = req.body.accountName
    const initialAmount = req.body.initialAmount

  
    
    const Account = await new AccountModel({
        accountType: type,
        accountName: name,
        accountBalance: initialAmount,
        transactions: []
    })

    Account.transactions.push(await new TransactionModel({
        transactionType: type,
        transactionAmount: initialAmount
    }))

    

    Account.save().then(result => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

export const deleteAccount = async (req, res) => {
    const id = req.params.id;
    await AccountModel.findByIdAndDelete(id)
    res.send('Successfully deleted page');
}

export const getOneAccount = async (req, res) => {
    const id = req.params.id
  
    try{
        const Account = await AccountModel.findById(id)
        res.json(Account)
    }  
    catch(err){
        res.json(err)
    }
}

export const updateAccount = async (req, res) => {
    const id = req.params.id
    const amount = req.body.transactionAmount
    const type = req.body.transactionType
    const newTransaction = new TransactionModel({
        transactionType: type,
        transactionAmount: amount
    })

    const Account = await AccountModel.findById(id)
    try{
   
        if(Account.accountType === type){
        Account.accountBalance += Number(amount)
        Account.transactions.push(newTransaction)
        Account.save()
    }

        else if(Account.accountType !== type){
            Account.accountBalance -= Number(amount)
            Account.transactions.push(newTransaction)
            Account.save()
        }
    }
    catch(err){
        console.log(err)
    } 
}


export const deleteTransaction = async (req, res) => {
    const id = req.params.id
    const id1 = req.params.id1
    const Account = await AccountModel.findById(id)
    const Transaction = Account.transactions.id(id1)
   
   
    

    try{
        if(Account.accountType === Transaction.transactionType){
            Account.accountBalance -= Number(Transaction.transactionAmount)
            Account.transactions.id(id1).remove()
            Account.save()
        }
        else if(Account.accountType !== Transaction.transactionType){
            Account.accountBalance += Number(Transaction.transactionAmount)
            Account.transactions.id(id1).remove()
            Account.save()
        }
    }
    catch(error){
        res.json(error)
    }

    
    

    
}

