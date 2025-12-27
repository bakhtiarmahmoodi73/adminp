import { CardTableDashboard, TypographyProfile } from "../components/styled/HompageStylee";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
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

const nameSchema = z.object({
  name: z.string().min(1, "Name is required"),
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

const ProfilePage: React.FC = () => {
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

  const formik = useFormik<RegisterFormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: () => ({}),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let hasError = false;

      const nErr = validateName(values.name);
      const eErr = validateEmail(values.email);
      const pErr = validatePassword(values.password);

      if (nErr) { setNameError(nErr); setNameTouched(true); hasError = true; }
      if (eErr) { setEmailError(eErr); setEmailTouched(true); hasError = true; }
      if (pErr) { setPasswordError(pErr); setPasswordTouched(true); hasError = true; }

      if (hasError) return;

      setIsSubmitting(true);
      try {
        console.log("Register data:", values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/auth/login");
      } catch (err) {
        console.error("Registration failed:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (nameTouched) setNameError(validateName(e.target.value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (emailTouched) setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (passwordTouched) setPasswordError(validatePassword(e.target.value));
  };

  const handleBlurField = (field: "name" | "email" | "password") => (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      if (field === "name") { setNameTouched(true); setNameError(validateName(value)); }
      if (field === "email") { setEmailTouched(true); setEmailError(validateEmail(value)); }
      if (field === "password") { setPasswordTouched(true); setPasswordError(validatePassword(value)); }
    }
    formik.handleBlur(e);
  };

  const handleClearField = (field: "name" | "email") => (e: React.MouseEvent) => {
    e.preventDefault();
    formik.setFieldValue(field, "");
    if (field === "name") { setNameTouched(false); setNameError(""); }
    if (field === "email") { setEmailTouched(false); setEmailError(""); }
  };

  const handleCloseError = (): void => {
    setShowError(false);
    dispatch(clearError());
  };

  const getCardHeight = () => {
    let baseHeight = 0;
    const errorCount = [nameError, emailError, passwordError].filter(Boolean).length;
    return `${baseHeight + (errorCount * 35)}px`;
  };

  const hasNameError = nameTouched && Boolean(nameError);
  const hasEmailError = emailTouched && Boolean(emailError);
  const hasPasswordError = passwordTouched && Boolean(passwordError);

  return (
    <CardTableDashboard>
      <TypographyProfile>Edit Profile</TypographyProfile>

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
            width: "100%",
            height: getCardHeight(),
            borderRadius: "30px",
            marginTop: "64px",
            marginBottom: "152px",
            backgroundColor: "#2A3342",
          }}
        >
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            

            <Box sx={{ mt: "0px", ml: "39px", mr: "36px" }}>
              <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>
                Name:
              </Typography>
              <TextField
                name="name"
                placeholder="Enter Your Name"
                value={formik.values.name}
                onChange={handleNameChange}
                onBlur={handleBlurField("name")}
                error={hasNameError}
                helperText={hasNameError && nameError}
                fullWidth
                sx={textFieldStyle(hasNameError)}
                InputProps={{
                  endAdornment: hasNameError && (
                    <InputAdornment position="end" sx={adornmentStyle}>
                      <Box component="button" type="button" onClick={handleClearField("name")} sx={iconButtonStyle}>
                        <CloseIcon style={{ width: "20px", height: "20px" }} />
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ mt: hasNameError ? "47px" : "19px", ml: "39px", mr: "36px" }}>
              <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>
                Email:
              </Typography>
              <TextField
                name="email"
                type="email"
                placeholder="Please Enter Your Email"
                value={formik.values.email}
                onChange={handleEmailChange}
                onBlur={handleBlurField("email")}
                error={hasEmailError}
                helperText={hasEmailError && emailError}
                fullWidth
                sx={textFieldStyle(hasEmailError)}
                InputProps={{
                  endAdornment: hasEmailError && (
                    <InputAdornment position="end" sx={adornmentStyle}>
                      <Box component="button" type="button" onClick={handleClearField("email")} sx={iconButtonStyle}>
                        <CloseIcon style={{ width: "20px", height: "20px" }} />
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mt: hasEmailError ? "47px" : "19px", ml: "39px", mr: "36px" }}>
              <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>
                Password:
              </Typography>
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Please Enter Your Password"
                value={formik.values.password}
                onChange={handlePasswordChange}
                onBlur={handleBlurField("password")}
                error={hasPasswordError}
                helperText={hasPasswordError && passwordError}
                fullWidth
                sx={textFieldStyle(hasPasswordError)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={adornmentStyle}>
                      <Box 
                        component="button" 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        sx={iconButtonStyle}
                      >
                        <EyeOpenIcon 
                          style={{ 
                            width: "20px", 
                            height: "20px",
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

            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                mt: hasPasswordError ? "62px" : "31px",
                backgroundColor: "#1D8D94",
                width: "485px",
                height: "60px",
                marginX: "39px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                textTransform: "none",
                boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
                "&:hover": { backgroundColor: "#16666c" },
                "&:disabled": { backgroundColor: "#1D8D94", opacity: 0.7 },
              }}
            >
            Confirm
            </Button>

           
          </Box>
        </Card>
      </Box>
    </CardTableDashboard>
  );
};

// Styles Helpers to keep the code clean
const textFieldStyle = (hasError: boolean) => ({
  "& .MuiOutlinedInput-root": {
    height: "57px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#FFFFFF",
    backgroundColor: "#242C39",
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: hasError ? "#d32f2f" : "#1D8D94" },
    "&.Mui-focused fieldset": { borderColor: hasError ? "#d32f2f" : "#1D8D94" },
  },
  "& .MuiInputBase-input::placeholder": { color: "#FFFFFF !important", opacity: 1 },
  "& .MuiFormHelperText-root": { color: "#d32f2f", mt: "4px", fontSize: "12px" },
});

const adornmentStyle = {
  position: "absolute",
  right: "14px",
  top: "50%",
  transform: "translateY(-50%)",
};

const iconButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  outline: "none"
};

export default ProfilePage;