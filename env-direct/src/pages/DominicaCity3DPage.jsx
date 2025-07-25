import React from 'react';
import DominicaCombined3D from '../components/DominicaCombined3D';
import ScrollToTop from '../components/ScrollToTop';

const DominicaCity3DPage = () => {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen">
        <DominicaCombined3D />
      </div>
    </>
  );
};

export default DominicaCity3DPage;
