import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Card.css'


function PokemonList(props) {
    const [pokeData, setPokeData] = useState({
        "id": "",
        "name": "",
        "sprites": {
            "other": {
                "dream_world": {
                    "front_default": ""
                },
                "official-artwork": {
                    "front-default": ""
                }
            }
        },
        "abilities": [
            {
                "ability": {
                    "name": ""
                }
            }
        ],
        "stats": [
            {
                "base_stat": 0,
                "stat": {
                    "name": "hp"
                }
            },
            {
                "base_stat": 0,
                "stat": {
                    "name": "attack"
                }
            },
            {
                "base_stat": 0,
                "stat": {
                    "name": "defense"
                }
            },
            {
                "base_stat": 0,
                "stat": {
                    "name": "special-attack"
                }
            },
            {
                "base_stat": 0,
                "stat": {
                    "name": "special-defense"
                }
            },
            {
                "base_stat": 0,
                "stat": {
                    "name": "speed"
                }
            }
        ]
    })
    // const [isImageLoading, setIsImageLoading] = useState(true)
    const [typeIcons, setTypeIcons] = useState([])
    const [bgColors, setBgColors] = useState(['grey', 'grey'])
    const typeColors = {
        bug: "#d9e290",
        dark: "#7d7d7d", //DONE
        dragon: "#7c92ff", //DONE
        electric: "#ffe168", //DONE
        fairy: "#F4BDC9",
        fighting: "#ff837d", //DONE
        fire: "#ffc765", //DONE
        flying: "#dacdff",
        ghost: "#A292BC",
        grass: "#5fff82", //DONE
        ground: "#ffb657", 
        ice: "#85ffff", //DONE
        normal: "#cfcfcf", //DONE
        poison: "#ff98ff", 
        psychic: "#ffabc4", //DONE
        rock: "#e0d294",
        steel: "#D1D1E0",
        water: "#78a7ff" //DONE
    }

    //Function to import images from a directory
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
        return images;
    }
    //Stores the images from the directory based on the path
    const images = importAll(require.context('../images/Type_icons', false, /\.(png|jpe?g|svg)$/));
    //EXAMPLE: <img src={images['doggy.png']} />

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
                icons.push(
                    <div className='tooltip' key={item.type.name}>
                        <img  src={images[`type_${item.type.name}.png`]} alt={`Icon for ${item.type.name} type`} style={pokemonTypeStyle} />
                        <span className='tooltiptext'>{item.type.name}</span>
                    </div>
                )
            });
            setTypeIcons(icons)
            setBgColors(colors)
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if(!props.loadedImages.includes(pokeData.name) && pokeData.name != ""){
            props.incrementLoadCount()
            props.setLoadedImages(prevArr => [...prevArr, pokeData.name])
        }
    }, [pokeData])


    useEffect(() => {
        getPokemonData()
    }, [])

    const backgroundStyles= {
        background: `linear-gradient(${bgColors.join(',')})`
    }

    //Fucntion to handle the flipping of the card component
    function flip(){
        if(props.flippedCard == props.id){
            props.handleFlip('')
        }
        else{
            props.handleFlip(props.id)
        }
    }

    return (
        <div className="scene scene--card" onClick={() => flip()}>
            {!props.loading ? 
            (<div className={`card ${props.id === props.flippedCard ? 'is-flipped' : ''}`} >

                <div className="card__face card__face--front" style={backgroundStyles} >
                    <h3> #{pokeData.id}</h3>
                    <div className='pokemon-img'>
                        <LazyLoadImage
                            height={"110px"}
                            effect="blur"
                            alt={`Picture of ${pokeData.name}`}
                            src={pokeData.sprites.other.dream_world.front_default != null ? pokeData.sprites.other.dream_world.front_default : pokeData.sprites.other["official-artwork"].front_default} // use normal <img> attributes as props
                        />
                    </div>
                    <h1>{pokeData.name}</h1>
                    <div className='types'>{typeIcons}</div>
                </div>


                <div className="card__face card__face--back" style={backgroundStyles} >
                    <h1>{pokeData.name}</h1>
                    <h2>HP: <span>{pokeData.stats[0].base_stat}</span></h2> 
                    <h2>Attack: <span>{pokeData.stats[1].base_stat}</span></h2> 
                    <h2>Defense: <span>{pokeData.stats[2].base_stat}</span></h2> 
                    <h2>Special Atk: <span>{pokeData.stats[3].base_stat}</span></h2> 
                    <h2>Special Def: <span>{pokeData.stats[4].base_stat}</span></h2>
                    <h2>Speed: <span>{pokeData.stats[5].base_stat}</span></h2>  
                    <h2>Height: <span>{pokeData.height}</span></h2>
                    <h2>Weight: <span>{pokeData.weight}</span></h2>
                </div>

            </div>)
            : ""}
        </div>
    );
  }
  
  export default PokemonList;