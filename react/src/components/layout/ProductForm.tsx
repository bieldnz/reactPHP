import { ChangeEvent } from "react";

const ProductForm = ({enviar, handleOnChange, handleOnFile}:any) => {

  const categorias = ["Tecnologia", "Veículos", "Supermercado", "Veículos", "Casa e Movéis", "Esporte e Fitness", "Ferramentas", "Construção", "Indústria e Comércio", "Saude", "Beleza", "Moda", "Brinquedos"]

  return (
    <form onSubmit={enviar} >
        Nome: <input type="text" name="name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        Descricao: <input type="text" name="descricao" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        PRECO: <input type="text" name="preco" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        Categoria: <select name="categorias" id="" onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChange(e)}>
                {categorias.map((categoria) => (
                    <option>{categoria}</option>
                ))}
            </select><br/>
        <input type="file" id="image-file" name="foto" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnFile(e)}/><br/>
        <input type="submit"/>
    </form>
  )
}

export default ProductForm