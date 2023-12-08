import {useEffect, useState, ChangeEvent} from 'react'
import {Link} from "react-router-dom"
import {useParams} from "react-router-dom"
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom'

const Edit = () => {

    const [id, setId] = useState(useParams().id)
    const [product, setProduct] = useState<any>()
    const [responce, setResponce] = useState<any>({data: ""})
    const [fotoAtual, setFotoAtual] = useState<any>("")
    const categorias = ["Tecnologia", "Veículos", "Supermercado", "Veículos", "Casa e Movéis", "Esporte e Fitness", "Ferramentas", "Construção", "Indústria e Comércio", "Saude", "Beleza", "Moda", "Brinquedos"]
    const history = useNavigate()
    const locationNavigate = useLocation();
    let search_id: any
    if(locationNavigate.state){
        search_id = locationNavigate.state.search_id
    } 

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
        console.log(product)
    }

    const handleOnFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files1: any = e.target;
        const files: any = files1.files[0];
        setProduct({ ...product, [(e.target as HTMLInputElement).name]: files })
        console.log(product)
    }

    const getProduct = async () => {
        await fetch(`http://localhost/cursophp/reactPHP/visualizar.php?id=`+id)
        .then((res) => res.json())
        .then((data) => {
            setProduct(data);
            setFotoAtual(data.foto)
            console.log(data)
        })
        
    }

    const editar = async () => {
        const formData = new FormData();
        formData.append('foto', product.foto)
        formData.append('name', product.name)
        formData.append('descricao', product.descricao)
        formData.append('preco', product.preco)

        setResponce(await axios.post(`http://localhost/cursophp/reactPHP/editar.php?id=${id}`, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        }))

    }

    useEffect(() => {
        getProduct()
    }, [id])

    useEffect(() => {
        if(product){
            console.log(product.users_id)
            console.log(search_id)
            if(product.users_id != search_id){
                history("/home")
            }
        }
    }, [product])

    return (
        <form>
            Nome: <input type='text' name='name' value={product ? product.name : ""} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
            Preço: <input type='text' name='preco' value={product ? product.preco : ""} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
            Descrição: <input type='text' name='descricao' value={product ? product.descricao : ""} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
            Categoria: <select name="" id="">
                {categorias.map((categoria) => (
                    <option>{categoria}</option>
                ))}
            </select><br/>
            <input type='file' name='foto' onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnFile(e)}/><br/>
            <img src={product ? `http://localhost/cursoPHP/reactPHP/images/${fotoAtual}` : ""} width="100px" height="100px" /><br/>
            <button onClick={() => editar()}>Editar</button>
            <Link to="/home">
                <button>Sair</button>
            </Link>
        </form>
    )
}

export default Edit