import videoSrc from "../assets/videos/video1.mp4";
import mobile from "../assets/images/mobile1.jpg";
import CImage from "../components/custom/CImage";
import CVideo from "../components/custom/CVideo";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import Loading from "./../components/custom/Loading";

const Welcome = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.onloadeddata = () => {
      setIsVideoLoaded(true);
    };
    video.load();
  }, []);

  return isVideoLoaded ? (
    <main className="relative md:p-20 p-10 bg-orange-50 h-screen w-full grid place-content-center overflow-hidden">
      <h1 className="absolute right-4 bottom-4 z-10 text-lg font-greatVibe text-gray-700">
        &copy; Created by Laud Zion Cascalla • Sayon
      </h1>
      <CVideo video={videoSrc} style="md:block hidden" />
      <CImage image={mobile} style="md:hidden block" />
      <Login />
    </main>
  ) : (
    <Loading />
  );
};

export default Welcome;
