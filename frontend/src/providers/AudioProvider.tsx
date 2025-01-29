import sound1 from "../assets/sounds/sound2.mp3";

// Create a single persistent Audio instance
const audio1 = new Audio(sound1);
audio1.loop = true;

export const playBackgroundMusic = (state: boolean) => {
  if (state) {
    if (audio1.paused) {
      audio1.volume = 0.5;
      audio1.play().catch((err) => console.error("Audio playback failed:", err));
    }
  } else {
    audio1.pause();
  }
};

export const stopBackgroundMusic = (e:React.MouseEvent<HTMLSpanElement>,setState:React.Dispatch<React.SetStateAction<boolean>>) => {
  e.stopPropagation();
  if (audio1.paused) {
    audio1.play().catch((err) => console.error("Audio playback failed:", err));
    setState(true);
  } else {
    audio1.pause();
    setState(false);

  }
};
