
type CImageProps = {
    image: string;
}

const CImage = ({image}: CImageProps) => {
  return (
    <img src={image} alt="background" className="absolute h-screen w-full top-0 left-0 object-center object-cover" draggable="false" />
      
  )
}

export default CImage
