import { useEffect, useState } from 'react';
import './App.css';

const arr = [
  {
    keyCode: 81,
    text: "Q",
    id: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    text: "W",
    id: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    text: "E",
    id: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    text: "A",
    id: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    text: "S",
    id: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    text: "D",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    text: "Z",
    id: "Kick-n-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    text: "X",
    id: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    text: "C",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

function App() {

  const [volume, setVolume] = useState(0.5);
  const [track, setTrack] = useState('')
  const [speed, setSpeed] = useState(0.5);

  const playTrack = () => {
    let index = 0;
    let trackArr = track.split(' ');

    const interval = setInterval(() => {
      const audio = document.getElementById(trackArr[index])
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
      index++;
    }, speed * 600);

    // wait to clear with callback function
    setTimeout(() =>
      clearInterval(interval), 600 * speed * trackArr.length - 1
    );
  }

  return (

    <div className="App">
      <div id='drum-machine'>
        <div id="display" className='text-center text-white mb-4'>
          <h1>WOOMBAT</h1>
        </div>
        <div className='volume text-center'>
          <i class="fa fa-volume-off" aria-hidden="true"></i>
          <input 
            onChange={(e) => setVolume(e.target.value)}
            type="range" 
            step="0.01"
            value={volume}
            max="1"
            min="0"
            className='w-50'
          />
          <i className="volume-up fa fa-volume-up" aria-hidden="true"></i>
        </div>
        <div className='drum-pads'>
          {arr.map((clip) => (
            <Pad key={clip.id} clip={clip} volume={volume} setTrack={setTrack}/>
          ))}
        </div>
        <br/>
        <div className='track text-center'>
          <div>
            <p className='text-light'>{track}</p>
            <div className='speed text-center pt-2'>
              <i className="fa fa-fire" aria-hidden="true"></i>
              <input 
                onChange={(e) => setSpeed(e.target.value)}
                type="range" 
                step="0.01"
                value={speed}
                max="1.2"
                min="0.1"
                className='w-50'
              />
              <i className="fa fa-snowflake-o" aria-hidden="true"></i>
            </div>
            {track && (
            <>
            <div className='buttons'>
              <button onClick={playTrack} className='play btn btn-primary d-flex justify-content-center align-items-center'>
                <i className="fa fa-play" aria-hidden="true"></i>
              </button>
              <button onClick={() => setTrack("")}className='clear btn btn-danger d-flex justify-content-center align-items-center'>
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>
            </div>
            
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pad({ clip, volume, setTrack }){

  const [active, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }); 


  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode){
      playSound();
    }
  }

  const playSound = () => {
    const audio = document.getElementById(clip.text)
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    setTrack(prev => prev + clip.text + " ");
  }

  return (
    <div 
      key={clip.src}
      onClick={() => {
        playSound(clip.text)
      }} 
      id={clip.src} 
      className={`drum-pad bg-secondary noselect ${active && "bg-warning text-light"}`}
      >
      {clip.text}
      <audio className='clip ' id={clip.text} src={clip.src} />
    </div>
  );
}


export default App;
