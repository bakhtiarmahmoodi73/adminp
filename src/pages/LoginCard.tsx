import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Box,
  TextField,
  InputAdornment,
  Alert,
  Snackbar,
  Typography,
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
    .min(6, "The Password Is Incorrect"),
});

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showError, setShowError] = React.useState<boolean>(false);
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [emailTouched, setEmailTouched] = React.useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

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

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: () => {
      return {};
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let hasError = false;
      
      if (!values.email.trim()) {
        setEmailTouched(true);
        const emailValidationError = validateEmail(values.email);
        setEmailError(emailValidationError);
        if (emailValidationError) hasError = true;
      }
      
      if (!values.password.trim()) {
        setPasswordTouched(true);
        const passwordValidationError = validatePassword(values.password);
        setPasswordError(passwordValidationError);
        if (passwordValidationError) hasError = true;
      }
      
      if (hasError) {
        return;
      }
      
      try {
        await dispatch(
          loginUser({
            email: values.email,
            password: values.password,
          })
        ).unwrap();
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

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

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setEmailTouched(true);
      const error = validateEmail(e.target.value);
      setEmailError(error);
    }
    formik.handleBlur(e);
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setPasswordTouched(true);
      const error = validatePassword(e.target.value);
      setPasswordError(error);
    }
    formik.handleBlur(e);
  };

  const handleCloseError = (): void => {
    setShowError(false);
    dispatch(clearError());
  };

  const handleClearEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    formik.setFieldValue("email", "");
    setEmailTouched(false);
    setEmailError("");
    
    if (passwordTouched) {
      const error = validatePassword(formik.values.password);
      setPasswordError(error);
    }
  };

  const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    if (!formik.values.email.trim()) {
      setEmailTouched(true);
      const emailValidationError = validateEmail(formik.values.email);
      setEmailError(emailValidationError);
      if (emailValidationError) hasError = true;
    }
    
    if (!formik.values.password.trim()) {
      setPasswordTouched(true);
      const passwordValidationError = validatePassword(formik.values.password);
      setPasswordError(passwordValidationError);
      if (passwordValidationError) hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    dispatch(
      loginUser({
        email: formik.values.email,
        password: formik.values.password,
      })
    );
  };

  const hasEmailError = emailTouched && Boolean(emailError);
  const hasPasswordError = passwordTouched && Boolean(passwordError);

  const getCardHeight = () => {
    if (hasPasswordError) return "607px";
    return "568px";
  };

  return (
    <Box
      sx={{
        mt:"157px",
        height: getCardHeight(),
        mb:"152px"
      }}
    >
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
      <LoginCardContainer>
        <Box component="form" onSubmit={handleFormSubmit} noValidate>
          <TypographyLogin
            sx={{
              width: "100%",
              maxWidth: "91px",
              marginTop: "32px",
              marginX: "auto",
              display: "block",
            }}
          >
            Login
          </TypographyLogin>
          <LabelText sx={{ mt: "31px" }}>Email&nbsp;:</LabelText>

          <FormBox>
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
                "& .MuiOutlinedInput-input": {
                  paddingRight: hasEmailError
                    ? "40px !important"
                    : "14px !important",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#FFFFFF !important",
                  opacity: 1,
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
                    }}
                  >
                    <Box
                      onClick={handleClearEmail}
                      sx={{ cursor: "pointer" }}
                      aria-label="Clear email"
                      component="button"
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CloseIcon style={{ width: "20px", height: "20px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </FormBox>

          <LabelText sx={{ mt: hasEmailError ? "47px" : "27px" }}>
            Password&nbsp;:
          </LabelText>

          <FormBox>
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Please Enter Your Password"
              value={formik.values.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={hasPasswordError}
              helperText={hasPasswordError && passwordError}
              fullWidth
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "#FFFFFF !important",
                  opacity: 1,
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
                    }}
                  >
                    <Box
                      onClick={handleTogglePasswordVisibility}
                      sx={{ cursor: "pointer" }}
                      aria-label="Toggle password visibility"
                      component="button"
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <EyeOpenIcon style={{ width: "16px", height: "16px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </FormBox>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: hasPasswordError ? "62px" : "22px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", ml: "39px" }}>
              <Box
                sx={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "3px",
                  border: "1px solid #5B5F5E",
                  backgroundColor: "#242C39",
                  mt: "6px",
                  mr: "6px",
                }}
              />
              <LabelText sx={{ ml: "6px", mt: 0 }}>Keep Me Login</LabelText>
            </Box>

            <Link
              to="/auth/forgot-password"
              style={{
                marginRight: "36px",
                color: "#1D8D94",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0%",
              }}
            >
              Forgot Your Password?
            </Link>
          </Box>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>

          <Typography
            align="center"
            sx={{
              mt: "27px",
              mb: "48px",
              color: "#ABABAB",
              fontWeight: 700,
            }}
          >
            Dont Have An Account? &nbsp;
            <Link
              to="/auth/register"
              style={{
                color: "#1D8D94",
                fontSize: "16px",
                textDecoration: "none",
                background: "none",
                border: "none",
                padding: 0,
                font: "inherit",
                cursor: "pointer",
                fontWeight: "inherit",
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </LoginCardContainer>
    </Box>
  );
};
export default LoginCard;