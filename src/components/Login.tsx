import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { UserLogin } from "./types/user"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Styles from "./style/login.module.css"
import axios, { AxiosResponse } from "axios"
import Loading from "./layout/Loading.tsx"

const Login = () => {

  const history = useNavigate()
  const [loginUser, setLoginUser] = useState<UserLogin>({id: 0, login: "", password: "" })
  const [responce, setResponce] = useState<UserLogin>()
  const [animation, setAnimation] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const login = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("login", loginUser.login)
    formData.append("password", loginUser.password)
    try {
      let res:AxiosResponse<UserLogin> = await axios.post("https://apimarketplace-production.up.railway.app/select_user.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      let data: UserLogin = res.data
      setResponce(data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const register = () => {
    history("/cadastro")
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginUser({ ...loginUser, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
  }

  useEffect(() => {
    
    if (responce) {
      if (responce.id) {
        history("/home", { state: { search_id: responce.id, login: loginUser.login } })
      }else{
        setAnimation(Styles.animar)
        setTimeout(() => {
          setAnimation("")
        }, 5000)
      }
    }
  }, [responce])

  return (
    <div className={Styles.allLogin}>
      <form onSubmit={() => login} className={Styles.formLogin}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            LOGIN
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            name='login'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            SENHA
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            name='password'
            type='password'
          />
        </InputGroup>
        <div className={Styles.buttonsLogin}>
          <input type='submit' onClick={e => {e.preventDefault(); login()}} value="ENTRAR"/>
          <input type='button' onClick={register} value="CADASTRAR-SE"/>
        </div>
      </form>
      <span className={`${Styles.messageLogin} ${animation}`}>
        <a>LOGIN OU SENHA INCORRETOS</a>
      </span>
      <Loading loading={loading}/>
    </div>
  )
}

export default Login