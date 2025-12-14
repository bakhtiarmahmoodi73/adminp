// pages/ConfirmPageWithEmail.tsx
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';
import { setStep } from '../store/slices/exchangeSlice';

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
  
  // تعیین اینکه آیا باید فیلد ایمیل نمایش داده شود
  const shouldShowEmailField = !(isAuthenticated && user?.email);
  
  // تعیین height بر اساس وضعیت
  const containerHeight = shouldShowEmailField ? "909px" : "819px";

  // تابع اعتبارسنجی با Zod
  const validateForm = (values: ConfirmFormData) => {
    const errors: Partial<ConfirmFormData> = {};

    // اعتبارسنجی ایمیل فقط اگر باید نمایش داده شود - با استفاده از Zod
    if (shouldShowEmailField) {
      // ایجاد Zod schema برای ایمیل
      const emailSchema = z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address');
      
      const result = emailSchema.safeParse(values.email);
      
      if (!result.success) {
        errors.email = result.error.issues[0]?.message || 'Invalid email';
      }
    }

    // اعتبارسنجی چک‌باکس (همانند کد اصلی)
    if (!values.agreedToTerms) {
      // errors.agreedToTerms = 'You must agree to the terms and conditions';
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
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // تعیین به کدام صفحه هدایت شود بر اساس نوع exchange
        if (exchangeState.fromCurrency === 'tether' && exchangeState.toCurrency === 'permoney') {
          // تتر به پرفکت مانی -> نمایش فلو send
          navigate('/flow/send'); // باید این route را در App.tsx تعریف کنید
        } else if (exchangeState.fromCurrency === 'permoney' && exchangeState.toCurrency === 'tether') {
          // پرفکت مانی به تتر -> نمایش فلو receive
          navigate('/flow/receive'); // باید این route را در App.tsx تعریف کنید
        } else {
          // حالت پیش‌فرض
          navigate('/complete');
        }
        
        // تغییر step به 3 (Complete)
        dispatch(setStep(3));
        
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
    if (isAuthenticated && user?.email) {
      formik.setFieldValue('email', user.email);
    }
  }, [isAuthenticated, user]);

  // تعیین آیکون و متن بر اساس ارز
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

      {/* بخش ایمیل با منطق شرطی */}
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
          
          {/* پیام راهنما */}
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