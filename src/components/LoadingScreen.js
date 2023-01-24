import './LoadingScreen.css'
import { Player, Controls } from '@lottiefiles/react-lottie-player';

function LoadingScreen() {
  
    return (
      <div className="Loading container">

        <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_iwmd6pyr.json"
        style={{ height: '100px', width: '100px' }}
        >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>

        <h2>Loading...</h2>
      </div>
    );
  }
  
export default LoadingScreen;