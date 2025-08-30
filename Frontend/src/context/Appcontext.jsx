import { createContext, useContext, useState } from "react";
import { Customer } from "../assets/assets";

export const AppConext = createContext();

export const AppContextProvider = ({ children }) => {
    const [login, setlogin] = useState(true);
    const [menu, setmenu] = useState(false);
    const [showDropdown, setshowDropdown] = useState(false);
    const [statuses, setStatuses] = useState(Object.fromEntries(Customer.map(c => [c.id, c.status])));
    const [openDropdown, setOpenDropdown] = useState(null);
    const statusOptions = ['New', 'In Progress', 'Converted']
    

    const value = {
        login, setlogin,
        menu, setmenu,
        showDropdown, setshowDropdown,
        statuses, setStatuses,
        openDropdown, setOpenDropdown,
        statusOptions,

    };

    return <AppConext.Provider value={value}>{children}</AppConext.Provider>;
};

export const useAppcontext = () => useContext(AppConext);