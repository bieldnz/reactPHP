import Styles from "../style/floatingButton.module.css"
import ProductForm from "./ProductForm"
import { useState, ChangeEvent } from "react"
import { GrGallery } from "react-icons/gr"
import { ProductType } from "../types/products"

type FloatingType = {
    enviar:(e: ChangeEvent<HTMLInputElement>, products: ProductType, foto: any) => Promise<void>,
    login: string
}

const FloatingButton = ({ enviar, login }: FloatingType) => {
    const[booleanProps, setBooleanProps] = useState(true)
    const product = {name: "", preco: "", descricao: "", categorias: "", foto: "", id:0}
    return (
        <>
            <button className={Styles.floating} onClick={() => setBooleanProps(!booleanProps)}>
                <b>+</b>
            </button>
            <ProductForm enviar={enviar} booleanProps={booleanProps} noEdit={true} products={product} login={login} fotoAtual={<GrGallery/>}/>
        </>
    )
}

export default FloatingButton