import './PokemonList.css'
import React, { useState, useEffect } from 'react';
import Card from './Card'
import LoadingScreen from '../components/LoadingScreen';

function PokemonList(props) {
    
  const [pokemon, setPokemon] = useState([])
  const [cards, setCards] = useState([])
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

    let cardElements = []

    await data.results.forEach(async pokemon => {
      const response_2 = await fetch(pokemon.url)
      const pokeData = await response_2.json()
      await cardElements.push(<Card key={pokemon.name} pokemonData={pokeData} flippedCard={currentFlipped} handleFlip={changeFlipped} />)
    });

    //console.log(cardElements)
    await setCards(cardElements)
    props.changeLoadState(false)

  }

  useEffect(() => {
    getData()
  }, [props.currentRegion])


  return (
    <div className='PokemonList container'>
      {props.loading ? <LoadingScreen /> : cards}
      {console.log(cards)}
    </div>
  );
}
  
  export default PokemonList;