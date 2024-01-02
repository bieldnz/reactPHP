import Styles from "../style/navbar.module.css"
import { MdOutlineExitToApp } from "react-icons/md";

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
      <MdOutlineExitToApp/>
    </nav>
  )
}

export default Navbar