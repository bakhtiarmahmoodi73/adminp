import React, { useState, useEffect, useMemo, useCallback } from "react";
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

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "The email is incorrect").email("The email is incorrect"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth);

  const [showError, setShowError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  const formik = useFormik<RegisterFormData>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const result = registerSchema.safeParse(values);
      if (result.success) return {};
      const errors: any = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Register data:", values);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/auth/login");
      } catch (err) {
        console.error("Registration failed:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleTogglePasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }, []);

  const handleClearField = useCallback((fieldName: keyof RegisterFormData) => {
    formik.setFieldValue(fieldName, "");
    formik.setFieldTouched(fieldName, false);
  }, [formik]);

  const handleCloseError = () => {
    setShowError(false);
    dispatch(clearError());
  };

  const hasNameError = formik.touched.name && Boolean(formik.errors.name);
  const hasEmailError = formik.touched.email && Boolean(formik.errors.email);
  const hasPasswordError = formik.touched.password && Boolean(formik.errors.password);

  const cardHeight = useMemo(() => {
    let baseHeight = 606;
    const errorCount = [hasNameError, hasEmailError, hasPasswordError].filter(Boolean).length;
    
    if (errorCount === 1) return `${baseHeight + 30}px`;
    if (errorCount === 2) return `${baseHeight + 60}px`;
    if (errorCount === 3) return `${baseHeight + 100}px`;
    return `${baseHeight}px`;
  }, [hasNameError, hasEmailError, hasPasswordError]);

  const whitePlaceholderStyle = {
    "& .MuiInputBase-input::placeholder": {
      color: "#FFFFFF",
      opacity: 1, 
    },
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseError} severity="error">{error}</Alert>
      </Snackbar>

      <Card
        sx={{
          boxSizing: "border-box",
          maxWidth: "560px",
          width: "100%",
          minHeight: "606px",
          height: cardHeight,
          borderRadius: "30px",
          marginTop: "157px",
          marginBottom: "152px",
          backgroundColor: "#2A3342",
        }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TypographyLogin sx={{ width: "100%", maxWidth: "138px", mx: "auto", display: "block", mt: "32px" }}>
            Register
          </TypographyLogin>
          <Box sx={{ mt: "31px", ml: "39px", mr: "36px" }}>
            <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>Name:</Typography>
            <TextField
              fullWidth
              placeholder="Enter Your Name"
              {...formik.getFieldProps("name")}
              error={hasNameError}
              helperText={hasNameError && formik.errors.name}
              sx={whitePlaceholderStyle}
              InputProps={{
                endAdornment: hasNameError && (
                  <ClearButton onClick={() => handleClearField("name")} />
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: hasNameError ? "47px" : "19px", ml: "39px", mr: "36px" }}>
            <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>Email:</Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="Please Enter Your Email"
              {...formik.getFieldProps("email")}
              error={hasEmailError}
              helperText={hasEmailError && formik.errors.email}
              sx={whitePlaceholderStyle}
              InputProps={{
                endAdornment: hasEmailError && (
                  <ClearButton onClick={() => handleClearField("email")} />
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: hasEmailError ? "47px" : "19px", ml: "39px", mr: "36px" }}>
            <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>Password:</Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Please Enter Your Password"
              {...formik.getFieldProps("password")}
              error={hasPasswordError}
              helperText={hasPasswordError && formik.errors.password}
              sx={whitePlaceholderStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
                    <Box onClick={handleTogglePasswordVisibility} component="button" type="button" sx={{ cursor: "pointer", background: "none", border: "none", p: 0, outline: "none" }}>
                      <EyeOpenIcon style={{ width: "20px", height: "20px", opacity: showPassword ? 1 : 0.7 }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            sx={{
              mt: hasPasswordError ? "62px" : "31px",
              backgroundColor: "#1D8D94",
              width: "485px",
              height: "60px",
              mx: "39px",
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
            {formik.isSubmitting ? "Registering..." : "Register"}
          </Button>

          <Typography align="center" sx={{ fontWeight: 700, mt: "28px", mb: "48px", color: "#ABABAB" }}>
            Have An Account?{" "}
            <Link onClick={() => navigate("/auth/login")} sx={{ textDecoration: "none", fontWeight: 700, color: "#1D8D94", cursor: "pointer" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};


 const ClearButton = ({ onClick }: { onClick: () => void }) => (
  <InputAdornment position="end" sx={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
    <Box onClick={onClick} component="button" type="button" sx={{ cursor: "pointer", background: "none", border: "none", p: 0, display: "flex" }}>
      <CloseIcon style={{ width: "20px", height: "20px" }} />
    </Box>
  </InputAdornment>
);

export default RegisterPage;