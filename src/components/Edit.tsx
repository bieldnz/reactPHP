import {useEffect, useState, ChangeEvent} from 'react'
import ProductForm from './layout/ProductForm'
import {useParams} from "react-router-dom"
import axios from "axios"
import { useLocation } from 'react-router-dom'
import { ProductType } from './types/products'
import { useNavigate } from 'react-router-dom'
import Loading from "./layout/Loading.tsx"

const Edit = () => {

    const [id] = useState(useParams().id)
    const [product, setProduct] = useState<ProductType>({id:0,name: "", preco: "", descricao: "", categorias: "", foto: "", public_id_foto: "" })
    const [fotoAtual, setFotoAtual] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
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
        await fetch(`https://apimarketplace-production.up.railway.app/visualizar.php?id=`+id)
        .then((res) => res.json())
        .then((data) => {
            setProduct(data);
            console.log(data)
        })
    }

    const editar = async (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, product:ProductType) => {
        e.preventDefault()
        setLoading(true)
        let old_public_id: string = product.public_id_foto;
        console.log(product.public_id_foto)
        const formImage = new FormData();
        formImage.append("file", product.foto)
        formImage.append("upload_preset", "xm96za6d")
        await axios.post("https://api.cloudinary.com/v1_1/djqgjria4/image/upload", formImage)
        .then((res) => res.data)
        .then((data) => {
            product.foto = data.secure_url;
            product.public_id_foto = data.public_id;
        })

        const formData = new FormData();
        formData.append('name', product.name)
        formData.append('descricao', product.descricao)
        formData.append('preco', product.preco)
        formData.append('categorias', product.categorias)
        formData.append('foto', product.foto)
        formData.append('public_id_foto', product.public_id_foto)
        formData.append('old_public_id_foto', old_public_id)

        await axios.post(`https://apimarketplace-production.up.railway.app/editar.php?id=${id}`, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        }).then((res) => res.data)
        .then((data) => console.log(data))
        console.log(true)
        history("/home", { state: { search_id: search_id, login:  login} })
    }

    useEffect(() => {
        getProduct()
    }, [id])

    useEffect(() => {
        if(product.name != ""){
            setFotoAtual(<img src={product.foto} id="image-id"/>)
            if(product.users_id != search_id){
                history("/")
            }else{
                setCheckId(true)
            }
        }
    }, [product])

    return (
        <>
            {checkId && !loading ? <ProductForm enviar={editar} booleanProps={false} noEdit={false} products={product} fotoAtual={fotoAtual} login={login}/>
            : <Loading loading={loading}/>}
        </>
    )
}

export default Edit