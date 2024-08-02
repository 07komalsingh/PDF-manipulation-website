import React from 'react';
import PropTypes from 'prop-types';

const ProtectedFileAlert = ({ message }) => {
  return (
    <div className="text-black p-4 rounded-md mb-4">
      {message || 'Protected files cannot be uploaded'}
    </div>
  );
};

ProtectedFileAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ProtectedFileAlert;
