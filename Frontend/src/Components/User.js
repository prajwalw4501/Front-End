import React, { useContext } from 'react'
import { Context } from '../App';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


const Userslist = ({ users }) => {

    return (
      <div className="flex flex-wrap justify-center">
        {users.map((user, index) => (
          <User key={user} user={user} />
        ))}
      </div>
    );
  };

const User = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
  useContext(Context);
  const navigate=useNavigate();
  const handleLogout = () => { 
    navigate('/login');
};
    return (
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center p-4">
          <div className="flex-shrink-0">
              <FaUser size={50} className="text-gray-700" />
          </div>
          <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-800">{user.firstname} {user.lastname}</h2>
              <p className="text-gray-600">{user.email}</p>
          </div>
      </div>
      <div className="border-t border-gray-200">
          <div className="p-4">
              {/* Uncomment and customize if needed */}
              {/* <div className="mb-2">
                  <span className="font-bold text-gray-700">Role:</span> {user.role}
              </div>
              <div className="mb-2">
                  <span className="font-bold text-gray-700">Location:</span> {user.city}, {user.state}
              </div>
              <div className="mb-2">
                  <span className="font-bold text-gray-700">Pincode:</span> {user.pincode}
              </div> */}
          </div>
      </div>
      <div className="p-4">
          <button onClick={handleLogout} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
              Logout
          </button>
      </div>
  </div>
  
      );
    };
    
    

export default User
