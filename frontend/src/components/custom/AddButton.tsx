import { typeAddButton } from "../../providers/TypeProvider"
import { icons } from "../../utils/icons"

function AddButton({openModal}: typeAddButton) {
  return (
    <span
        className={`fixed bottom-4 right-4 z-20 text-white md:p-4  p-2 rounded-full bg-red-950 shadow-md cursor-pointer`}
        onClick={openModal}
      >
        {icons.iAddFill}
      </span>
  )
}

export default AddButton
