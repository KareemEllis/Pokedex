import './App.css';
import Header from './components/Header'
import Regions from './components/Regions'
import React, { useState } from "react";
import PokemonList from './components/PokemonList';



function App() {
  
  //STATE FOR DARK MODE
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [region, setPokemonRegion] = useState('Kanto')
  const [isLoading, setIsLoading] = useState(true)

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }
  function changePokemonRegion(newRegion) {
    setPokemonRegion(newRegion)
    console.log(`New Region: ${newRegion}`)
  }
  function changeLoading(value){
    setIsLoading(value)
  }

  return (
    <div className="App">
      {!isLoading && <Header darkMode={isDarkMode} toggleDark={toggleDarkMode} loading={isLoading} />}
      {/* {<Regions changeRegion={changePokemonRegion} />} */}
      {<PokemonList currentRegion={region} changeLoadState={changeLoading} loading={isLoading}/>}
    </div>
  );
}

export default App;
