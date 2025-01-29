import { acc } from "../providers/DataProvider"

export const authenticate = {
    startLogin: (password:string, username:string,setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
        if (password !== acc.password) {
            return false;
        }

        sessionStorage.setItem("user", username);
        sessionStorage.setItem("isFirstTime",true.toString());
        setTimeout(() => {
            window.location.href ="/home";
            setLoading(false);
          }, 1000);
        return true;
    },
    startLogout:() => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isFirstTime");
        window.location.href = "/";
    }
}
