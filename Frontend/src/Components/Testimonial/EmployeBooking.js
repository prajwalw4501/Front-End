import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../../App';



const EmployeBooking = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [service, setService] = useState('')
  const [isBooking, setIsBooking] = useState(false);
  const { selectedemployee ,user} = useContext(Context)
  const [serviceselected, setServiceselected] = useState(false);

  useEffect(() => {
    if (selectedemployee.length == 0) {
      return
    }
    setServiceselected(true)
    setAmount(selectedemployee[7])
    setService(selectedemployee[6])
  }, [selectedemployee]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    document.body.appendChild(script);
  }, []);


  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    // Automatically set the end date to one month later
    const start = new Date(e.target.value);
    start.setMonth(start.getMonth() + 1);
    setEndDate(start.toISOString().split('T')[0]);
  };
  const handlePayment = async () => {
    try {
      // Step 1: Create order on the backend
      //get krna he!!
      const orderResponse = await axios.post('http://localhost:8080/api/user/createorder', {
        //  amount: bookingDetails.amount, // Amount in paise
        enddate:endDate,
        startDate,
        userid:user.uid,
        emp_id:selectedemployee[0],
      });

      const { id: order_id, amount, currency } = orderResponse.data;

      // Step 2: Initialize Razorpay
      const options = {
        key: 'rzp_test_PoPCUX0so3eLSh', // Replace with your Razorpay key ID
        amount: amount,
        currency: currency,
        name: 'Service Booking',
        // description: `Booking for ${bookingDetails.serviceName}`,
        order_id: order_id,
        handler: async function (response) {
          const paymentData = {
            order_id: order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          // Step 3: Verify payment on the backend
        //  const verificationResponse = await axios.post('http://localhost:8080/verifyPayment', paymentData);

          // if (verificationResponse.data.success) {
          //   toast.success('Payment successful!');
          //   // Proceed with booking confirmation
          // } else {
          //   toast.error('Payment verification failed!');
          // }
          return true;
        },
        prefill: {
          //   name: bookingDetails.userName,
          //   email: bookingDetails.userEmail,
          //   contact: bookingDetails.userPhone,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      toast.error('Payment initialization failed. Please try again.');
    }
  };
  const handleEndDateChange = (e) => {
    const start = new Date(startDate);
    const end = new Date(e.target.value);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      toast.error('End date must be at least 1 month after the start date.');
    } else {
      setEndDate(e.target.value);
    }
  };

  const handleBookService = async () => {
    setIsBooking(true);

    try {
      const response = await axios.post('http://localhost:8080/api/bookings', {
        service,
        amount,
        startDate,
        endDate,
      });
      toast.success('Booking successful! Please proceed with the payment.');

      // Redirect to payment gateway or handle payment
    } catch (err) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
      <h2 className="text-2xl font-semibold mb-4">Book Service for Employee</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Service</label>
        <input
          type="text"
          value={service}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Amount</label>
        <input
          type="text"
          value={`₹${amount}`}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        onClick={handlePayment}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        disabled={isBooking || !startDate || !endDate || !serviceselected}
      >
        {isBooking ? 'Booking...' : 'Book Service'}
      </button>
      {
        serviceselected == false && <div
          className="w-[20vw] text-red-600 py-2 rounded-md "

        >
          please select service first
        </div>
      }
    </div>
  );
};

export default EmployeBooking;
