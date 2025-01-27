import Button from "./custom/Button";
import logo from "../assets/images/4.png";
import { InputField, PasswordField } from "./custom/input";
import logo1 from "../assets/images/logo3.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { acc } from "../providers/DataProvider";

function Login() {
  const navigate = useNavigate();
  const [known, setKnown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const goLogin = () => {
    setLoading(true);
    if ( values.password !== acc.password) {
      setKnown(false);
      return;
    }
    localStorage.setItem("user", values.username);

    setKnown(true);
    setTimeout(() => {
      navigate("/home");
    setLoading(false);
    }, 2000);
  };
  return (
    <section className=" rounded-lg relative gap-2 shadow-lg">
      <img
        src={logo1}
        className="absolute  object-contain  md:min-w-[400px] min-w-[500px] z-1 md:bottom-[-80px] md:right-[-250px] bottom-[-150px] right-[-220px] md:-rotate-12 rotate-12"
        style={{
          filter: "drop-shadow(10px 0px 0px rgba(0, 0, 0, 0.3))",
        }}
        alt="Background"
      />
      <div className="  bg-orange-50/90 flex flex-col justify-center items-center rounded-xl p-4 gap-2 z-[10]">
        <div className="w-20 aspect-square ">
          <img src={logo} className="object-contain w-full h-full" alt="Logo" />
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

export default Login;
