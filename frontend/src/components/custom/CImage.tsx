
type CImageProps = {
    image: string;
    style?: string;
}

const CImage = ({image,style}: CImageProps) => {
  return (
    <img src={image} alt="background" className={`absolute h-screen w-full top-0 left-0 object-center object-cover ${style}`} loading="lazy" draggable="false" />
      
  )
}

export default CImage
