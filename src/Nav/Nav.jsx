import { Link } from "react-router-dom"
import './Nav.css'

export default function Nav({theme,toggleTheme}){

    return(
        <nav>
            <Link to={""}>Home</Link>
            <Link to={"lev"}>Leverage</Link>
            <div className="flexEnd"></div>
            <button onClick={toggleTheme}>{theme}</button>
        </nav>
    );

}