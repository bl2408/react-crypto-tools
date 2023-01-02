import { Route, Switch } from "react-router-dom"
import Leverage from "./Leverage/Leverage"
import Nav from "./Nav/Nav"

function App() {

  return (
    <>
      <Nav />

      <Switch>

        <Route exact path={"/lev"} component={Leverage}/>

      </Switch>

    </>
  )
}

export default App
