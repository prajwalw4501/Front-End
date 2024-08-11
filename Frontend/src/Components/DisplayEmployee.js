import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { FaEdit,FaTrash,FaMapMarkedAlt } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const DisplayEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
      fetchEmployees();
    }, []);
  
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/owner/allemps');
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees', err);
      }
    };
  
    const handleEdit =async (employee) => {
        const editid=employee[0];
      navigate(`/editemp/{editid}`,{ state:{ employee }});
      console.log(`Edit employee with ID ${editid}`);
    };
    const updateEmployees =async()=>{
        console.log("In employee edit page");
    }
  
    const handleDelete = async (empid) => {
      try {
        await axios.delete(`http://localhost:8080/api/owner/deleteemp/${empid}`);
        fetchEmployees();
      } catch (err) {
        console.error('Error deleting employee', err);
      }
    };

  
    return (

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Employee Details</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  <th className="py-3 px-6 text-left text-gray-600">ID</th>
                  <th className="py-3 px-6 text-left text-gray-600">First Name</th>
                  <th className="py-3 px-6 text-left text-gray-600">Last Name</th>
                  <th className="py-3 px-6 text-left text-gray-600">Experience</th>
                  <th className="py-3 px-6 text-left text-gray-600">Gender</th>
                  <th className="py-3 px-6 text-left text-gray-600">Phone No.</th>
                  <th className="py-3 px-6 text-left text-gray-600">Aadhar No.</th>
                  <th className="py-3 px-6 text-left text-gray-600">City</th>
                  <th className="py-3 px-6 text-left text-gray-600">Service</th>
                  <th className="py-3 px-6 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                    const empid = employee[0]; 
                    return(
                  <tr key={empid} className="border-b border-gray-300">
                    <td className="py-3 px-6 text-gray-700">{empid}</td>
                    <td className="py-3 px-6 text-gray-700">{employee[1]}</td>
                    <td className="py-3 px-6 text-gray-700">{employee[2]}</td>
                    <td className="py-3 px-6 text-gray-700">{employee[3]} Yrs</td>
                    <td className="py-3 px-6 text-gray-700">{employee[4]}</td>
                    <td className="py-3 px-6 text-gray-700">{employee[5]}</td>
                    <td className="py-3 px-6 text-gray-700">{employee[6]}</td>
                    <td className="py-3 px-6 text-gray-700">{employee[7]}</td>
                    <td className="py-3 px-6 text-gray-700">{employee[8]}</td>
                    <td className="py-3 px-6 flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(empid)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                    
                );})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

export default DisplayEmployee
