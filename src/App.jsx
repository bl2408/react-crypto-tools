import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import Leverage from "./Leverage/Leverage"
import Nav from "./Nav/Nav"

function App() {

  const [ theme, setTheme ] = useState("light");

  const toggleTheme =()=>{
    setTheme(state=> state==="light" ? "dark" : "light");
  };

  useEffect(()=>{
    document.documentElement.dataset.theme = theme;
  },[theme])

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />

      <Switch>

        <Route exact path={"/lev"} component={Leverage}/>

      </Switch>

    </>
  )
}

export default App
