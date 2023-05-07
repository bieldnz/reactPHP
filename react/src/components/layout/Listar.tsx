type ListarProps = {
    get: any,
    excluir: any
}

const Listar = ({get, excluir}: ListarProps) => {
    return (
        <div>
            {get ? <div style={{marginTop: "20px"}}>
                {Object.values(get).map((item: any) => (
                    <div key={item.id} style={{ marginLeft: "10px" }}>
                        <img src={`http://localhost/cursoPHP/reactPHP/images/${item.foto}`} width="100px" height="100px" />
                        <p>Nome: {item.name}</p>
                        <p>Descrição: {item.descricao}</p>
                        <p>Preço: {item.preco}</p>
                        <div><button onClick={() => excluir(item.id)}>excluir</button>-----<button>editar</button></div>
                        <p>--------------------------------------------------------------------</p>
                    </div>
                ))}
            </div> : "Não há produtos"}
        </div>
    )
}

export default Listar