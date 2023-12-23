import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Styles from './style/login.module.css'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

type ResponceType = {
  data: {
    id: number,
    msg: string
  }
}

const Register = () => {

  const [register, setRegister] = useState({ login: "", password: "", confirmPassword: "" })
  const [responce, setResponce] = useState<ResponceType>({ data: { id: 0, msg: "" } })
  const [animation, setAnimation] = useState<string>("")
  const [validatedLogin, setValidatedLogin] = useState<string>("")
  const [validatedPass, setValidatedPass] = useState<string>("")
  const [loginInvalid, setLoginInvalid] = useState<string>("")
  const [passInvalid, setPassInvalid] = useState<string>("")
  const [validatedConf, setValidatedCon] = useState<string>("")
  const [token, setToken] = useState<boolean>(true)

  const formData = new FormData()
  const history = useNavigate()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister({ ...register, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
    
  }

  const createAccount = async () => {
    setValidatedPass("")
    setValidatedLogin("")
    setValidatedCon("")
    setToken(true)
    checkLogin()
    if (token) {
      console.log("Chegou")
      formData.append("login", register.login)
      formData.append("password", register.password)
      setResponce(await axios.post("http://localhost/cursophp/reactPHP/select_verify.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }))
      
    }
  }

  const registerAccount = async () => {
    formData.append("login", register.login)
    formData.append("password", register.password)
    let res = await axios.post("http://localhost/cursophp/reactPHP/register.php", formData, {
      headers: {
        "Content-Type": "multipart-form-data"
      }
    })
    let data = res.data
    setResponce(data)
    history("/")
  }

  useEffect(() => {console.log(responce)}, [responce])

  const checkLogin = () => {
    if((register.login == "") || (register.login == undefined)){
      setToken(false)
      setValidatedLogin("is-invalid")
      setLoginInvalid("Campo vazio")
    }else if(register.login.length < 5){
      setToken(false)
      setValidatedLogin("is-invalid")
      setLoginInvalid("Login precisa de mais de 5 caracteres")
    }if((register.password == "") || (register.password == undefined)){
      setToken(false)
      setPassInvalid("Campo vazio")
      setValidatedPass("is-invalid")
    }else if(register.password.length < 7){
      setToken(false)
      setPassInvalid("Senha precisa de mais de 5 caracteres")
      setValidatedPass("is-invalid")
    }if(register.confirmPassword != register.password){
      setToken(false)
      setValidatedCon("is-invalid")
    }
    console.log(token)
  }
  

  useEffect(() => {
    if (responce.data) {
      if (responce.data.id) {
        setAnimation(Styles.animar)
        setTimeout(() => {
          setAnimation("")
        }, 5000)
      } else if (responce.data.msg) {
        registerAccount()
      }
    }
  }, [responce])

  return (
    <div className={Styles.allLogin}>
      <Form noValidate onSubmit={() => createAccount} className={`${Styles.formLogin} ${Styles.widthRegister}`}>
        <InputGroup className="mb-3" hasValidation>
          <InputGroup.Text id="inputGroup-sizing-default" >
            LOGIN
          </InputGroup.Text>
          <Form.Control
            className={validatedLogin}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            name='login'
          />
          <Form.Control.Feedback type="invalid">
            {loginInvalid}
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            SENHA
          </InputGroup.Text>
          <Form.Control
            className={validatedPass}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            name='password'
            type='password'
          />
          <Form.Control.Feedback type="invalid">
            {passInvalid}
          </Form.Control.Feedback>
        </InputGroup><InputGroup className="mb-3">
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            name='confirmPassword'
            type='password'
            className={`${Styles.place} ${validatedConf}`}
            placeholder='Confirme a senha'
          />
          <Form.Control.Feedback type="invalid">
            As senhas estão diferentes
          </Form.Control.Feedback>
        </InputGroup>
        <div className={Styles.buttonsLogin}>
          <input type='submit' onClick={e => { e.preventDefault(); createAccount() }} value="CRIAR CONTA" />
        </div>
      </Form>
      <span className={`${Styles.messageLogin} ${animation}`}>
        <a>LOGIN OU SENHA EXISTENTES</a>
      </span>
    </div>
  )
}

export default Register