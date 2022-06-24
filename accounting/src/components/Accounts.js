import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Account from './Account'
import Axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Accounts.css'
import React from 'react';



const Accounts = () => {
const [accounts, setAccounts] = useState([])
const [isDebit, setisDebit] = useState(true)
const [isCredit, setisCredit] = useState(false)
const [account, setAccount] = useState('debit')
const [accountName, setAccountName] = useState('')
const [initialAmount, setInitialAmount] = useState(0)
console.log(accounts);

const setAccountType = () => {
    if(isDebit){
        setisDebit(false)
        setisCredit(true)
        setAccount("credit")
    }
    else if(isCredit){
        setisCredit(false)
        setisDebit(true)
        setAccount("debit")
    }
}


const addAccount = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("accountType", account)
    formData.append("accountName", accountName)
    formData.append("initialAmount", initialAmount)
   
    

    Axios.post('http://localhost:1000/app/accounts/insert', formData)
   
}

const deleteAccount = (id) => {
    Axios.delete(`http://localhost:1000/app/accounts/delete/${id}`)
}

useEffect(() => {
    Axios.get('http://localhost:1000/app/accounts').then((res) => {
      setAccounts(res.data)
    }).catch(err => err)
  }, [])


    return(
        <div className = "Accounts">
            <div className = "CreateAccount">
                    <br/>
                    <button onClick={setAccountType}>Set Account Type</button>
                    <h1>{isDebit && !isCredit ? "debit":"credit"}</h1>
                <Form  onSubmit = {addAccount} encType="multipart/form-data">
                    <InputGroup style = {{'width':'900px', 'margin-left':'150px'}}>
                        
                        <Form.Control style = {{'background-color':'rgba(0, 0, 0, 0)', 'color':'white'}} type = "text" placeholder = "Account Name" onChange = {(event) => {setAccountName(event.target.value)}}></Form.Control>
                        <Form.Control style = {{'background-color':'rgba(0, 0, 0, 0)', 'color':'white'}} type = "number" placeholder = "Initial Amount" onChange = {(event) => {setInitialAmount(event.target.value)}}></Form.Control>
                        <Button type = "submit">Add Account</Button>
                    </InputGroup>
                </Form>
            </div>

            <div className = "AccountsList">
                {accounts.map((account) => {
                    return(
                        <>
                        <br/>
                        <div className = "row">
                        <Container>
                            <Row>
                                <Col>
                                <Link to = {`/${account._id}`}><Button variant ="primary">{account.accountName}</Button></Link>
                                <Button variant="danger" onClick = {() => deleteAccount(account._id)}>X</Button>
                                </Col>
                            </Row>
                        </Container>
                        </div>
                        
                    </>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Accounts