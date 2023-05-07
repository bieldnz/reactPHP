import { ChangeEvent } from 'react';
import ProductForm from './layout/ProductForm';
import Listar from '../components/layout/Listar.tsx'
import { useState, useEffect } from "react"
import axios from "axios";

const Home = () => {

    const [get, setGet] = useState<any>(null);
    const [responce, setResponce] = useState<any>()
    const [products, setProducts] = useState<any>({
        name: "",
        preco: "",
        descricao: "",
        foto: undefined,
    })

    const excluir = async(id: number) => {
        await fetch(`http://localhost/cursophp/reactPHP/delete.php?id=${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data))

        location.reload()
    }

    const handleOnFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files1: any = e.target;
        const files: any = files1.files[0];
        setProducts({ ...products, [(e.target as HTMLInputElement).name]: files })
        console.log(products)
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProducts({ ...products, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
        console.log(products)
    }

    async function enviar(e:any) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('foto', products.foto)
        formData.append('name', products.name)
        formData.append('descricao', products.descricao)
        formData.append('preco', products.preco)

        setResponce(await axios.post("http://localhost/cursophp/reactPHP/insert.php", formData, {
            headers: { 'Content-Type': "multipart/form-data" }
        }))
        location.reload()

    }

    const getProducts = async () => {
        await fetch("http://localhost/cursophp/reactPHP/index.php", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setGet(data.products)
                console.log(get)
            })
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <button onClick={() => console.log(responce.data)}>asfdfa</button>
            <ProductForm enviar={enviar} handleOnChange={handleOnChange} handleOnFile={handleOnFile} />
            <Listar get={get} excluir={excluir}/>
        </div>
    )
}

export default Home