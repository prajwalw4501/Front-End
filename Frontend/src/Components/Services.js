import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';

const Services = () => {
  const allcites = ['Nagpur', 'Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Chennai','Haveli']
  const [employees, setEmployees] = useState([]);
  const [city, setCity] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    fetchUserLocation();
  }, []);

 const {selectedemployee,setSelectedemployee} = useContext(Context) ;
  const fetchUserLocation = () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Using a reverse geocoding API to get the city name from coordinates
          const response = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}longitude=${lon}&localityLanguage=en`
          );
          console.log(response);
          console.log(response.data.city,typeof(response.data.city),"resposmeeeeeeee");
         handleLocationSearch(response.data.city);
        } catch (err) {
          console.error("Error fetching city from coordinates", err);
        }
      });
    } else {
      toast.warning("Geolocation is not supported by this browser.");
    }
  };



  const handleLocationSearch = async (searchCity) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/empbycity/?city=${searchCity}`,
      );
      console.log(response.data,'return');
      setEmployees([...response.data]);
    } catch (err) {
      console.error("Error fetching employees by location", err);
    }
  };

  const handleBookService = (employeeId) => {
    const array=[];
    Object.keys(employeeId).map((id)=>{array.push(employeeId[id])})
    console.log(typeof(employeeId),"shcasbksa");
    setSelectedemployee(()=>(array))
    //console.log(employees,'employees-------')
      navigate("/book");
    
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position='top-center'/>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <div className="flex">
            <select className="w-auto p-2 mb-0 rounded border-collapse border-2 border-black-600" value={city}
              onChange={(e) => setCity(e.target.value)} required>
              <option value="" disabled>Select City</option>
              <option value="Pune" >Pune</option>
              <option value="Nagpur" >Nagpur</option>
              <option value="Bangalore" >Bangalore</option>
              <option value="Delhi" >Delhi</option>
              <option value="Mumbai" >Mumbai</option>
              <option value="Haveli" >Haveli</option>
              
              
            </select>

            <button
              onClick={()=>handleLocationSearch(city)}
              className="bg-slate-900 text-white p-2 rounded-br-md hover:bg-green-800"
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
  {employees.map((employee) => (
    <div
      key={employee[0]}
      className="bg-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {employee[1]} {employee[2]}
        </h2>
        <p className="text-gray-700 mb-1">Experience: {employee[3]} years</p>
        <p className="text-gray-700 mb-1">Gender: {employee[4]}</p>
        <p className="text-gray-700 mb-1">City: {employee[5]}</p>
        <p className="text-gray-700 mb-1">Service: {employee[6]}</p>
        <p className="text-gray-700 font-semibold">Amount: ₹{employee[7]}/month</p>
      </div>
      <button
        onClick={() => handleBookService(employee)}
        className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Book Service
      </button>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default Services
