import './PokemonList.css'
import React, { useState, useEffect } from 'react';
import Card from './Card'
import LoadingScreen from '../components/LoadingScreen';

function PokemonList(props) {
    
  const [pokemon, setPokemon] = useState([])
  const [currentFlipped, setCurrentFlipped] = useState()
  const [numLoaded, setNumLoading] = useState(0)

  function changeFlipped(name){
    setCurrentFlipped(name)
  }

  function getUrlFilters(){
    if(props.currentRegion === 'Kanto'){
      return 'limit=151'
    }
    else if(props.currentRegion === 'Johto'){
      return 'limit=200'
    }
    else if(props.currentRegion === 'Hoenn'){

    }
    else if(props.currentRegion === 'Sinnoh'){

    }
    else if(props.currentRegion === 'Unova'){

    }
    else if(props.currentRegion === 'Kalos'){

    }
    else if(props.currentRegion === 'Alola'){

    }
    else if(props.currentRegion === 'Galar'){

    }
  }

  function increaseNumLoaded(){
    setNumLoading(prev => prev + 1)
  }
  async function getData(){
    setNumLoading(0)
    await props.changeLoadState(true)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${getUrlFilters()}`)
    const data = await response.json()
    await setPokemon(data.results)
    
  }

  useEffect(() => {
    getData()
  }, [props.currentRegion])

  useEffect(() => {
    if(pokemon.length != 0 && numLoaded >= pokemon.length){
      props.changeLoadState(false)
    }
  }, [numLoaded])

  const pokemonCards = pokemon.map(poke => {
    return <Card key={poke.name} id={poke.name} url={poke.url} flippedCard={currentFlipped} handleFlip={changeFlipped} incrementLoadCount={increaseNumLoaded} loading={props.loading}/>
  })

  return (
    <div className='PokemonList container'>
      {props.loading ? <LoadingScreen /> : ""}
      {pokemonCards}
    </div>
  );
}
  
  export default PokemonList;