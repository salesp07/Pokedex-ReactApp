import AudioPlayer from 'react-modern-audio-player';
import { useState, useEffect } from 'react';
const playList = [
  {
    name: 'Littleroot Town',
    writer: '(R/S/E)',
    img: '/logo2.png',
    src: '/littleroot_town.mp3',
    id: 1,
  },
  {
    name: 'Oldale Town',
    writer: '(R/S/E)',
    img: '/logo2.png',
    src: '/oldale_town.mp3',
    id: 2,
  },
  {
    name: 'Ending',
    writer: '(D/P/Pt)',
    img: '/logo2.png',
    src: '/ending.mp3',
    id: 3,
  },
  {
    name: "Don't ever forget",
    writer: 'Pokémon Mystery Dungeon',
    img: '/logo2.png',
    src: '/dont_ever_forget.mp3',
    id: 4,
  },
  {
    name: 'Emotion',
    writer: 'Pokémon Black/White',
    img: '/logo2.png',
    src: '/emotion.mp3',
    id: 5,
  },
  {
    name: 'Pokemon Theme Song',
    writer: 'Jason Paige',
    img: '/logo2.png',
    src: '/pokemon_theme.mp3',
    id: 6,
  },
  {
    name: 'Pokemon World',
    writer: 'Anime Allstars',
    img: '/logo2.png',
    src: '/pokemon_world.mp3',
    id: 7,
  },
]

const mobileUI = {
  all: false,
  playButton: true,
  playList: true,
  prevNnext: true,
  volume: true,
  volumeSlider: true,
  repeatType: false,
  trackTime: false,
  trackInfo: false,
  artwork: false,
  progress: false,
};


function Player() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.innerWidth);
     // subscribe to window resize event "onComponentDidMount"
     window.addEventListener("resize", handleResizeWindow);
     return () => {
       // unsubscribe "onComponentDestroy"
       window.removeEventListener("resize", handleResizeWindow);
     };
   }, []);

  return (
    <AudioPlayer
      playList={playList}
      activeUI={screenWidth < 800 ? mobileUI : {
        all: true,
        progress: "waveform",
      }} />
  )
}
export default Player