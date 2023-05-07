import { ChangeEvent } from "react";

const ProductForm = ({enviar, handleOnChange, handleOnFile}:any) => {
  return (
    <form onSubmit={enviar}>
        Nome: <input type="text" name="name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        Descricao: <input type="text" name="descricao" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        PRECO: <input type="text" name="preco" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        <input type="file" id="image-file" name="foto" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnFile(e)}/><br/>
        <input type="submit"/>
    </form>
  )
}

export default ProductForm