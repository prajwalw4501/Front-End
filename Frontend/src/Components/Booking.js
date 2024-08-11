import React,{useState,useEffect} from 'react'
import axios from 'axios';


const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/bookings');
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">My Bookings</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.paymentId}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Booking Details</h2>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-semibold">Payment ID:</span> {booking.paymentId}</p>
                <p className="text-gray-700"><span className="font-semibold">Start Date:</span> {booking.startDate}</p>
                <p className="text-gray-700"><span className="font-semibold">End Date:</span> {booking.endDate}</p>
                <p className="text-gray-700"><span className="font-semibold">Status:</span> <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${booking.bookingStatus === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{booking.bookingStatus}</span></p>
                <p className="text-gray-700"><span className="font-semibold">Employee:</span> {booking.employeeName}</p>
                <p className="text-gray-700"><span className="font-semibold">Service:</span> {booking.service}</p>
                <p className="text-gray-700"><span className="font-semibold">Amount Paid:</span> ₹{booking.amountPaid}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
  
 export default Booking;
// {bookings.length === 0 ? (
//   <p className="text-center text-gray-500">No bookings found.</p>
// ) : (