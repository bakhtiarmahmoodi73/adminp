import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { sendResetPasswordEmail, clearError } from "../store/slices/forgotPasswordSlice";
import closeImg from "../assets/images/errorcircle/Frame (2).svg"
import { TypographyLogin } from "../components/styled/LoginStyled";

// تعریف Schema با Zod
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "The email is incorrect")
    .email("The email is incorrect"),
});

// تعریف تایپ از روی Schema
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showError, setShowError] = React.useState<boolean>(false);

  const { isLoading, error, success } = useSelector((state: RootState) => state.forgotPassword);

  // اگر ایمیل با موفقیت ارسال شد، به صفحه تغییر رمز هدایت شو
  React.useEffect(() => {
    if (success) {
      navigate("/auth/change-password");
    }
  }, [success, navigate]);

  // نمایش خطا هنگام تغییر
  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // Formik configuration با Zod
  const formik = useFormik<ForgotPasswordFormData>({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const result = forgotPasswordSchema.safeParse(values);
      
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          errors[path] = issue.message;
        });
        return errors;
      }
      
      return {};
    },
    onSubmit: async (values) => {
      try {
        await dispatch(sendResetPasswordEmail(values.email)).unwrap();
        console.log("Reset password email sent to:", values.email);
      } catch (error) {
        console.error("Failed to send reset email:", error);
      }
    },
  });

  const handleCloseError = (): void => {
    setShowError(false);
    dispatch(clearError());
  };

  const handleClearEmail = (): void => {
    formik.setFieldValue("email", "");
    formik.setFieldTouched("email", false);
  };

  // بررسی آیا ایمیل خطا دارد و کاربر فیلد را لمس کرده
  const hasEmailError = formik.touched.email && Boolean(formik.errors.email);

  return (
    <>
      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Card
        sx={{
          // display: "block",
          maxWidth: "560px",
          width: "100%",
          height:hasEmailError ? "405px" : "366px",
          borderRadius: "30px",
          marginTop: "234px",
          marginBottom: "152px",
          marginX: "auto",
          backgroundColor: "#2A3342",
          
        }}
      >
         
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
         

         <TypographyLogin  sx={{
              width: "100%",
              maxWidth: "271px",
              marginTop: "32px",
              marginX: "auto",
              display: "block",
            }}>Forget Password</TypographyLogin>

       {/* فیلد Email */}
<Box sx={{ mt: "55px", ml: "38px", mr: "36px" }}>
  <Typography
    sx={{
      fontWeight: 700,
      color: "#ABABAB",
      fontSize: "16px",
      mb: "15px",
    }}
  >
    Email:
  </Typography>

  <TextField
    fullWidth
    name="email"
    type="email"
    placeholder="Please Enter Your Email"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={hasEmailError}
    helperText={hasEmailError && "The Email Entered Is Invalid"}
    sx={{
      // ================================
      // حذف رنگ آبی Autofill مرورگر
      // ================================
      "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #242C39 inset !important",
        WebkitTextFillColor: "#FFFFFF !important",
        caretColor: "#FFFFFF",
      },

      "& .MuiOutlinedInput-root": {
        height: "57px",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: 700,
        color: "#FFFFFF",
        backgroundColor: "#242C39",

        // جلوگیری از رنگ آبی هنگام فوکوس
        "&.Mui-focused": {
          backgroundColor: "#242C39 !important",
        },

        // حالت خطا
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "#F66066 !important",
          borderWidth: "2px !important",
        },

        // حالت نرمال
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#1D8D94",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#1D8D94",
        },
      },

      // Placeholder
      "& .MuiInputBase-input::placeholder": {
        color: "#FFFFFF !important",
        opacity: 1,
      },

      // ================================
      // استایل متن ارور زیر اینپوت
      // ================================
      "& .MuiFormHelperText-root": {
        color: "#F66066",
        marginLeft: "0px",
        marginTop: "5px",
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "IranSans", // اگر فونت می‌خوای
      },
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {hasEmailError && (
            <IconButton
              onClick={handleClearEmail}
              edge="end"
              sx={{
                width: "20px",
                height: "20px",
                mr: "20px",
                p: 0,
                background: "none",
              }}
            >
              <img
                src={
                  typeof closeImg === "string"
                    ? closeImg
                    : (closeImg as any).src
                }
                alt="clear"
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          )}
        </InputAdornment>
      ),
    }}
  />
</Box>


          {/* دکمه Confirm */}
         <Button
    type="submit"
    disabled={isLoading}
    disableRipple
    disableElevation
    sx={{
      mt:hasEmailError ? "46px" : "15px",
        backgroundColor: "#1D8D94",
        width: "485px",
        height: "60px",
        marginLeft: "39px",
        marginRight: "36px",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: 700,
        color: "#FFFFFF",
        textTransform: "none",
        boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
        '&:hover': {
            backgroundColor: "#16666c",
            boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
        },
        '&:focus': {
            outline: 'none',
        },
        '&:active': {
            transform: 'none',
            boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
        },
        '&.Mui-disabled': {
            backgroundColor: "inherit",
            color: "inherit",
            boxShadow: "none",
        }
    }}
>
    {isLoading ? "Sending..." : "Confirm"}
</Button>
        </Box>
      </Card>
    </>
  );
};

export default ForgotPasswordPage;