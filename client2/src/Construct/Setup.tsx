import React, { useState } from 'react';
import { Box } from '@mui/material';
// import Cube from '../Shared/Cube';
// import GridPreview from '../Shared/GridPreview';

export const Setup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  if (currentStep === 0) {
    return <ChooseBoardSize />;
  }
};

export const ChooseBoardSize = () => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid red',
        width: '100%',
        height: 900,
      }}
    >
      {/* <Box style={{ width: 300, height: 300 }}>
        <GridPreview size={15} />
      </Box>
      <Box style={{ width: 350, height: 350 }}>
        <GridPreview size={21} />
      </Box> */}
      {/* <Cube animate />
      <div>15x15</div>
      <div>21x21</div> */}
    </Box>
  );
};
