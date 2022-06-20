import express from 'express'
import {getAccounts, addAccount, deleteAccount, getOneAccount, updateAccount, deleteTransaction} from './routercontroller.js'
import {TransactionModel, AccountModel} from '../models/AccountModels.js'
import multer from 'multer'

const upload = multer()

const router = express.Router()

router.get('/accounts', getAccounts)

router.get('/accounts/:id', getOneAccount)

router.post('/accounts/insert', upload.none(), addAccount)

router.patch('/accounts/:id/update', upload.none(), updateAccount)

router.delete('/accounts/delete/:id', deleteAccount)

router.delete('/accounts/:id/delete/:id1', deleteTransaction)

export default router