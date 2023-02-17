import './App.css';
import Header from './components/Header'
import Controls from './components/Controls'
import React, { useState } from "react";
import PokemonList from './components/PokemonList';

function App() {
  
  const [region, setPokemonRegion] = useState('Kanto') //Pokemon region that is being viewed
  const [searchText, setSearchText] = useState("") //Search input text
  const [isLoading, setIsLoading] = useState(true) //Load state for pokemon data

  function changePokemonRegion(newRegion) {
    setSearchText("")
    setPokemonRegion(newRegion)
  }
  function changeLoading(value){
    setIsLoading(value)
  }

  return (
    <div className="App">
      {!isLoading && <Header />}
      {!isLoading && <Controls 
                        changeSearch={setSearchText} 
                        changeRegion={changePokemonRegion}
                        currentRegion={region}
                      />
      }
      <PokemonList 
        currentRegion={region} 
        currentSearch={searchText}
        changeLoadState={changeLoading} 
        loading={isLoading}
      />
    </div>
  );
}

export default App;
