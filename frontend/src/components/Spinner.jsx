import React from 'react';
import loading from './loading.gif';

const Spinner = () => {
  return (
    <div className="container d-flex justify-content-center my-3">
      <img src={loading} alt="loading" style={{ height: '25px', width: '50px' }} />
    </div>
  );
};

export default Spinner;
