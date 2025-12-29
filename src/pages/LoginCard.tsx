import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Box,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { loginUser, clearError } from "../store/slices/authSlice";
import CloseIcon from "../assets/images/errorcircle/Frame (2).svg?react";
import EyeOpenIcon from "../assets/images/passwordicon/Frame (3).svg?react";
import {
  LoginCardContainer,
  FormBox,
  LabelText,
  LoginButton,
  TypographyLogin,
} from "../components/styled/LoginStyled";

const loginSchema = z.object({
  email: z.string().min(1, "The email is incorrect").email("The Email Is Incorrect"),
  password: z.string().min(1, "Password is required").min(6, "The Password Is Incorrect"),
});

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  const formik = useFormik<LoginFormData>({
    initialValues: { email: "", password: "", rememberMe: false },
    validate: (values) => {
      const result = loginSchema.safeParse(values);
      if (result.success) return {};
      const errors: any = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser({ email: values.email, password: values.password })).unwrap();
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
  });

  const handleCloseError = useCallback(() => {
    setShowError(false);
    dispatch(clearError());
  }, [dispatch]);

  const handleTogglePasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }, []);

  const handleClearEmail = useCallback(() => {
    formik.setFieldValue("email", "");
    formik.setFieldTouched("email", false);
  }, [formik]);

  const hasEmailError = useMemo(() => formik.touched.email && Boolean(formik.errors.email), [formik.touched.email, formik.errors.email]);
  const hasPasswordError = useMemo(() => formik.touched.password && Boolean(formik.errors.password), [formik.touched.password, formik.errors.password]);
  const cardHeight = useMemo(() => (hasPasswordError ? "607px" : "568px"), [hasPasswordError]);

  return (
    <Box sx={{ mt: "157px", height: cardHeight, mb: "152px" }}>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseError} severity="error">{error}</Alert>
      </Snackbar>

      <LoginCardContainer>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TypographyLogin sx={{ width: "100%", maxWidth: "91px", mt: "32px", mx: "auto", display: "block" }}>
            Login
          </TypographyLogin>

          <LabelText sx={{ mt: "31px" }}>Email&nbsp;:</LabelText>
          <FormBox>
            <TextField
              fullWidth
              type="email"
              placeholder="Please Enter Your Email"
              {...formik.getFieldProps("email")}
              error={hasEmailError}
              helperText={hasEmailError && formik.errors.email}
              sx={{
                "& .MuiOutlinedInput-input": { paddingRight: hasEmailError ? "40px !important" : "14px !important" },
                "& .MuiInputBase-input::placeholder": { color: "#FFFFFF !important", opacity: 1 },
                "& .MuiFormHelperText-root": { textAlign: "right", m: "5px 0 0 0", fontSize: "14px" },
              }}
              InputProps={{
                endAdornment: hasEmailError && (
                  <InputAdornment position="end" sx={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
                    <Box onClick={handleClearEmail} component="button" type="button" sx={{ cursor: "pointer", background: "none", border: "none", p: 0, display: "flex" }}>
                      <CloseIcon style={{ width: "20px", height: "20px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </FormBox>

          <LabelText sx={{ mt: hasEmailError ? "47px" : "27px" }}>Password&nbsp;:</LabelText>
          <FormBox>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Please Enter Your Password"
              {...formik.getFieldProps("password")}
              error={hasPasswordError}
              helperText={hasPasswordError && formik.errors.password}
              sx={{
                "& .MuiInputBase-input::placeholder": { color: "#FFFFFF !important", opacity: 1 },
                "& .MuiFormHelperText-root": { textAlign: "right", m: "5px 0 0 0", fontSize: "14px" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
                    <Box 
                      onClick={handleTogglePasswordVisibility} 
                      component="button" 
                      type="button" 
                      sx={{ 
                        cursor: "pointer", 
                        background: "none", 
                        border: "none", 
                        p: 0, 
                        display: "flex",
                        position: "relative", 
                        alignItems: "center",
                        justifyContent: "center",
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: !showPassword ? "100%" : "0%", 
                          height: "1.5px",
                          backgroundColor: "#ABABAB",
                          transform: "rotate(-45deg)",
                          transition: "width 0.2s ease-in-out",
                          pointerEvents: "none",
                        }
                      }}
                    >
                      <EyeOpenIcon style={{ width: "16px", height: "16px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </FormBox>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: hasPasswordError ? "62px" : "22px" }}>
            <Box 
              component="label"
              sx={{ display: "flex", alignItems: "center", ml: "39px", cursor: "pointer" }}
              onClick={() => formik.setFieldValue("rememberMe", !formik.values.rememberMe)}
            >
              <Box sx={{ 
                width: "18px", 
                height: "18px", 
                borderRadius: "3px", 
                border: "1px solid #5B5F5E", 
                backgroundColor: formik.values.rememberMe ? "#1D8D94" : "#242C39", 
                mt: "6px", 
                mr: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                '&::after': formik.values.rememberMe ? {
                    content: '"✓"',
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold"
                } : {}
              }} />
              <LabelText sx={{ ml: "6px", mt: 0, cursor: "pointer" }}>Keep Me Login</LabelText>
            </Box>
            <Link to="/auth/forgot-password" style={{ marginRight: "36px", color: "#1D8D94", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}>
              Forgot Your Password?
            </Link>
          </Box>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>

          <Box sx={{ textAlign: "center", mt: "27px", mb: "48px" }}>
            <span style={{ color: "#ABABAB", fontWeight: 700 }}>Dont Have An Account? &nbsp;</span>
            <Link to="/auth/register" style={{ color: "#1D8D94", fontSize: "16px", textDecoration: "none", fontWeight: 700 }}>
              Register
            </Link>
          </Box>
        </Box>
      </LoginCardContainer>
    </Box>
  );
};

export default LoginCard;