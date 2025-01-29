import Button from "../custom/Button";
import logo from "../../assets/images/4.png";
import { InputField, PasswordField } from "../custom/input";
import logo1 from "../../assets/images/logo3.png";
import {  useState } from "react";
import { authenticate } from "../../utils/authenticate";

function LoginForm() {
  const [known, setKnown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const goLogin = () => {
    setLoading(true);
    const authenticated = authenticate.startLogin(values.password,values.username,setLoading);
    if(!authenticated){
      setKnown(authenticated);
      return;
    }
    setKnown(authenticated);
  };

  return (
    <section className="rounded-lg relative gap-2 shadow-lg overflow-hidden fadeIn">
      <img
        src={logo1}
        loading="lazy"
        className="absolute object-contain md:min-w-[400px] min-w-[500px] z-1 md:bottom-[-80px] md:right-[-250px] bottom-[-150px] right-[-220px] md:-rotate-12 rotate-12"
        style={{
          filter: "drop-shadow(10px 0px 0px rgba(0, 0, 0, 0.9))",
        }}
        alt="Background"
      />
      <div className="bg-orange-50/95 flex flex-col justify-center items-center rounded-xl p-4 gap-2 z-[10]">
        <div className="w-20 aspect-square">
          <img src={logo} className="object-contain w-full h-full" loading="lazy" alt="Logo" />
        </div>
        <h1 className="text-2xl font-greatVibe">Recipiece</h1>
        <div className="flex flex-col gap-2 z-10">
          <InputField
            type="email"
            name="username"
            value={values.username}
            placeholder="Username"
            onChange={handleChange}
          />
          <PasswordField
            type="password"
            name="password"
            value={values.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {loading && (
            <p
              className={`text-xs w-full text-right ${
                known ? "text-green-500" : "text-red-500"
              }`}
            >
              {known ? "Welcome, enjoy cooking!" : "Hey, who are you?"}
            </p>
          )}
          <Button type="submit" onClick={goLogin} style="hover:bg-orange-200 ">
            Login
          </Button>
          <p className="z-20 text-xs text-center w-full">
            &copy; 2025 Recipiece • Cooking Companion
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
