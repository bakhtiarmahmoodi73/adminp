// components/TopComponent.tsx
import React from 'react';
import { ContainerRoot } from "../styled/HompageStylee"
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Box,
  StepConnector,
  stepConnectorClasses
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

interface StepItem {
  number: number;
  label: string;
  path: string;
}

const steps: StepItem[] = [
  { number: 1, label: 'Exchange', path: '/' },
  { number: 2, label: 'Confirm', path: '/confirm' },
  { number: 3, label: 'Complete', path: '/complete' },
];

const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 13,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTop: '1px solid #596B89',
    width: '100px',
    height: '0px',
    margin: '0 48px', 
  },
}));

const TopComponent: React.FC = () => {
  const location = useLocation();
  
  // تعیین activeStep بر اساس مسیر جاری
  const getActiveStep = (): number => {
    const path = location.pathname;
    
    if (path === '/' || path === '/exchange') return 0; // صفحه اصلی
    if (path === '/confirm') return 1;
    if (path === '/flow/send' || path === '/flow/receive') return 2; // Flow pages
    if (path === '/success' || path === '/complete') return 3; // صفحه success یا complete
    if (path === '/failed') return 2; // اگر failed برگردد به مرحله 2
    
    return 0;
  };

  const activeStep = getActiveStep();

  return (
    <ContainerRoot>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Stepper 
            activeStep={activeStep} 
            connector={<CustomConnector />}
          >
            {steps.map((step) => {
              const isActive = activeStep === step.number - 1;
              const isCompleted = activeStep >= step.number; // تغییر اینجا
              
              return (
                <Step key={step.number}>
                  <StepLabel
                    icon={
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          backgroundColor: isActive || isCompleted ? '#40A578' : '#596b89',
                          color:"#FFFFFF",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                         boxShadow: (isActive || isCompleted)
                            ? '0px 4px 20px 0px rgba(64, 165, 120, 0.5)'
                            : '',
                        }}
                      >
                        {step.number}
                      </Box>
                    }
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: isActive || isCompleted ? '#40A578' : '#596b89',
                        fontWeight: 700,
                        fontSize: '16px',
                        marginLeft: '8px',
                        '&.Mui-active': {
                          color: '#40A578',
                        },
                        '&.Mui-completed': {
                          color: '#40A578',
                        },
                      },
                    }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>
    </ContainerRoot>
  );
};

export default TopComponent;