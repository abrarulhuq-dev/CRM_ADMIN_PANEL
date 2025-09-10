import { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "../assets/assets";
import axios from 'axios'
import toast from 'react-hot-toast'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {


    const [login, setlogin] = useState(localStorage.getItem('access_token') ? true : false) // checking the login or not
    const [menu, setmenu] = useState(false); // for mobile menu
    const [showDropdown, setshowDropdown] = useState(false); // for profile dropdown
    const [openDropdown, setOpenDropdown] = useState(null); // for status dropdown
    const statusOptions = ['New', 'In Progress', 'Converted'] // status options

    const [token, settoken] = useState(localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false)


    // state for department
    const [department, setdepartment] = useState([]);

    //state for manager
    const [manager, setmanager] = useState([]);

    // state for customer
    const [customerdata, setcustomerdata] = useState([]);
    const [staffdata, setstaffdata] = useState([]);

    // state for userdata
    const [user, setuser] = useState([]);


    const backendurl = import.meta.env.VITE_BACKEND_URL || 'https://crm-admin-panel-yyzy.onrender.com/'



    const getdepartment = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/department/', { headers: { Authorization: `Bearer ${token}` } });

            setdepartment(data);
            console.log(data);
        } catch (error) {
            toast.error(error.response.data.message || error.message);
            
            

        }
    }

    const getmanager = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/manager/', { headers: { Authorization: `Bearer ${token}` } });
            setmanager(data);
            console.log(data);

        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    const getcustomer = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/customer', { headers: { Authorization: `Bearer ${token}` } });


            setcustomerdata(data)
            console.log(data)

        } catch (error) {
            toast.error(error.response.data.message || error.message);
            console.log(error)

        }
    }

    const getuser = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/user/profile/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setuser(data)
            console.log(data)
        } catch (error) {

            toast.error(error.response.data.message || "Something went wrong");
            console.log(error)

        }
    }

    const getstaff = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/staff/', { headers: { Authorization: `Bearer ${token}` } })

            setstaffdata(data)
            console.log(data);


        } catch (error) {
            toast.error(error.message)
            console.log(error);

        }
    }


    // Update status by customer ID
    const updatestatus = async (customerId, newStatus) => {


        try {

           const {data} =  await axios.patch(backendurl + `api/customer/${customerId}/`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
            setOpenDropdown(null);
            getcustomer()
            toast.success(data.message)       

        } catch (error) {

            toast.error(error.message || "Something went wrong");
            console.log(error)

        }


    };




    useEffect(() => {

        if (token) {

            getuser()

        }

    }, [token])




    const value = {
        login, setlogin,
        menu, setmenu,
        showDropdown, setshowDropdown,
        openDropdown, setOpenDropdown,
        statusOptions, backendurl,
        department, setdepartment,
        manager, setmanager,
        token, settoken,
        user, customerdata,staffdata, updatestatus, setstaffdata,
        getcustomer, getstaff, updatestatus, getmanager, getdepartment

    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}

export const useAppcontext = () => useContext(AppContext)