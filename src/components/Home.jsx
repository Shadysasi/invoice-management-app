import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "./Navbar";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdEdit,MdDelete } from "react-icons/md";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const Home = () => {
    const [filter,setFilter] = useState('')
    const [invoices,setInvoices] = useState(()=>{
        const savedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
        return savedInvoices;
    });
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('invoices',JSON.stringify(invoices))
    },[invoices])

    const handleDelete =(id) => {
        const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
        setInvoices(updatedInvoices)
    }

    // Filter invoice by status
    const handleFilterChange = (e) => {
      setFilter(e.target.value)
    }

    const filteredInvoices = invoices.filter(invoice =>
      filter ? invoice.status === filter : true
    )

    


  return (
    <>
      <Navbar/>
      <section className="max-w-4xl mx-auto px-8 py-20 w-full">
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full mb-2">
              <h3 className="font-bold text-blue-gray-600">
                Invoice Information
              </h3>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button onClick={()=>navigate('/invoice-form')}
                  className="text-white gap-2 flex items-center justify-center bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                <FaRegPlusSquare size={15}/>
                add new invoice
              </button>
              <div className="gap-1 flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                <label>Filter by Status:  </label>
                <select value={filter} onChange={handleFilterChange}>
                  <option value=''>All</option>
                  <option value='Paid'>Paid</option>
                  <option value='Unpaid'>Unpaid</option>
                  <option value='Pending'>Pending</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                  <TableRow>
                      <StyledTableCell>Invoice Number</StyledTableCell>
                      <StyledTableCell align="center">Client Name</StyledTableCell>
                      <StyledTableCell align="center">Date</StyledTableCell>
                      <StyledTableCell align="center">Amount</StyledTableCell>
                      <StyledTableCell align="center">Status</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {filteredInvoices.map((invoice) => (
                      <StyledTableRow key={invoice.id}>
                      <StyledTableCell component="th" scope="row">
                          {invoice.invoiceNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">{invoice.clientName}</StyledTableCell>
                      <StyledTableCell align="center">{invoice.date}</StyledTableCell>
                      <StyledTableCell align="center">{invoice.amount}</StyledTableCell>
                      <StyledTableCell align="center">{invoice.status}</StyledTableCell>
                      <StyledTableCell align="right">
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-2 text-blue-600"
                              onClick={() => navigate(`/invoice-form/${invoice.id}`)}>
                              <MdEdit size={15}/>
                              Edit
                          </button>
                          <button className="flex items-center gap-2 text-red-600"
                              onClick={() => handleDelete(invoice.id)}>
                              <MdDelete size={15}/>
                              Delete
                          </button>
                        </div>
                      </StyledTableCell>
                      </StyledTableRow>
                  ))}
                  </TableBody>
              </Table>
              </TableContainer>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home