import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';
import { setStep, setExchangeFormData } from '../store/slices/exchangeSlice';

import {
  BoxCircle,
  BoxConfirmDetail,
  BoxConfirmRoot,
  BoxDetail,
  ContainerConfirm,
  CustomButton,
  CustomCheckbox,
  CustomInput,
  TypographyConfirm,
  TypographyDetail,
  TypographyRule,
} from "../components/styled/HompageStylee";
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";
import Line from "../assets/images/lines/Line 10.svg?react";
import { Box, Alert, Snackbar } from "@mui/material";
import { RootState } from '../store';

interface ConfirmFormData {
  email: string;
  agreedToTerms: boolean;
}

function ConfirmPageWithEmail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const exchangeState = useAppSelector((state: RootState) => state.exchange);
  
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  
  const shouldShowEmailField = !(isAuthenticated && user?.email);
  
  const containerHeight = shouldShowEmailField ? "909px" : "819px";
  const saveToLocalStorage = () => {
    const storageData = {
      fromCurrency: exchangeState.fromCurrency,
      toCurrency: exchangeState.toCurrency,
      fromAmount: exchangeState.fromAmount,
      toAmount: exchangeState.toAmount,
      email: user?.email || formik.values.email,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('exchangeData', JSON.stringify(storageData));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('exchangeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const isRecent = new Date().getTime() - parsedData.timestamp < 10 * 60 * 1000;
        if (isRecent && parsedData.fromAmount) {          
          dispatch(setExchangeFormData({
            fromCurrency: parsedData.fromCurrency,
            toCurrency: parsedData.toCurrency,
            fromAmount: parsedData.fromAmount,
            toAmount: parsedData.toAmount
          }));
          
          if (!isAuthenticated || !user?.email) {
            formik.setFieldValue('email', parsedData.email || '');
          }
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  };
  const clearLocalStorage = () => {
    localStorage.removeItem('exchangeData');
  };
  const validateForm = (values: ConfirmFormData) => {
    const errors: Partial<ConfirmFormData> = {};

    if (shouldShowEmailField) {
      const emailSchema = z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address');
      
      const result = emailSchema.safeParse(values.email);
      
      if (!result.success) {
        errors.email = result.error.issues[0]?.message || 'Invalid email';
      }
    }
    return errors;
  };

  const formik = useFormik<ConfirmFormData>({
    initialValues: {
      email: user?.email || '',
      agreedToTerms: false,
    },
    validate: validateForm,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = {
          sendAmount: exchangeState.fromAmount || "100",
          sendCurrency: exchangeState.fromCurrency || "tether",
          receiveAmount: exchangeState.toAmount || "120",
          receiveCurrency: exchangeState.toCurrency || "permoney",
          email: shouldShowEmailField ? values.email : user?.email,
          agreedToTerms: values.agreedToTerms,
          userId: user?.id || null,
          userEmail: user?.email || null,
        };

        console.log('Submitting form data:', formData);
        
        saveToLocalStorage();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (exchangeState.fromCurrency === 'tether' && exchangeState.toCurrency === 'permoney') {
          navigate('/flow/send');
        } else if (exchangeState.fromCurrency === 'permoney' && exchangeState.toCurrency === 'tether') {
          navigate('/flow/receive');
        } else {
          navigate('/complete');
        }
        
        dispatch(setStep(3));
        
        clearLocalStorage();
        
        setShowSuccess(true);
        
        if (shouldShowEmailField && values.email) {
          formik.resetForm({
            values: {
              email: '',
              agreedToTerms: false,
            },
          });
        } else {
          formik.setFieldValue('agreedToTerms', false);
        }
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('agreedToTerms', event.target.checked);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const isFormValid = () => {
    if (!formik.values.agreedToTerms) return false;
    
    if (shouldShowEmailField) {
      return !formik.errors.email && formik.values.email !== '';
    }
    
    return true;
  };

  useEffect(() => {
    loadFromLocalStorage();
    setIsHydrated(true);
        const saveData = () => {
      if (exchangeState.fromAmount || exchangeState.toAmount) {
        saveToLocalStorage();
      }
    };
    
    saveData();
        const handleBeforeUnload = () => {
      saveToLocalStorage();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [exchangeState]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      formik.setFieldValue('email', user.email);
    }
  }, [isAuthenticated, user]);

  const getSendIcon = () => {
    if (exchangeState.fromCurrency === 'tether') {
      return <Tether />;
    } else {
      return <PerMoney />;
    }
  };

  const getSendCurrencyText = () => {
    if (exchangeState.fromCurrency === 'tether') {
      return "USDT";
    } else {
      return "Perfect Money";
    }
  };

  const getReceiveIcon = () => {
    if (exchangeState.toCurrency === 'tether') {
      return <Tether />;
    } else {
      return <PerMoney />;
    }
  };

  const getReceiveCurrencyText = () => {
    if (exchangeState.toCurrency === 'tether') {
      return "USDT";
    } else {
      return "Perfect Money";
    }
  };

  if (!isHydrated) {
    return (
      <ContainerConfirm sx={{ height: containerHeight }}>
        <div>Loading...</div>
      </ContainerConfirm>
    );
  }

  return (
    <ContainerConfirm sx={{ height: containerHeight }}>
      <TypographyConfirm>Invoice Details :</TypographyConfirm>
      
      <BoxConfirmRoot>
        <BoxConfirmDetail>
          <TypographyDetail>Send :</TypographyDetail>
          <BoxDetail>
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {exchangeState.fromAmount || "100"}
            </TypographyDetail>
            {getSendIcon()}
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {getSendCurrencyText()}
            </TypographyDetail>
          </BoxDetail>
        </BoxConfirmDetail>
        
        <BoxConfirmDetail sx={{ mt: "16px" }}>
          <TypographyDetail>Receive :</TypographyDetail>
          <BoxDetail sx={{ gap: "9px" }}>
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {exchangeState.toAmount || "120"}
            </TypographyDetail>
            {getReceiveIcon()}
            <TypographyDetail sx={{ color: "#FFFFFF" }}>
              {getReceiveCurrencyText()}
            </TypographyDetail>
          </BoxDetail>
        </BoxConfirmDetail>
      </BoxConfirmRoot>
      
      <Box sx={{ mt: "34px" }}>
        <Line style={{ width: "100%", display: "block" }} />
      </Box>
      {shouldShowEmailField && (
        <BoxConfirmRoot sx={{ mt: "16px" }}>
          <TypographyDetail sx={{ fontSize: "16px" }}>Email :</TypographyDetail>
          <CustomInput
            placeholder="Please Enter Your Email"
            sx={{ mt: "12px" }}
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={formik.isSubmitting}
          />
          
                    {isAuthenticated && !user?.email && (
            <TypographyDetail sx={{ 
              fontSize: "12px", 
              color: "#60A7F8", 
              mt: 1 
            }}>
              Please complete your profile by adding your email address.
            </TypographyDetail>
          )}
          
        </BoxConfirmRoot>
      )}

      <TypographyConfirm sx={{ mt: shouldShowEmailField ? "43px" : "20px" }}>
        Exchange Conditions:
      </TypographyConfirm>

      <BoxConfirmRoot sx={{ mt: "31px", gap: "12px" }}>
        <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
          <BoxCircle>1</BoxCircle>
          <TypographyRule>
            Any Change In Exchange Rate On The Binance Exchange Gives Us The
            Right To Recalculate The Amount Of The Application.
          </TypographyRule>
        </BoxDetail>
        
        <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
          <BoxCircle>2</BoxCircle>
          <TypographyRule>
            The Rate For Your Application Will Be Fixed After 1 Confirmation
            Online.{" "}
          </TypographyRule>
        </BoxDetail>
        
        <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
          <BoxCircle>3</BoxCircle>
          <TypographyRule>
            Funds Are Credited After 20 Transaction Confirmations.{" "}
          </TypographyRule>
        </BoxDetail>
        
        <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
          <BoxCircle>4</BoxCircle>
          <TypographyRule>
            We Conduct AML Checks In Accordance With The AML Policy Of The
            Flashobmen Service.{" "}
          </TypographyRule>
        </BoxDetail>
        
        <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
          <BoxCircle>5</BoxCircle>
          <TypographyRule>
            Fill Out All Fields Of The Form Provided.{" "}
          </TypographyRule>
        </BoxDetail>
        
        <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
          <BoxCircle>6</BoxCircle>
          <TypographyRule>Click The "Make An Exchange" Button. </TypographyRule>
        </BoxDetail>
        
        <BoxDetail sx={{ gap: "13px", justifyContent: "normal" }}>
          <BoxCircle>7</BoxCircle>
          <TypographyRule>
            Read The Terms Of Exchange. If You Accept Them, Check The Appropriate
            Boxes. Pay For The Application According To The Instructions On The
            Website.{" "}
          </TypographyRule>
        </BoxDetail>

        <BoxDetail sx={{ mt: "35px", gap: "13px", justifyContent: "normal" }}>
          <CustomCheckbox 
            disableRipple 
            icon={<span />}
            name="agreedToTerms"
            checked={formik.values.agreedToTerms}
            onChange={handleCheckboxChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          <TypographyRule>
            I Agree With The{" "}
            <span style={{ color: "#60A7F8" }}>AML Policy</span> And{" "}
            <span style={{ color: "#60A7F8" }}>User Agreement</span>.
          </TypographyRule>
        </BoxDetail>
        
        {formik.touched.agreedToTerms && formik.errors.agreedToTerms && (
          <TypographyDetail sx={{ 
            color: "#f44336", 
            fontSize: "12px", 
            mt: 1,
            ml: 4
          }}>
            {formik.errors.agreedToTerms}
          </TypographyDetail>
        )}

        <CustomButton 
          onClick={() => formik.handleSubmit()}
          disabled={formik.isSubmitting || !isFormValid()}
          sx={{
            opacity: formik.isSubmitting || !isFormValid() ? 0.6 : 1,
            cursor: formik.isSubmitting || !isFormValid() ? 'not-allowed' : 'pointer'
          }}
        >
          {formik.isSubmitting ? 'Processing...' : 'Confirm'}
        </CustomButton>
      </BoxConfirmRoot>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Exchange request submitted successfully!
        </Alert>
      </Snackbar>
    </ContainerConfirm>
  );
}

export default ConfirmPageWithEmail;