import React, { ChangeEvent, useState, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {UserLogin} from "./types/user"
import axios from "axios"

const Login = () => {

  const history = useNavigate()
  const[loginUser, setLoginUser] = useState<any>({login: "", password: ""})
  const[responce, setResponce] = useState<any>()

  const login = async (e:any) => { 
    e.preventDefault()
    const formData = new FormData()
    formData.append("login", loginUser.login)
    formData.append("password", loginUser.password)
    setResponce(await axios.post("http://localhost/cursophp/reactPHP/select_user.php", formData, {
      headers: {"Content-Type":"multipart/form-data"},
    }))
  }

  const register = () => {
    history("/cadastro")
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser({ ...loginUser, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
  }

  useEffect(() => {
    if(responce){
      if(responce.data.id){
        history("/home", {state: {search_id: responce.data.id}})
      }
    }
  }, [responce])

  return (
    <div>
        <input type="text" placeholder='Username' name='login' onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        <input type="password" name='password' placeholder='senha' onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        <button onClick={login}>logar</button>
        <button onClick={register}>Cadastrar</button>
    </div>
  )
}

export default Login