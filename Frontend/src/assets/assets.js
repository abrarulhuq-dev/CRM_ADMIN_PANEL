import logo from './Logo.svg'
import profile_icon from './profile.png'
import manager_icon from './maganer.svg'
import dept_icon from './department.svg'
import customer_icon_1 from './natali.png'
import customer_icon_2 from './kate.png'
import customer_icon_3 from './drew.png'
import customer_icon_4 from './andi.png'
import customer_icon_5 from './digg.png'
import down_arrow_icon from './down_arrow.svg'
import { UserCog, Users, UserRound, Building2, Venus, Mars, Calendar } from 'lucide-react'

export const assets = {
    logo,
    profile_icon,
    customer_icon_1,
    customer_icon_2,
    customer_icon_3,
    customer_icon_4,
    customer_icon_1,
    manager_icon,
    dept_icon,
    down_arrow_icon,
}

export const Customer = [
    {
        id: 'CS731',
        profile: customer_icon_4,
        name: 'James Anderson',
        phone: '+91 9876543210',
        gender_icon: Venus,
        gender: 'Female',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'Melanie_Wiza@gmail.com',
        status: 'New',
    }, {
        id: 'CS732',
        profile: customer_icon_4,
        name: 'Kate Morrison',
        phone: '+91 9876543210',
        gender_icon: Mars,
        gender: 'Male',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'Patrick_Mraz@yahoo.com',
        status: 'New',
    },
    {
        id: 'CS733',
        profile: customer_icon_1,
        name: 'Natali Craig',
        phone: '+91 9876543210',
        gender_icon: Venus,
        gender: 'Female',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'MBridget_Beatty3@hotmail.com',
        status: 'New'
    },
    {
        id: 'CS734',
        profile: customer_icon_3,
        name: 'Drew Cano',
        phone: '+91 9876543210',
        gender_icon: Mars,
        gender: 'Male',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'Kenny_Wisozk11@hotmail.com',
        status: 'New'
    },
    {
        id: 'CS735',
        profile: customer_icon_5,
        name: 'Orlando Diggs',
        phone: '+91 9876543210',
        gender_icon: Mars,
        gender: 'Male',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'Jane.Johnson84@hotmail.com',
        status: "new"
    }, {
        id: 'CS736',
        profile: customer_icon_2,
        name: 'Kate Morrison',
        phone: '+91 9876543210',
        gender_icon: Venus,
        gender: 'Female',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'Leslie_Batz28@hotmail.com',
        status: 'New'
    },
    {
        id: 'CS737',
        profile: customer_icon_4,
        name: 'Andi Lane',
        phone: '+91 9876543210',
        gender_icon: Venus,
        gender: 'Female',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'Jaime.Jacobs@gmail.com',
        status: 'New'
    }, {
        id: 'CS738',
        profile: customer_icon_4,
        name: 'Natali Craig',
        phone: '+91 9876543210',
        gender_icon: Venus,
        gender: 'Female',
        calendar_icon: Calendar,
        added_on: 20 / 12 / 25,
        email: 'Bruce22@hotmail.com',
        status: 'New'
    },

]

export const Manager = [
    {

    }
]

export const Staff = [
    {

    }
]

export const department = [
    { name: "Sales" },
    { name: "Support" },
    { name: 'Innovative Strategies' },
    { name: 'Creative Solutions' }
]


export const Admin = {
    profile: profile_icon,
    name: 'John Mathew',
}


export const stats = [
    {
        label: 'Total Managers',
        value: 352,
        icon: UserCog,
        bg: 'bg-green-500/5',
        color: 'text-green-500',
    },
    {
        label: 'Total Staffs',
        value: 352,
        icon: Users,
        bg: 'bg-red-500/5',
        color: 'text-red-500',
    },
    {
        label: 'Total Customers',
        value: 352,
        icon: UserRound,
        bg: 'bg-blue-500/5',
        color: 'text-blue-500',
    },
    {
        label: 'Total Departments',
        value: 352,
        icon: Building2,
        bg: 'bg-indigo-500/5',
        color: 'text-indigo-500',
    },
]

