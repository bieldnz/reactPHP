import React, { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const[register, setRegister] = useState({login: "", password: "", confirmPassword: ""})
    const[responce, setResponce] = useState<any>({})

    const formData = new FormData()
    const history = useNavigate()

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
        setRegister({...register, [(e.target as HTMLInputElement).name]:(e.target as HTMLInputElement).value})
        console.log(register)
    }

    const createAccount = async () => {
        formData.append("login", register.login)
        formData.append("password", register.password)
        setResponce(await axios.post("http://localhost/cursophp/reactPHP/select_verify.php", formData, {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        }))
    }

    const registerAccount = () => {
        formData.append("login", register.login)
        formData.append("password", register.password)
        setResponce(axios.post("http://localhost/cursophp/reactPHP/register.php", formData, {
            headers: {
                "Content-Type":"multipart-form-data"
            }
        })
        .then(() => history("/")) 
        )
    }

    useEffect(() => {
        if(responce.data){
            if(responce.data.id){
                console.log("já existe")
            }else if(responce.data.msg){
                registerAccount()
            }
        }
    }, [responce])

    return (
        <div>
            Crie um Login: <input type="text" name='login' onChange={(e:ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
            Crie uma senha: <input type="password" name='password' onChange={(e:ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
            Confirme a senha: <input type="password" name='confirmPassword' onChange={(e:ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/>
            <button onClick={createAccount}>Criar Conta</button>
        </div>
    )
}

export default Register