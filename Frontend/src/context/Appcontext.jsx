import { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "../assets/assets";
import axios from 'axios'
import toast from 'react-hot-toast'

export const AppConext = createContext();

export const AppContextProvider = ({ children }) => {


    const [login, setlogin] = useState(localStorage.getItem('access_token') ? true : false) // checking the login or not
    const [menu, setmenu] = useState(false); // for mobile menu
    const [showDropdown, setshowDropdown] = useState(false); // for profile dropdown
    const [statuses, setStatuses] = useState(Object.fromEntries(Customer.map(c => [c.id, c.status]))); // for customer status
    const [openDropdown, setOpenDropdown] = useState(null); // for status dropdown
    const statusOptions = ['New', 'In Progress', 'Converted'] // status options

    const [token, settoken] = useState(localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false)

    // total count of department 
    const [deptcount, setdeptcount] = useState();

    // state for department
    const [department, setdepartment] = useState([]);
 
    //state for manager
    const [manager, setmanager] = useState([]);

    // state for customer
    const [customer, setcustomer] = useState([]);


    const backendurl = import.meta.env.VITE_BACKEND_URL



    const getdepartment = async () => {
        try {
            const  {data}  = await axios.get(backendurl + 'api/department/');

            setdepartment(data);
            console.log(data);
        } catch (error) {
            toast.error(error.message);
           
        }
    }

    const getmanager = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/manager/');
            setmanager(data);
            console.log(data);
            
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    const getcustomer = async() => {
        try {
            const {data} = await axios.get(backendurl + 'api/customer');
            setcustomer(data)
            console.log(data)
        } catch (error) {
            toast.error(error.message);
            console.log(error)
            
        }
    }

    useEffect(()=>{
        getcustomer()
    },[])

    useEffect(() => {
        getdepartment();
    }, []);

    useEffect(() => {
        getmanager();
    }, []);


    const value = {
        login, setlogin,
        menu, setmenu,
        showDropdown, setshowDropdown,
        statuses, setStatuses,
        openDropdown, setOpenDropdown,
        statusOptions, backendurl,
        department, manager,
        deptcount,token, settoken,

    };

    return <AppConext.Provider value={value}>
        {children}
    </AppConext.Provider>;
};

export const useAppcontext = () => useContext(AppConext);