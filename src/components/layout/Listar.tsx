import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Styles from '../style/listar.floating.module.css'
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { ProductType } from "../types/products";

type ListarProps = {
    get: ProductType[] | undefined,
    excluir: (id: number, public_id_foto:string) => Promise<void>,
    search_id: string,
    login: string
}

const Listar = ({ get, excluir, search_id, login }: ListarProps) => {

    

    return (
        <div>
            
            {get && get.length > 0 ? <div style={{ marginTop: "20px" }} className={Styles.itemCard}>
                {get.map((item: ProductType) => (
                    <Card style={{ width: '18rem' }} key={item.id} className={Styles.cardObject}>
                        {typeof item.foto == "string" ? <Card.Img variant="top" src={item.foto}/>
                        : item.foto}
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className={`list-group-flush ${Styles.listGroup}`}>
                            <ListGroup.Item>{item.descricao}</ListGroup.Item>
                            <ListGroup.Item>Orçamento: {item.preco}</ListGroup.Item>
                            <ListGroup.Item>Categoria: {item.categorias}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body className={Styles.cardButtons}>
                            <button><FaPencilAlt /><Link to={`/edit/${item.id}`} state={{ search_id: search_id, login: login}}>Editar</Link></button>
                            <button onClick={() => excluir(item.id, item.public_id_foto)}><FaTrash />Excluir</button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            :
            <div className={Styles.allEmpty}>
                <div className={Styles.empty}>
                    NÃO HÁ ITENS
                </div>    
            </div>}
        </div>
    )
}

export default Listar