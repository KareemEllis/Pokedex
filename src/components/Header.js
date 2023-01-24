import logo_pokemon from '../images/logo_Pokemon.png'
import logo_github from '../images/logo_github.png'
import logo_linkedin from '../images/logo_linkedin.png'
import './Header.css'

function Header(props) {   

  return (
    <header className='container'>

      {/* THIS IS THE TOGGLE DARK MODE CONTROLS */}
      <div className={`dark-mode-toggle ${props.darkMode ? 'dark' : 'light'}`} onClick={props.toggleDark}>
          <div className="toggle-btn"></div>
      </div>


      <img className='logo' src={logo_pokemon} alt='Pokemon Logo'/>
      
      <div className='links'>
        <a href='https://www.linkedin.com/in/kareem-ellis-1b14a318b/' target='_blank' rel="noreferrer">
            <img src={logo_linkedin} alt='LinkedIn Logo'/>
        </a>
        <a href='https://github.com/KareemEllis' target='_blank' rel="noreferrer">
            <img src={logo_github} alt='Github Logo'/>
        </a>
      </div>

    </header>
  );
}
  
  export default Header;
  