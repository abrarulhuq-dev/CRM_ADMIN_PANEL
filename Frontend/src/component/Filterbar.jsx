import { CalendarDays, Search } from 'lucide-react'
import React from 'react'


const Filterbar = ({ searchHandle, search, Datehandle, from, to }) => {


    return (
        <form className="flex max-xl:flex-col py-3 flex-row gap-4 bg-transparent items-center justify-end">


            <div className="flex items-center bg-[#F7F7F7] rounded-xl  px-5 py-3 mt-7">
                <Search className="w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search" onChange={searchHandle} value={search} className="bg-transparent outline-none px-3 text-base w-full" />
            </div>

            <div className='flex gap-4 max-lg:flex-col lg:flex-row'>

                <div className="flex flex-col">
                    <label htmlFor="from" className="font-semibold mb-1 ml-1">From</label>
                    <div className="relative flex items-center bg-[#F7F7F7]  rounded-xl px-5 py-3 ">
                        <CalendarDays className="w-5 h-5 text-gray-400 mr-2 " />
                        <input id="from" type="date" value={from} onChange={Datehandle} className="bg-transparent outline-none text-base" required />
                    </div>
                </div>


                <div className="flex flex-col">
                    <label htmlFor="to" className="font-semibold mb-1 ml-1">To</label>
                    <div className="relative flex items-center bg-[#F7F7F7]  rounded-xl px-5 py-3">
                        <CalendarDays className="w-5 h-5 text-gray-400 mr-2" />
                        <input id="to" type="date" value={to} onChange={Datehandle} className="bg-transparent outline-none text-base" />

                    </div>
                </div>
            </div>

            <button className="bg-primary text-white font-semibold rounded-xl px-8 py-3 ml-2 mt-6">Apply</button>
        </form>
    )
}

export default Filterbar
