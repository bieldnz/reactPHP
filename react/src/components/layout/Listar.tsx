import {Link, useNavigate} from "react-router-dom"

type ListarProps = {
    get: any,
    excluir: any
    search_id: any
}

const Listar = ({get, excluir, search_id}: ListarProps) => {

    const history = useNavigate()

    const editar = (id: any) => {
        history(`/edit/${id}`, {state:{search_id:search_id}})
    }

    return (
        <div>
            {get ? <div style={{marginTop: "20px"}}>
                {Object.values(get).map((item: any) => (
                    <div style={{ marginLeft: "10px" }} key={`product_${item.id}`}>
                        <img src={`http://localhost/cursoPHP/reactPHP/images/${item.foto}`} width="100px" height="100px" />
                        <p>Nome: {item.name}</p>
                        <p>Descrição: {item.descricao}</p>
                        <p>Preço: {item.preco}</p>
                        <div>
                            <button onClick={() => excluir(item.id)}>excluir</button>
                            <button onClick={() => editar(item.id)}>Editar</button>
                        </div>
                        <p>--------------------------------------------------------------------</p>
                    </div>
                ))}
            </div> : "Não há produtos"}
        </div>
    )
}

export default Listar