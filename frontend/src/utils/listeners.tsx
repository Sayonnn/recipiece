import { playBackgroundMusic } from "../providers/AudioProvider";

const listener = {
  bgMusicToggler: () => {
    const handleInteraction = () => {
      playBackgroundMusic(true);
      document.removeEventListener("click", handleInteraction);
    };

    const handleVisibilityChange = () => {
      const state = document.hidden ? playBackgroundMusic(false) : playBackgroundMusic(true);
      return state;
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  },

};

export { listener };
