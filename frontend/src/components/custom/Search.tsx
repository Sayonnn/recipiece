import { icons } from "../../utils/icons";

function Search() {
  return (
    <span className="flex items-stretch justify-center  cursor-pointer border flex-row-reverse rounded-md">
      <span className=" p-2  bg-orange-50" style={{ borderRadius: "inherit" }}>
        {icons.iSearchLine}
      </span>
      <input
        placeholder="Search..."
        name="ingredient"
        className="font-normal font-sm focus:shadow-md focus:outline-none border-none"
      ></input>
    </span>
  );
}

export default Search;
