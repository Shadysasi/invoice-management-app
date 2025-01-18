import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const InvoiceForm = () => {
    const [formData,setFormData] = useState({
        invoiceNumber: '',
        clientName: '',
        date: '',
        amount: '',
        status: 'Pending'
    })

    const {id} = useParams()
    const navigate = useNavigate();
    const [invoices,setInvoices] = useState(()=>{
        const savedInvoices = JSON.parse(localStorage.getItem('invoices'))
        return savedInvoices
    })

    useEffect(() => {
        if(id){
            const existingInvoice = invoices.find((item) => item.id === parseInt(id));
            if (existingInvoice) {
                setFormData(existingInvoice)
            }
        }
    },[id,invoices])

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(id) {
            const UpdateInvoices = invoices.map((invoice) => 
            invoice.id === parseInt(id) ? {...formData,id: parseInt(id)} : invoice);
            setInvoices(UpdateInvoices)
        }else{
            setInvoices([...invoices,{...formData, id: invoices.length+1}])
        }
        navigate('/home')
    }

    useEffect(()=>{
        localStorage.setItem('invoices',JSON.stringify(invoices))
    },[invoices])

  return (
    <>
        <Navbar/>
        <div className='container mx-auto'>
            <div className='lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto'>
                <h1 className="text-3xl font-bold pb-5">
                    {id ? "Edit Invoice" : "Create Invoice"}
                </h1>
                <form className="flex flex-col justify-start items-center w-full m-auto"
                    onSubmit={handleSubmit}>
                    <ul className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
                        <li className='text-left flex flex-col gap-2 w-full'>
                            <label className="font-semibold">Invoice Number: 
                                <input type='text'
                                    name='invoiceNumber'
                                    value={formData.invoiceNumber}
                                    placeholder='Invoice Number'
                                    onChange={handleChange}
                                    required
                                    className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
                                />
                            </label>
                        </li>
                        <li className='text-left flex flex-col gap-2 w-full'>
                            <label className="font-semibold">Client Name: 
                                <input type='text'
                                    name='clientName'
                                    value={formData.clientName}
                                    placeholder='client Name'
                                    onChange={handleChange}
                                    required
                                    className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
                                />
                            </label>
                        </li>
                        <li className='text-left flex flex-col gap-2 w-full'>
                            <label className="font-semibold">Date: 
                                <input type='date'
                                    name='date'
                                    value={formData.date}
                                    placeholder='Date'
                                    onChange={handleChange}
                                    required
                                    className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
                                />
                            </label>
                        </li>
                        <li className='text-left flex flex-col gap-2 w-full'>
                            <label className="font-semibold">Amount: 
                                <input type='text'
                                    name='amount'
                                    value={formData.amount}
                                    placeholder='Amount'
                                    onChange={handleChange}
                                    required
                                    className='border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500'
                                />
                            </label>
                        </li>
                        <li className="w-fit gap-4 flex items-center justify-start py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                            <label className="font-semibold">Status: </label>
                            <select name='status' value={formData.status} onChange={handleChange}>
                                <option value='Paid'>Paid</option>
                                <option value='Unpaid'>Unpaid</option>
                                <option value='Pending'>Pending</option>
                            </select>   
                        </li>
                    </ul>
                    <div className="w-full text-left">
                        <button className="flex justify-center items-center gap-2 py-3 px-4 bg-violet-600 text-white text-md font-bold border  rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-violet-800 lg:m-0 md:px-6"
                                type='submit'>
                            {id ? 'Update Invoice' : 'Create Invoice'}
                        </button>
                    </div>
                </form>
            </div>
           
        </div>
    </>
    
  )
}

export default InvoiceForm