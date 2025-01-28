// import audio1 from '../assets/sounds/sound1.mp3';
// import audio2 from '../assets/audio2.mp3';/
// import audio3 from '../assets/cooking.mp3';
import sound1 from '../assets/sounds/sound2.mp3';
import sound2 from '../assets/sounds/cooking.mp3';


  export const playAudio1 = () => {
    const audio = new Audio(sound1);
    audio.volume = 0.2;
    audio.loop = true;
    audio.play().catch((err) => console.error("Audio playback failed:", err));
    return () => {
        audio.pause();  
    }
  };


  export const playAudio2 = () => {
    const audio = new Audio(sound2);
    audio.volume = 0.1;
    audio.loop = true;
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  };
