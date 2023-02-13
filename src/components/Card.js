import { useEffect, useState } from 'react';
import './Card.css'


function PokemonList(props) {
    const [pokeData, setPokeData] = useState({
        id: "",
        name: "",
        sprites: {
            other: {
                dream_world: {
                    front_default: ""
                }
            }
        },
        abilities: [
            {
                ability: {
                    name: ""
                }
            }
        ]
    })
    const [isImageLoading, setIsImageLoading] = useState(true)
    const [typeIcons, setTypeIcons] = useState([])
    const [bgColors, setBgColors] = useState(['grey', 'grey'])
    const typeColors = {
        bug: "#d9e290",
        dark: "#A29288",
        dragon: "#b392ff",
        electric: "#ffeda4", 
        fairy: "#F4BDC9",
        fighting: "#ff9f9a", 
        fire: "#ffc195", 
        flying: "#dacdff",
        ghost: "#A292BC",
        grass: "#c0ffa1", 
        ground: "#ffe499", 
        ice: "#a5ffff", 
        normal: "#bfbfbf", 
        poison: "#ff98ff", 
        psychic: "#ffabc4",
        rock: "#e0d294",
        steel: "#D1D1E0",
        water: "#8bc7ff"
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

    //Fetches for Pokemon data and sets it to state
    async function getPokemonData() {
        try {
            const response = await fetch(props.url)
            const data = await response.json()
            await setPokeData(data)

            let icons = []
            let colors = []
            data.types.forEach(item => {
                if(data.types.length == 1){
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

    function handleLoad(){
        setIsImageLoading(false);
        props.incrementLoadCount()
    }

    useEffect(() => {
        const image = new Image();
        image.src = pokeData.sprites.other.dream_world.front_default;
        image.onload = () => handleLoad()
      }, [pokeData.sprites.other.dream_world.front_default]);

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

    //console.log(pokeData.abilities)

    const backgroundStyles= {
        background: `linear-gradient(${bgColors.join(',')})`
    }

    return (
        <div className="scene scene--card" onClick={() => flip()}>
            {!props.loading ? 
            (<div className={`card ${props.id === props.flippedCard ? 'is-flipped' : ''}`} >
                <div className="card__face card__face--front" style={backgroundStyles} >
                    <h3> #{pokeData.id}</h3>
                    <img className='pokemon-img' src={pokeData.sprites.other.dream_world.front_default} alt={`Picture of ${pokeData.name}`} />
                    <h1>{pokeData.name}</h1>
                    <div className='types'>{typeIcons}</div>
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
            </div>)
            : ""}
        </div>
    );
  }
  
  export default PokemonList;