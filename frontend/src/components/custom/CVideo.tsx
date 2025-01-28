
type CVideoProps = {
    video: string;
    style?: string;
}

const CVideo = ({video,style}: CVideoProps) => {
  return (
    <video src={video} muted loop autoPlay  className={`absolute h-screen w-full top-0 left-0 object-center object-cover ${style}`}  draggable="false" />
      
  )
}

export default CVideo
