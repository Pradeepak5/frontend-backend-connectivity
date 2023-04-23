import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {url} from '../App'
import { toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';

export default function SendMail() {
    let [email,setEmail] = useState("");
    const handleSendMail = async() =>{
      try {
        console.log("loading.....");
        let res = await fetch(`${url}/users/${email}`,{
          method:"GET",
        })
        let Data = await res.json();
        console.log(Data);
        if(await Data.user != null){
          toast.success(Data.message)
        }else{
          toast.error('Your Mail Id is not registered......Reach admin!')
        }
  
      } catch (error) {
        toast.error(error.response.message)
      }
    }

  return (
    <div className='login-wrapper'>
      <h1 style={{"textAlign":"center"}}>Request Reset Password!</h1>
    <Form>
    <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
     
      <Button variant="primary" onClick={()=>handleSendMail()}>
        Send Mail
      </Button>
    </Form>
    </div>
  )
}
