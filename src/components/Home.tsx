import { ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import Listar from '../components/layout/Listar.tsx'
import FloatingButton from './layout/FloatingButton.tsx';
import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios";
import { ProductType } from './types/products.tsx';
import Navbar from "./layout/Navbar.tsx"
import Loading from "./layout/Loading.tsx"

const Home = () => {

    const [get, setGet] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    let search_id: string = ""
    let login: string = ""

    const locationNavigate = useLocation();

    if (locationNavigate.state) {
        search_id = locationNavigate.state.search_id
        login = locationNavigate.state.login
    }

    const excluir = async (id: number, public_id_foto: string): Promise<void> => {
        setLoading(true)
        const formDelete = new FormData()
        formDelete.append("public_id_foto", public_id_foto)
        await axios.post(`https://apimarketplace-production.up.railway.app/delete.php?id=${id}`, formDelete)      
        if (get) {
            setGet(get.filter((item: ProductType) => item.id != id))
        }
        setLoading(false)
    }

    async function enviar(e: ChangeEvent<HTMLInputElement>, products: ProductType): Promise<void> {
        e.preventDefault
        setLoading(true)
        const formImage = new FormData()
        formImage.append("file", products.foto)
        formImage.append("upload_preset", "xm96za6d")

        await axios.post("https://api.cloudinary.com/v1_1/djqgjria4/image/upload", formImage)
            .then((res) => res.data)
            .then((data) => {
                products.foto = data.secure_url;
                products.public_id_foto = data.public_id
            }
        )

        const formData = new FormData();
        formData.append('foto', products.foto)
        formData.append('name', products.name)
        formData.append('descricao', products.descricao)
        formData.append('preco', products.preco)
        formData.append('users_id', search_id);
        formData.append('categorias', products.categorias)
        formData.append('public_id', products.public_id_foto)

        await axios.post("https://apimarketplace-production.up.railway.app/insert.php", formData, {
            headers: { 'Content-Type': "multipart/form-data" }
        })
        getLastId(products)
    }

    const getLastId = async (product: ProductType) => {

        let res = await axios.get(`https://apimarketplace-production.up.railway.app/last_id.php?users_id=${search_id}`, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        let data = res.data
        product.id = data
        setGet([product, ...get])
        setLoading(false)
    }

    const getProducts = async () => {
        setLoading(true)
        const formDataGet = new FormData();
        formDataGet.append("users_id", search_id)
        try {
            let res: AxiosResponse<ProductType[]> = await axios.post("https://apimarketplace-production.up.railway.app/index.php", formDataGet, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            let data: ProductType[] = res.data
            setGet(data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <div>
                <Navbar name={login} />
                <Listar get={get} excluir={excluir} search_id={search_id} login={login} />
                <FloatingButton enviar={enviar} login={login} />
                <Loading loading={loading}/>
            </div>
            
        </div>
    )
}
export default Home