import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {url} from '../App'
import { useNavigate, useParams} from 'react-router-dom';

export default function SetPassword() {
    const {id} = useParams();
    let[password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSetPassword = async() =>{
        let updateData = {
          password : password
        }
        let res = await fetch(`${url}/users/${id}`,{
            method:"PUT",
            body:JSON.stringify(updateData),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const Data =await res.json();
        console.log(Data);
        navigate("/login")
    }
  return (
    <div className='login-wrapper'>
      <h1 style={{"textAlign":"center"}}>Reset Password!</h1>
    <Form>

    <Form.Group className="mb-3">
        <Form.Label>Enter New Password</Form.Label>
        <Form.Control type="email" placeholder="New Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
     
      <Button variant="primary" onClick={()=>handleSetPassword()}>
        Set Password
      </Button>
    </Form>
    </div>
  )
}
