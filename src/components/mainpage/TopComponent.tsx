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

const steps = [
  { number: 1, label: 'Exchange' },
  { number: 2, label: 'Confirm' },
  { number: 3, label: 'Complete' },
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

function TopComponent() {
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
            activeStep={-1} 
            connector={<CustomConnector />}
          >
            {steps.map((step) => {
              const isFirstStep = step.number === 1;
              
              return (
                <Step key={step.number}>
                  <StepLabel
                    icon={
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          backgroundColor: isFirstStep ? '#40A578' : '#596b89',
                          color:"#FFFFFF",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                         boxShadow: isFirstStep 
                            ? ' 0px 4px 20px 0px rgba(64, 165, 120, 0.5)'
                            : '',
                        }}
                      >
                        {step.number}
                      </Box>
                    }
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: isFirstStep ? '#40A578' : '#596b89',
                        fontWeight: 700,
                        fontSize: '16px',
                        marginLeft: '8px',
                        '&.Mui-active': { // اضافه کردن این
                          color: isFirstStep ? '#40A578' : '#596b89',
                        },
                        '&.Mui-completed': { // اضافه کردن این
                          color: isFirstStep ? '#40A578' : '#596b89',
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
}

export default TopComponent;