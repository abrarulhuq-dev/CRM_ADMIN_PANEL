import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AppConext = createContext()

export const AppContextProvider = ({children }) => {

   const [login, setlogin] = useState(true);
   const [menu, setmenu] = useState(false);
   const [activestate, setactivestate] = useState();
    



const value = {
    login, setlogin,
    menu, setmenu,
    activestate, setactivestate,
}

return <AppConext.Provider value={value}>
    {children}
</AppConext.Provider>

}

export const useAppcontext = () =>{
    return useContext(AppConext)
}