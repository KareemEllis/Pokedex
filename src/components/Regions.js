import './Regions.css'
import Alola from '../images/Regions/region_Alola.png'
import Galar from '../images/Regions/region_Galar.png'
import Hoenn from '../images/Regions/region_Hoenn.png'
import Johto from '../images/Regions/region_Johto.png'
import Kalos from '../images/Regions/region_Kalos.png'
import Kanto from '../images/Regions/region_Kanto.png'
import Sinnoh from '../images/Regions/region_Sinnoh.png'
import Unova from '../images/Regions/region_Unova.png'

function Regions(props) {
  
    function handleClick(region){
      props.changeRegion(region)
    }

    const items = [
      [1, Kanto, 'Kanto'],
      [2, Johto, 'Johto'],
      [3, Hoenn, 'Hoenn'],
      [4, Sinnoh, 'Sinnoh'],
      [5, Unova, 'Unova'],
      [6, Kalos, 'Kalos'],
      [7, Alola, 'Alola'], 
      [8, Galar, 'Galar']   
    ]
    const imageElements = items.map(
      item => <input 
                type="image" 
                key={item[0]} 
                src={item[1]} 
                onClick={() => handleClick(item[2])}
                alt={`Picture of ${item[2]}`}
              />
    )

    return (
      <div className="Regions container">
        {imageElements}
      </div>
    );
  }
  
  export default Regions;