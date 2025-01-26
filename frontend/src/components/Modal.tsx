import { typeChildren } from "../providers/TypeProvider"

function Modal({children}: typeChildren) {
  return (
    <section className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {children}
    </section>
  )
}

export default Modal
