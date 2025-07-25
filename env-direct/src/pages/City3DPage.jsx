import React from 'react';
import City3D from '../components/City3D';
import ScrollToTop from '../components/ScrollToTop';

const City3DPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen">
        <City3D />
      </div>
    </>
  );
};

export default City3DPage;
