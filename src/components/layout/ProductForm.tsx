import { ChangeEvent, useState, useEffect } from "react";
import Styles from "../style/ProductForm.module.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../types/products";
import { CurrencyInput } from 'react-currency-mask';

type ProductFormType = {
  enviar: (e: ChangeEvent<HTMLInputElement>, products: ProductType) => Promise<void>,
  booleanProps: boolean,
  noEdit: boolean,
  products: ProductType,
  fotoAtual: any,
  login: string
}

const ProductForm = ({ enviar, booleanProps, noEdit, products, fotoAtual, login }: ProductFormType) => {

  const categorias = ["Tecnologia", "Veículos", "Supermercado", "Casa e Movéis", "Esporte e Fitness", "Ferramentas", "Construção", "Indústria e Comércio", "Saude", "Beleza", "Moda", "Brinquedos"]
  const [show, setShow] = useState(booleanProps);
  const [product, setProduct] = useState<any>()
  const [foto, setFoto] = useState<any>()
  const [checkForm, setCheckForm] = useState<boolean>(false)
  const history = useNavigate()

  useEffect(() => {
    setShow(!show)
  }, [booleanProps])

  useEffect(() => {
    if (noEdit == false) {
      setShow(true)

    } if (noEdit && checkForm) {
      setCheckForm(false)
    }
    setFoto(undefined)
  }, [show])

  useEffect(() => {
    setProduct(products)
  }, [products])

  const handleOnFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files1 = e.target as HTMLInputElement;
    const files = files1.files;
    if (files && files.length > 0) {
      setProduct({ ...product, [(e.target as HTMLInputElement).name]: files[0] })
      setFoto(<img src={URL.createObjectURL(files[0])} id="image-id" />);
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    setCheckForm(true)
    if (product.name && (product.preco != "R$ 0,00" && product.preco != "") && (product.categorias != "Categorias" && product.categorias != "") && ((foto && noEdit) || (!noEdit))) {
      if (noEdit) {
        setFoto(undefined)
      };      
      setShow(!show)
      setCheckForm(false)
      await enviar(e, product)
    }
  }

  return (
    <Modal size="lg" show={show} onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered className={Styles.allModal}>
      <Modal.Header closeButton={noEdit} >
        <Modal.Title>{noEdit ? "Adicionar Produto" : "Editar Produto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        <Form.Group style={{ marginTop: "20px" }} className={`${Styles.sectionImg} mb-3`}>
          {foto ? foto : fotoAtual}
          <Form.Control className={checkForm ? !foto ? "is-invalid" : '' : ''} type="hidden" />
          <Form.Control.Feedback type="invalid">
            {checkForm ? !foto ? <div>Insira uma imagem</div> : '' : ''}
          </Form.Control.Feedback>
          <label className={Styles.customFileUpload}>
            <input type="file" onChange={handleOnFile} id="image-file" name="foto" className={Styles.fileImage} />
            <MdFileUpload />
          </label>
        </Form.Group>
        <FloatingLabel controlId="floatingInput" label="Nome do projeto" className="mb-3">
          <Form.Control
            type="text"
            name='name'
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            value={product ? product.name : ""}
            isInvalid={checkForm ? product.name == "" ? true : false : false}
          />
          <Form.Control.Feedback type="invalid">
            {checkForm ? product.name == "" ? "Campo vazio" : '' : ''}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Orçamento do projeto" className="mb-3">
          <CurrencyInput
            value={product ? product.preco : "R$0,00"}
            onChangeValue={(_event, _originalValue, maskedValue) => {
              setProduct({...product, ["preco"]: maskedValue})
              
            }}
            InputElement={<Form.Control
              type="text"
              name='preco'
              isInvalid={checkForm ? product.preco == "R$ 0,00" || product.preco == "" ? true : false : false}
            />}
          />
          <Form.Control.Feedback type="invalid">
            {checkForm ? product.preco == "R$ 0,00" || product.preco == "" ? "Campo vazio" : "" : ""}
          </Form.Control.Feedback>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Descrição"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            name='descricao'
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
            value={product ? product.descricao : ""}
            isInvalid={checkForm ? product.descricao == "" ? true : false : false}
          />
          <Form.Control.Feedback type="invalid">
            {checkForm ? product.descricao == "" ? "Campo vazio" : '' : ''}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Control
          as="select"
          name="categorias"
          onChange={(e: ChangeEvent<HTMLInputElement>) => { handleOnChange(e) }}
          value={product ? product.categorias : "Categorias"}
          isInvalid={checkForm ? product.categorias == "Categorias" || product.categorias == "" ? true : false : false}
        >
          <option>Categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria}>{categoria}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {checkForm ? product.categorias == "Categorias" || product.categorias == "" ? "Campo vazio" : '' : ''}
        </Form.Control.Feedback>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={product ? () => history("/home", { state: { search_id: product.users_id, login: login } }) : () => setShow(false)}>
          Fechar
        </Button>
        <Button variant="primary" onClick={async (e: any) => {
          await handleSubmit(e)
        }}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductForm