import React, { useState } from 'react';

const SubsForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col md:items-center md:justify-center h-[240px] p-6 mt-10 w-full">
      <h2 className="text-2xl font-bold mb-6">Subscribe To our NewsLetter</h2>
      <div>
      <form onSubmit={handleSubmit} className="flex items-center w-full bg-white rounded-full shadow-md sm:gap-4 px-4">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="flex-grow sm:p-4 py-4 text-gray-700 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#44B7BC] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full focus:outline-none"
        >
          Submit
        </button>
      </form>
      </div>
      
    </div>
  );
};

export default SubsForm;
