import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import log from "../assets/images/logo/login.svg";
import {
  Box,
  TextField, 
  InputAdornment,
  Alert,
  Snackbar,
  Typography, 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { loginUser, clearError } from "../store/slices/authSlice";
import closeImg from "../assets/images/errorcircle/Frame (2).svg";
import eyeOpenIcon from "../assets/images/passwordicon/Frame (3).svg";
import {
  LoginCardContainer,
  FormBox,
  LabelText,
  LoginButton,
  CustomLink,
} from "../components/styled/LoginStyled";

// تعریف Schema با Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "The email is incorrect")
    .email("The email is incorrect"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "The Password Is Incorrect"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showError, setShowError] = React.useState<boolean>(false);

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

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const result = loginSchema.safeParse(values);
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

  const handleRegisterClick = (): void => {
    navigate("/auth/register");
  };

  const handleForgotPasswordClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    navigate("/auth/forgot-password");
  };

  const handleCloseError = (): void => {
    setShowError(false);
    dispatch(clearError());
  };

  const handleClearEmail = (): void => {
    formik.setFieldValue("email", "");
    formik.setFieldTouched("email", false);
  };

  const hasEmailError = formik.touched.email && Boolean(formik.errors.email);
  const hasPasswordError =
    formik.touched.password && Boolean(formik.errors.password);

  return (
    <>
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

      <LoginCardContainer
        style={{
          height: hasPasswordError ? "607px" : "568px",
        }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Box
            component="img"
            src={log}
            alt="Login Logo"
            sx={{
              width: "100%",
              maxWidth: "91px",
              marginTop: "32px",
              marginX: "auto",
              display: "block",
            }}
          />

          <LabelText sx={{ mt: "31px" }}>Email&nbsp;:</LabelText>

          <FormBox>
            <TextField
              name="email"
              type="email"
              placeholder="Please Enter Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasEmailError}
              helperText={hasEmailError && "The Email Is Incorrect"}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-input": {
                  paddingRight: hasEmailError ? "40px !important" : "14px !important",
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
                    >
                      <img
                        src={closeImg}
                        alt="clear"
                        style={{ width: "20px", height: "20px" }}
                      />
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
              type="password"
              placeholder="Please Enter Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasPasswordError}
              helperText={hasPasswordError && formik.errors.password}
              fullWidth
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
                    <img
                      src={eyeOpenIcon}
                      alt="Show password"
                      style={{ width: "16px", height: "16px" }}
                    />
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
            
            <CustomLink
              href="#"
              onClick={handleForgotPasswordClick}
              sx={{ mr: "36px" }}
            >
              Forgot Your Password?
            </CustomLink>
          </Box>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </LoginButton>

          <Typography
            align="center"
            sx={{
              mt: "27px",
              color: "#ABABAB",
              fontWeight: 700,
            }}
          >
            Dont Have An Account?{" "}
            <CustomLink 
              component="button" 
              onClick={handleRegisterClick}
              sx={{ 
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              Register
            </CustomLink>
          </Typography>
        </Box>
      </LoginCardContainer>
    </>
  );
};

export default LoginCard;