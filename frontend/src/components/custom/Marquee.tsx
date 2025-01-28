import s from '../../assets/css/marquee.module.css'
type MarqueeProps = {
    text:string
    style?:string
}
function Marquee({text,style}:MarqueeProps) {
  return (
    <div className={`w-full h-20  ${s.marquee} ${style}`}>
        <p className={`${s.marqueeText} text-2xl font-greatVibe`}>{text}</p>
    </div>
  )
}

export default Marquee
