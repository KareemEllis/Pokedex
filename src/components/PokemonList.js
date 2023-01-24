import './PokemonList.css'
import React, { useState, useEffect } from 'react';
import Card from './Card'
import LoadingScreen from '../components/LoadingScreen';

function PokemonList(props) {
    
  const [pokemon, setPokemon] = useState([])
  const [currentFlipped, setCurrentFlipped] = useState()

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

  async function getData(){
    await props.changeLoadState(true)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${getUrlFilters()}`)
    const data = await response.json()
    await setPokemon(data.results)
    props.changeLoadState(false)
  }

  useEffect(() => {
    // fetch(`https://pokeapi.co/api/v2/pokemon?${getUrlFilters()}`)
    //   .then(response => response.json())
    //   .then(data => setPokemon(data.results))
    getData()
  }, [props.currentRegion])

  const pokemonCards = pokemon.map(poke => {
    return <Card key={poke.name} id={poke.name} url={poke.url} flippedCard={currentFlipped} handleFlip={changeFlipped} />
  })

  return (
    <div className='PokemonList container'>
      {props.loading ? <LoadingScreen /> : pokemonCards}
    </div>
  );
}
  
  export default PokemonList;