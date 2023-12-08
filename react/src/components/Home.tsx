import { ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import ProductForm from './layout/ProductForm';
import Listar from '../components/layout/Listar.tsx'
import { useState, useEffect } from "react"
import axios from "axios";

const Home = () => {

    const [get, setGet] = useState<any>(null);
    const [responce, setResponce] = useState<any>()
    const[responceGet, setResponceGet] = useState<any>()
    const [products, setProducts] = useState<any>({
        name: "",
        preco: "",
        descricao: "",
        categorias: "",
        foto: undefined,
    })

    const locationNavigate = useLocation();
    let search_id: any
    if(locationNavigate.state){
        search_id = locationNavigate.state.search_id
    }

    const excluir = async(id: number) => {
        await fetch(`http://localhost/cursophp/reactPHP/delete.php?id=${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data))

        location.reload()
    }

    const handleOnFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files1 = e.target as HTMLInputElement;
        const files = files1.files;
        if(files && files.length > 0){
            setProducts({ ...products, [(e.target as HTMLInputElement).name]: files[0] })
            console.log(products)
        }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProducts({ ...products, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
        console.log(products)
    }

    async function enviar(e:ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('foto', products.foto)
        formData.append('name', products.name)
        formData.append('descricao', products.descricao)
        formData.append('preco', products.preco)
        formData.append('users_id', search_id);
        formData.append('categorias', products.categorias)

        setResponce(await axios.post("http://localhost/cursophp/reactPHP/insert.php", formData, {
            headers: { 'Content-Type': "multipart/form-data" }
        }))
        location.reload
    }

    const getProducts = async () => {
        const formDataGet = new FormData();
        formDataGet.append("users_id", search_id)
        setResponceGet(await axios.post("http://localhost/cursophp/reactPHP/index.php", formDataGet, {
            headers: {"Content-Type":"multipart/form-data"}
        }))
    }

    useEffect(() => {
        if(responceGet){
            setGet(responceGet.data.products)
            console.log(get)
        }

    }, [responceGet])

    useEffect(() => {
        getProducts()
        console.log(search_id)
    }, [])

    useEffect(() => {
        console.log(responce)
    }, [responce])

    return (
        <div>
            <ProductForm enviar={enviar} handleOnChange={handleOnChange} handleOnFile={handleOnFile} />
            <Listar get={get} excluir={excluir} search_id={search_id}/>
            <button onClick={() => {console.log(get.products)}}>mostrar</button>
        </div>
    )
}

export default Home