import { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';



const Account = ({match}) => {
 
const [account, setAccount] = useState({
    accountName: "",
    accountType: "",
    accountBalance: 0,
    transactions: [] 
})

const [debit, setDebit] = useState(true)
const [credit, setCredit] = useState(false)
const [transaction, setTransaction] = useState('debit')
const [amount, setAmount] = useState(0)

const toggleType = () => {
    if(debit){
        setDebit(false)
        setCredit(true)
        setTransaction('credit')
    }
    else{
        setDebit(true)
        setCredit(false)
        setTransaction('debit')
    }
}

const updateAccount = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("transactionType", transaction)
    formData.append("transactionAmount", amount)

    axios.patch(`http://localhost:1000/app/accounts/${match.params.id}/update`, formData)
}

console.log(updateAccount)


const deleteTransaction = (id) => {
    axios.delete(`http://localhost:1000/app/accounts/${match.params.id}/delete/${id}`)
}


useEffect(() => {
axios.get(`http://localhost:1000/app/accounts/${match.params.id}`).then((res) => {
    setAccount(res.data)
    console.log(account)
}).catch((err) => {
    console.log(err)
})
}, {})

 return(
     <div className = "Account">
     <Link to = '/'><Button variant="outline-success">Back</Button></Link>
        <h1>{account.accountName}</h1>
        <h2>{account.accountType}</h2>
        <h1>${account.accountBalance}</h1>
        <div style = {{"margin-bottom":"300px"}}>

        <hr/>

        <div>
        <h1>Create Transaction</h1>
            <br/>
            <Form onSubmit = {updateAccount} encType = "multipart/form-data">
                <Form.Control style = {{"width":'50%', 'margin-left':'300px', 'background-color':'rgba(0,0,0,0)', 'color':'white'}}type = "number" onChange = {(event) => {setAmount(event.target.value)}} placeholder="Transaction amount"></Form.Control>
                <Button style = {{'margin-top':'20px'}} variant = {account.accountType === transaction ? 'success' : 'danger'} type = "submit">Add Transaction</Button>
            </Form>
        
            <br/>
            <Button size = 'sm' onClick = {toggleType}>Transaction Type</Button>
            <h3>{debit && !credit ? "debit" : "credit"}</h3>
        
        </div> 

        <hr/>
   
         {account.transactions.map((transaction) => {
             return(
                 <>


                 <div>
                <ListGroup>
                    <ListGroup.Item variant = {transaction.transactionType === account.accountType ? "success" : "danger"}>
                        <h4>{transaction.transactionType}:{transaction.transactionAmount}</h4>
                        <Button variant = "danger" onClick={() => {deleteTransaction(transaction._id)}}>X</Button>
                    </ListGroup.Item> 
                </ListGroup>
                 </div>

                 <br/>
                
                 </>
                 
             )
         })}
        </div>


        
     </div>
 )
}

export default Account