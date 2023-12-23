import { ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import Listar from '../components/layout/Listar.tsx'
import FloatingButton from './layout/FloatingButton.tsx';
import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios";
import { ProductType } from './types/products.tsx';
import Navbar from "./layout/Navbar.tsx"

const Home = () => {

    const [get, setGet] = useState<ProductType[]>();
    const [last_id, setLast_id] = useState<ProductType>()
    let search_id: string = ""
    let login: string = ""

    const locationNavigate = useLocation();

    if (locationNavigate.state) {
        search_id = locationNavigate.state.search_id
        login = locationNavigate.state.login
    }

    const excluir = async (id: number): Promise<void> => {
        await fetch(`http://localhost/cursophp/reactPHP/delete.php?id=${id}`)
        if (get) {
            setGet(get.filter((item: ProductType) => item.id != id))
        }
    }

    async function enviar(e: ChangeEvent<HTMLInputElement>, products: ProductType, foto: any): Promise<void> {
        e.preventDefault
        const formData = new FormData();
        formData.append('foto', products.foto)
        formData.append('name', products.name)
        formData.append('descricao', products.descricao)
        formData.append('preco', products.preco)
        formData.append('users_id', search_id);
        formData.append('categorias', products.categorias)

        await axios.post("http://localhost/cursophp/reactPHP/insert.php", formData, {
            headers: { 'Content-Type': "multipart/form-data" }
        })
        products.foto = foto
        get?.unshift(await getLastId(products))
    }

    const getLastId = async (product: ProductType) => {
        await fetch(`http://localhost/cursophp/reactPHP/last_id.php?users_id=${search_id}`)
            .then((res) => res.json())
            .then((data) => {
                product.id = data
                setLast_id(product)
                return last_id
            })
        return product
    }

    const getProducts = async () => {
        const formDataGet = new FormData();
        formDataGet.append("users_id", search_id)
        try {
            let res: AxiosResponse<ProductType[]> = await axios.post("http://localhost/cursophp/reactPHP/index.php", formDataGet, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            let data: ProductType[] = res.data
            setGet(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    
    return (
        <div>
            <Navbar name={login}/>
            <Listar get={get} excluir={excluir} search_id={search_id} login={login}/>
            <FloatingButton enviar={enviar} />
        </div>
    )
}
export default Home