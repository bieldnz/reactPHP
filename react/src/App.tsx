import { useEffect, useState } from "react";
import React, { ChangeEvent } from 'react';
import axios from "axios";

function App() {

  const [products, setProducts] = useState<any>({
    name: "",
    preco: "",
    descricao: "",
    foto: undefined,
  })

  const [get, setGet] = useState<any>(null);

  const getProducts = async () => {
    fetch("http://localhost/cursophp/reactPHP/index.php", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    .then((resp) => resp.json())
    .then((data) => {
      setGet(data.products)
      console.log(get)
    })
  }
  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProducts({ ...products, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value})
    console.log(products)
  }

  const handleOnFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files1: any = e.target;
    const files: any = files1.files[0];
    setProducts({ ...products, [(e.target as HTMLInputElement).name]: files})
    console.log(products)
  }

  async function enviar(e: any){
    const formData = new FormData();
    formData.append('foto', products.foto)
    formData.append('name', products.name)
    formData.append('descricao', products.descricao)
    formData.append('preco', products.preco)

    const responce = await axios.post("http://localhost/cursophp/reactPHP/insert.php", formData, {
      headers: {'Content-Type':"multipart/form-data"}
    })

    if(await responce.data.success){
      console.log(responce)
    }

  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <form onSubmit={enviar}>
        Nome: <input type="text" name="name" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        Descricao: <input type="text" name="descricao" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        PRECO: <input type="text" name="preco" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}/><br/>
        <input type="file" id="image-file" name="foto" onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnFile(e)}/><br/>
        <input type="submit"/>
      </form>
      <button onClick={() => console.log(get)}>dag</button>
      <br/><br/><br/>
      {get ? <div>
        {Object.values(get).map((item: any) => (
          <div key={item.id} style={{marginLeft: "10px"}}>
            <img src={`http://localhost/cursophp/reactPHP/images/`+item.foto} width="100px" height="100px"/>
            <p>Nome: {item.name}</p>
            <p>Descrição: {item.descricao}</p>
            <p>Preço: {item.preco}</p>
            <p>-------------------------------------------------------------------</p>
          </div>
        ))}
      </div>:"Não há produtos"}
    </>
  )
}

export default App
