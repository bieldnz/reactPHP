import Styles from "../style/navbar.module.css"
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";

type NavType = {
    name: string
}

const Navbar = ({name}:NavType) => {
  return (
    <nav className={Styles.navAll}>
      <div className={Styles.alignLeft}>
        <h1>{name}</h1>
        <div>Registrador de Projetos</div>
      </div>
      <Link to={"/"}><BiExit/></Link>
    </nav>
  )
}

export default Navbar