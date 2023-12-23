import Styles from "../style/navbar.module.css"

type NavType = {
    name: string
}

const Navbar = ({name}:NavType) => {
  return (
    <nav className={Styles.navAll}>
        <h1>{name}</h1>
        <div>Registrador de Projetos</div>
    </nav>
  )
}

export default Navbar