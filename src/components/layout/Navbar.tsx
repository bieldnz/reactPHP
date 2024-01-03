import Styles from "../style/navbar.module.css"
import { MdOutlineExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";

type NavType = {
    name: string
}

const Navbar = ({name}:NavType) => {
  return (
    <nav className={Styles.navAll}>
      <div>
        <h1>{name}</h1>
        <div>Registrador de Projetos</div>
      </div>
      <Link to="/"><MdOutlineExitToApp/></Link>
    </nav>
  )
}

export default Navbar