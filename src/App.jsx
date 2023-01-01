import { Link, Route, Switch } from "react-router-dom"
import Leverage from "./Leverage"

function App() {

  return (
    <>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/lev"}>Leverage</Link>
      </nav>

      <Switch>

        <Route exact path={"/lev"} component={Leverage}/>

      </Switch>

    </>
  )
}

export default App
