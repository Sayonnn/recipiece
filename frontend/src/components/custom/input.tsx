/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { icons } from "../../utils/icons";

type typeInput = {
  type: "text" | "password" | "email";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  placeholder: string;
};

function InputField({ type, onChange, value, name, placeholder }: typeInput) {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      className="p-2 border rounded-lg focus:outline-none "
    ></input>
  );
}

function PasswordField({ onChange, value, name, placeholder }: typeInput) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <span className="relative flex border rounded-lg  bg-white">
      <input
        type={isPasswordVisible ? "text" : "password"}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
        className="p-2 border border-none    rounded-tl-lg rounded-br-lg focus:outline-none"
      ></input>
      <button onClick={togglePasswordVisibility} className="  p-2 border-l">{isPasswordVisible ? icons.iFaEyeSlash : icons.iFaEye}</button>
    </span>
  );
}

export { PasswordField, InputField };
