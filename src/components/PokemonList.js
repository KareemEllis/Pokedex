import './PokemonList.css'
import React, { useState, useEffect } from 'react';
import Card from './Card'
import LoadingScreen from '../components/LoadingScreen';

function PokemonList(props) {
    
  const [pokemon, setPokemon] = useState([])
  const [currentFlipped, setCurrentFlipped] = useState()
  const [numLoaded, setNumLoading] = useState(0)
  const [loadedImages, setLoadedImages] = useState([])
  const [filteredCards, setFilteredCards] = useState([])
  

  function changeFlipped(name){
    setCurrentFlipped(name)
  }

  function getUrlFilters(){
    if(props.currentRegion === 'Kanto'){
      return 'limit=151'
    }
    else if(props.currentRegion === 'Johto'){
      return 'limit=100&offset=151'
    }
    else if(props.currentRegion === 'Hoenn'){
      return 'limit=135&offset=251'
    }
    else if(props.currentRegion === 'Sinnoh'){
      return 'limit=108&offset=386'
    }
    else if(props.currentRegion === 'Unova'){
      return 'limit=155&offset=494'
    }
    else if(props.currentRegion === 'Kalos'){
      return 'limit=72&offset=649'
    }
    else if(props.currentRegion === 'Alola'){
      return 'limit=88&offset=721'
    }
    else if(props.currentRegion === 'Galar'){
      return 'limit=89&offset=809'
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
    console.log("Total Number of Pokemon: " + data.results.length)
    
  }

  useEffect(() => {
    setLoadedImages([])
    setFilteredCards([])
    getData()
  }, [props.currentRegion])

  useEffect(() => {
    console.log("Num Loaded: " + numLoaded)
    if(pokemon.length != 0 && numLoaded >= pokemon.length){
      props.changeLoadState(false)
    }
  }, [numLoaded])

  const pokemonCards = pokemon.map(poke => {
    return <Card 
    key={poke.name} 
    id={poke.name} 
    url={poke.url} 
    flippedCard={currentFlipped} 
    handleFlip={changeFlipped} 
    incrementLoadCount={increaseNumLoaded} 
    loading={props.loading} 
    loadedImages={loadedImages}
    setLoadedImages={setLoadedImages}/>
  })

  //Checking for the search input
  useEffect(() => {
    let foundCards = []
    pokemonCards.forEach(card => {
      if(card.props.id.startsWith(props.currentSearch)){
        foundCards.push(card)
      }
    });
    setFilteredCards(foundCards)
    //card.props.id
  }, [props.currentSearch])

  return (
    <div className='PokemonList container'>
      {props.loading ? <LoadingScreen /> : ""}
      {props.currentSearch == "" ? pokemonCards : filteredCards}
    </div>
  );
}
  
  export default PokemonList;