import { useState } from 'react';
import './App.css';



function App() {
  return (
    <div className="App">
      <div id='drum-machine' className='container'>
        <div id='display'></div>
        <div id='dp1' className='drum-pad'>Q
          <audio id='Q' src='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'className='clip'></audio>
        </div>
        <div id='dp2' className='drum-pad'>W</div>
        <div id='dp3' className='drum-pad'>E</div>
        <div id='dp4' className='drum-pad'>A</div>
        <div id='dp5' className='drum-pad'>S</div>
        <div id='dp6' className='drum-pad'>D</div>
        <div id='dp7' className='drum-pad'>Z</div>
        <div id='dp8' className='drum-pad'>X</div>
        <div id='dp9' className='drum-pad'>C</div>
      </div>
    </div>
  );
}

export default App;
