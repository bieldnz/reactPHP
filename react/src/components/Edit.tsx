import {useEffect, useState, ChangeEvent} from 'react'
import ProductForm from './layout/ProductForm'
import {useParams} from "react-router-dom"
import axios from "axios"
import { useLocation } from 'react-router-dom'
import { ProductType } from './types/products'
import { useNavigate } from 'react-router-dom'

const Edit = () => {

    const [id] = useState(useParams().id)
    const [product, setProduct] = useState<ProductType>({id:0,name: "", preco: "", descricao: "", categorias: "", foto: "" })
    const [fotoAtual, setFotoAtual] = useState<any>()
    const history = useNavigate()
    const [checkId, setCheckId] = useState<boolean>(false)
    let search_id: number
    let login: string = ""
    const locationNavigate = useLocation();
    if(locationNavigate.state){
        search_id = locationNavigate.state.search_id
        login = locationNavigate.state.login
    } 

    const getProduct = async () => {
        await fetch(`http://localhost/cursophp/reactPHP/visualizar.php?id=`+id)
        .then((res) => res.json())
        .then((data) => {
            setProduct(data);
        })
        
    }

    const editar = async (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, product:ProductType) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('foto', product.foto)
        formData.append('name', product.name)
        formData.append('descricao', product.descricao)
        formData.append('preco', product.preco)
        formData.append('categorias', product.categorias)

        await axios.post(`http://localhost/cursophp/reactPHP/editar.php?id=${id}`, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
        history("/home", { state: { search_id: search_id, login:  login} })
    }

    useEffect(() => {
        getProduct()
    }, [id])

    useEffect(() => {
        if(product.name != ""){
            setFotoAtual(<img src={"http://localhost/cursophp/reactPHP/images/"+(product.foto)} id="image-id"/>)
            if(product.users_id != search_id){
                history("/")
            }else{
                setCheckId(true)
            }
        }
    }, [product])

    return (
        <>
            {checkId ? <ProductForm enviar={editar} booleanProps={false} noEdit={false} products={product} fotoAtual={fotoAtual} login={login}/>
            : ""}
        </>
    )
}

export default Edit