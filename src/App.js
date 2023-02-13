import './App.css';
import Header from './components/Header'
import Controls from './components/Controls'
import React, { useState } from "react";
import PokemonList from './components/PokemonList';



function App() {
  
  //STATE FOR DARK MODE
  const [region, setPokemonRegion] = useState('Kanto')
  const [searchText, setSearchText] = useState("")
  const [sort, setSort] = useState("ID")
  const [type, setType] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  function changePokemonRegion(newRegion) {
    setPokemonRegion(newRegion)
    console.log(`New Region: ${newRegion}`)
  }
  function changeLoading(value){
    setIsLoading(value)
  }

  return (
    <div className="App">
      {!isLoading && <Header />}
      {!isLoading && <Controls 
                        changeSearch={setSearchText} 
                        changeRegion={setPokemonRegion} 
                        changeSort={setSort} 
                        changeType={setType} 
                      />
      }
      {<PokemonList currentRegion={region} changeLoadState={changeLoading} loading={isLoading}/>}
    </div>
  );
}

export default App;
