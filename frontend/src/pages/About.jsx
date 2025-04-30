import React from 'react';

import { FaMoneyBillWave, FaMobileAlt, FaLock } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 flex flex-col md:flex-row">

      <div  className="hidden md:block w-full md:w-64 sticky top-0 md:h-screen z-10">
        <Navbar />
      </div>

      
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 max-w-4xl w-full text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700">
            About <span className="text-blue-500">My Money</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Welcome to <span className="font-semibold text-blue-600">My Money</span>, your trusted companion in secure and instant money transfers.
            Whether you're splitting bills, sending money to family, or paying for services, we make it effortless and safe.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left mt-8">
            <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition duration-300">
              <FaMoneyBillWave className="text-blue-600 text-3xl sm:text-4xl mb-4" />
              <h3 className="text-xl font-bold text-blue-700 mb-2">Instant Transfers</h3>
              <p className="text-gray-600">Send and receive money in seconds—across banks, anytime.</p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition duration-300">
              <FaMobileAlt className="text-blue-600 text-3xl sm:text-4xl mb-4" />
              <h3 className="text-xl font-bold text-blue-700 mb-2">Easy to Use</h3>
              <p className="text-gray-600">All it takes is your phone. A few taps and you're done.</p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition duration-300">
              <FaLock className="text-blue-600 text-3xl sm:text-4xl mb-4" />
              <h3 className="text-xl font-bold text-blue-700 mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Protected with top-grade encryption and compliance standards.</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-gray-500 text-sm">
              ❤️ Built with love and security for every user. Your money, your control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
