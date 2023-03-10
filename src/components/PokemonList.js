import './PokemonList.css'
import React, { useState, useEffect , forceUpdate} from 'react';
import Card from './Card'
import LoadingScreen from '../components/LoadingScreen';

function PokemonList(props) {
    
  const [pokemon, setPokemon] = useState([]) //All pokemon data
  const [currentFlipped, setCurrentFlipped] = useState() //Currently flipped card. Used to ensure 2 cards aren't flipped at the same time
  const [numLoaded, setNumLoading] = useState(0) //Number of pokemon instances that has loaded data
  const [loadedImages, setLoadedImages] = useState([]) //List of pokemon images that have been loaded
  const [filteredCards, setFilteredCards] = useState([]) //Pokemon cards found through search

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
    await props.changeLoadState(true) //Sets loading state to true
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${getUrlFilters()}`) //Gets data from pokeapi
    const data = await response.json()
    await setPokemon(data.results)
  }

  //When the region for the pokemon has changed, gets data for pokemon in new region
  useEffect(() => {
    setLoadedImages([])
    setFilteredCards([])
    getData()
  }, [props.currentRegion])

  //Checks if all pokemon have been loaded and changes load state
  useEffect(() => {
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

 
  //Filters the pokemon based on search input text
  useEffect(() => {
    let foundCards = []
    foundCards = pokemonCards.map(card => {
      if(card.props.id.startsWith(props.currentSearch)){
        return card
      }
    });
    setFilteredCards(foundCards)
    //card.props.id
  }, [props.currentSearch, currentFlipped])

  return (
    <div className='PokemonList container'>
      {props.loading ? <LoadingScreen /> : ""}
      {props.currentSearch == "" ? pokemonCards : filteredCards}
    </div>
  );
}
  
  export default PokemonList;