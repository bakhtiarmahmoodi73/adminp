// src/pages/RegisterPage/RegisterPage.tsx
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { clearError } from "../store/slices/authSlice";
import CloseIcon from "../assets/images/errorcircle/Frame (2).svg?react";
import EyeOpenIcon from "../assets/images/passwordicon/Frame (3).svg?react";
import { TypographyLogin } from "../components/styled/LoginStyled";

// تعریف schema برای اعتبارسنجی با Zod
const nameSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
  
});

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "The email is incorrect")
    .email("The email is incorrect"),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
});

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const [showError, setShowError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nameTouched, setNameTouched] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // توابع اعتبارسنجی
  const validateName = (value: string) => {
    const result = nameSchema.safeParse({ name: value });
    if (!result.success) {
      return result.error.issues[0]?.message || "Name is required";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    const result = emailSchema.safeParse({ email: value });
    if (!result.success) {
      return result.error.issues[0]?.message || "The email is incorrect";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    const result = passwordSchema.safeParse({ password: value });
    if (!result.success) {
      return result.error.issues[0]?.message || "Password is required";
    }
    return "";
  };

  // Formik configuration
  const formik = useFormik<RegisterFormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: () => {
      return {};
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let hasError = false;
      
      // اعتبارسنجی Name
      if (!values.name.trim()) {
        setNameTouched(true);
        const nameValidationError = validateName(values.name);
        setNameError(nameValidationError);
        if (nameValidationError) hasError = true;
      }
      
      // اعتبارسنجی Email
      if (!values.email.trim()) {
        setEmailTouched(true);
        const emailValidationError = validateEmail(values.email);
        setEmailError(emailValidationError);
        if (emailValidationError) hasError = true;
      }
      
      // اعتبارسنجی Password
      if (!values.password.trim()) {
        setPasswordTouched(true);
        const passwordValidationError = validatePassword(values.password);
        setPasswordError(passwordValidationError);
        if (passwordValidationError) hasError = true;
      }
      
      if (hasError) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // اینجا منطق ثبت‌نام خود را اضافه کنید
        console.log("Register data:", values);
        
        // شبیه‌سازی تاخیر برای ثبت‌نام
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // بعد از ثبت‌نام موفق، به صفحه لاگین هدایت شود
        navigate("/auth/login");
        
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Event handlers
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (nameTouched) {
      const error = validateName(e.target.value);
      setNameError(error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (emailTouched) {
      const error = validateEmail(e.target.value);
      setEmailError(error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (passwordTouched) {
      const error = validatePassword(e.target.value);
      setPasswordError(error);
    }
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      setNameTouched(true);
      const error = validateName(value);
      setNameError(error);
    } else {
      setNameTouched(false);
      setNameError("");
    }
    formik.handleBlur(e);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      setEmailTouched(true);
      const error = validateEmail(value);
      setEmailError(error);
    } else {
      setEmailTouched(false);
      setEmailError("");
    }
    formik.handleBlur(e);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      setPasswordTouched(true);
      const error = validatePassword(value);
      setPasswordError(error);
    } else {
      setPasswordTouched(false);
      setPasswordError("");
    }
    formik.handleBlur(e);
  };

  const handleClearName = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    formik.setFieldValue("name", "");
    setNameTouched(false);
    setNameError("");
  };

  const handleClearEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    formik.setFieldValue("email", "");
    setEmailTouched(false);
    setEmailError("");
  };

  const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    // اعتبارسنجی Name
    if (!formik.values.name.trim()) {
      setNameTouched(true);
      const nameValidationError = validateName(formik.values.name);
      setNameError(nameValidationError);
      if (nameValidationError) hasError = true;
    }
    
    // اعتبارسنجی Email
    if (!formik.values.email.trim()) {
      setEmailTouched(true);
      const emailValidationError = validateEmail(formik.values.email);
      setEmailError(emailValidationError);
      if (emailValidationError) hasError = true;
    }
    
    // اعتبارسنجی Password
    if (!formik.values.password.trim()) {
      setPasswordTouched(true);
      const passwordValidationError = validatePassword(formik.values.password);
      setPasswordError(passwordValidationError);
      if (passwordValidationError) hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    formik.handleSubmit();
  };

  const handleCloseError = (): void => {
    setShowError(false);
    dispatch(clearError());
  };

  const handleLoginClick = (): void => {
    navigate("/auth/login");
  };

  // محاسبه ارتفاع کارد بر اساس تعداد خطاها
  const getCardHeight = () => {
    let baseHeight = 606;
    
    const errors = [nameError, emailError, passwordError].filter(Boolean);
    
    if (errors.length === 1) {
      return `${baseHeight + 30}px`;
    } else if (errors.length === 2) {
      return `${baseHeight + 60}px`;
    } else if (errors.length === 3) {
      return `${baseHeight + 100}px`;
    }
    
    return `${baseHeight}px`;
  };

  const hasNameError = nameTouched && Boolean(nameError);
  const hasEmailError = emailTouched && Boolean(emailError);
  const hasPasswordError = passwordTouched && Boolean(passwordError);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
      
      <Card
        sx={{
          boxSizing: "border-box",
          maxWidth: "560px",
          width: "100%",
          minHeight: "606px",
          height: getCardHeight(),
          borderRadius: "30px",
          marginTop: "157px",
          marginBottom: "152px",
          backgroundColor: "#2A3342",
          // padding:"1px",
          // overflow: "hidden",
        }}
      >
        <Box component="form" onSubmit={handleFormSubmit} noValidate>
          <TypographyLogin
            sx={{
              width: "100%",
              maxWidth: "138px",
              marginX: "auto",
              display: "block",
              marginTop: "32px",
            }}
          >
            Register
          </TypographyLogin>

          {/* فیلد Name */}
          <Box sx={{ mt: "31px", ml: "39px", mr: "36px" }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#ABABAB",
                fontSize: "16px",
                mb: "15px",
              }}
            >
              Name:
            </Typography>
            <TextField
              name="name"
              placeholder="Enter Your Name"
              value={formik.values.name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              error={hasNameError}
              helperText={hasNameError && nameError}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "57px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  backgroundColor: "#242C39",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: hasNameError ? "#d32f2f" : "#1D8D94",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: hasNameError ? "#d32f2f" : "#1D8D94",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#FFFFFF !important",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-input": {
                  paddingRight: hasNameError
                    ? "40px !important"
                    : "14px !important",
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: "4px",
                  fontSize: "12px",
                  fontWeight: 400,
                },
              }}
              InputProps={{
                endAdornment: hasNameError && (
                  <InputAdornment
                    position="end"
                    sx={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginRight: 0,
                    }}
                  >
                    <Box
                      onClick={handleClearName}
                      sx={{ 
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Clear name"
                      component="button"
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <CloseIcon style={{ width: "20px", height: "20px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* فیلد Email */}
          <Box sx={{ 
            mt: hasNameError ? "47px" : "19px", 
            ml: "39px", 
            mr: "36px" 
          }}>
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
              name="email"
              type="email"
              placeholder="Please Enter Your Email"
              value={formik.values.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={hasEmailError}
              helperText={hasEmailError && emailError}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "57px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  backgroundColor: "#242C39",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: hasEmailError ? "#d32f2f" : "#1D8D94",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: hasEmailError ? "#d32f2f" : "#1D8D94",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#FFFFFF !important",
                  opacity: 1,
                },
                "& .MuiOutlinedInput-input": {
                  paddingRight: hasEmailError
                    ? "40px !important"
                    : "14px !important",
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: "4px",
                  fontSize: "12px",
                  fontWeight: 400,
                },
              }}
              InputProps={{
                endAdornment: hasEmailError && (
                  <InputAdornment
                    position="end"
                    sx={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginRight: 0,
                    }}
                  >
                    <Box
                      onClick={handleClearEmail}
                      sx={{ 
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Clear email"
                      component="button"
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <CloseIcon style={{ width: "20px", height: "20px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* فیلد Password */}
          <Box sx={{ 
            mt: hasEmailError ? "47px" : "19px", 
            ml: "39px", 
            mr: "36px" 
          }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#ABABAB",
                fontSize: "16px",
                mb: "15px",
              }}
            >
              Password:
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Please Enter Your Password"
              value={formik.values.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={hasPasswordError}
              helperText={hasPasswordError && passwordError}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "57px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  backgroundColor: "#242C39",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: hasPasswordError ? "#d32f2f" : "#1D8D94",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: hasPasswordError ? "#d32f2f" : "#1D8D94",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#FFFFFF !important",
                  opacity: 1,
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: "4px",
                  fontSize: "12px",
                  fontWeight: 400,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginRight: 0,
                    }}
                  >
                    <Box
                      onClick={handleTogglePasswordVisibility}
                      sx={{ 
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                      }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      component="button"
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        outline: 'none',
                      }}
                    >
                      {/* فقط از EyeOpenIcon استفاده می‌کنیم */}
                      <EyeOpenIcon 
                        style={{ 
                          width: "20px", 
                          height: "20px",
                          // می‌توانید opacity را تغییر دهید یا رنگ متفاوت بدهید
                          opacity: showPassword ? 1 : 0.7,
                          filter: showPassword ? 'none' : 'brightness(0.8)',
                        }} 
                      />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* دکمه ثبت‌نام */}
          <Button
            type="submit"
            disabled={isSubmitting}
            sx={{
              mt: hasPasswordError ? "62px" : "31px",
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
              "&:hover": {
                backgroundColor: "#16666c",
              },
              "&:disabled": {
                backgroundColor: "#1D8D94",
                opacity: 0.7,
                cursor: "not-allowed",
              },
            }}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          {/* لینک برگشت به لاگین */}
          <Typography
            align="center"
            sx={{
              fontWeight: 700,
              mt: "28px",
              mb: "48px",
              color: "#ABABAB",
            }}
          >
            Have An Account?{" "}
            <Link
              component="button"
              type="button"
              onClick={handleLoginClick}
              sx={{
                all: "unset",
                textDecoration: "none",
                fontWeight: 700,
                color: "#1D8D94",
                cursor: "pointer",
                textTransform: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default RegisterPage;