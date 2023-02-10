import { useEffect, useState } from 'react';
import './Card.css'


function PokemonList(props) {
    const [pokeData, setPokeData] = useState(props.pokemonData)
    const [typeIcons, setTypeIcons] = useState([])
    const [bgColors, setBgColors] = useState(['grey', 'grey'])
    const typeColors = {
        bug: "#C6D16E",
        dark: "#A29288",
        dragon: "#A27DFA",
        electric: "#FAE078",
        fairy: "#F4BDC9",
        fighting: "#D67873",
        fire: "#F5AC78",
        flying: "#C6B7F5",
        ghost: "#A292BC",
        grass: "#A7DB8D",
        ground: "#EBD69D",
        ice: "#BCE6E6",
        normal: "#C6C6A7",
        poison: "#C183C1",
        psychic: "#FA92B2",
        rock: "#D1C17D",
        steel: "#D1D1E0",
        water: "#9DB7F5"
    }

    //Function to import images from a directory
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
        return images;
    }
    //Stores the images from the directory based on the path
    const images = importAll(require.context('../images/Type_icons', false, /\.(png|jpe?g|svg)$/));
    //EXAMPLE OF HOW TO USE THE IMAGES: <img src={images['doggy.png']} />

    async function getPokemonData() {
        try {
            let icons = []
            let colors = []
            pokeData.types.forEach(item => {
                if(pokeData.types.length == 1){
                    //If there is only one type, this adds the color twice so the gradient still works
                    colors.push(typeColors[item.type.name])
                    colors.push(typeColors[item.type.name])
                }
                else{
                    colors.push(typeColors[item.type.name])
                }

                const pokemonTypeStyle = {filter: `drop-shadow(0px 0px 8px ${typeColors[item.type.name]})`}
                icons.push(<img key={item.type.name} src={images[`type_${item.type.name}.png`]} alt={`Icon for ${item.type.name} type`} style={pokemonTypeStyle} />)
            });
            setTypeIcons(icons)
            setBgColors(colors)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPokemonData()
    }, [])

    //Fucntion to handle the flipping of the card component
    function flip(){
        if(props.flippedCard == props.id){
            props.handleFlip('')
        }
        else{
            props.handleFlip(props.id)
        }
    }
    
    const backgroundStyles= {
        background: `linear-gradient(${bgColors.join(',')})`
    }

    return (
        <div className="scene scene--card" onClick={() => flip()}>
            <div className={`card ${props.id === props.flippedCard ? 'is-flipped' : ''}`} >
                <div className="card__face card__face--front" style={backgroundStyles} >
                    <h3> #{pokeData.id}</h3>
                    <img className='pokemon-img' src={pokeData.sprites.other.dream_world.front_default} alt={`Picture of ${pokeData.name}`} />
                    <h1>{pokeData.name}</h1>
                    <div className='types'>{typeIcons}</div>
                    <h4>More Info</h4>
                </div>
                <div className="card__face card__face--back" style={backgroundStyles} >
                    <h1>{pokeData.name}</h1>
                    <h2>Abilities</h2>
                    <ul>
                    {pokeData.abilities.map(item => {
                        return <li key={item.ability.name}>{item.ability.name}</li>
                    })}
                    </ul>
                    <h2>Height</h2>
                    <p>{pokeData.height}</p>
                    <h2>Weight</h2>
                    <p>{pokeData.weight}</p>
                </div>
            </div>
        </div>
    );
  }
  
  export default PokemonList;