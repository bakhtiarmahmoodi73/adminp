import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import log from "../assets/images/logo/login.svg";
import {
  Box,
  Card,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Link,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { loginUser, clearError } from "../store/slices/authSlice";
import closeImg from "../assets/images/errorcircle/Frame (2).svg";
import eyeOpenIcon from "../assets/images/passwordicon/Frame (3).svg";
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

// تعریف تایپ از روی Schema
type LoginFormData = z.infer<typeof loginSchema>;

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showError, setShowError] = React.useState<boolean>(false);

  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Redirect if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Show error snackbar when error changes
  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // Formik configuration با Zod
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

  // بررسی آیا ایمیل خطا دارد و کاربر فیلد را لمس کرده
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
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Card
        sx={{
          all: "unset",
          display: "flex",
          flexDirection: "column",
          maxWidth: "560px",
          width: "100%",
          height: hasPasswordError ? "607px" : "568px",
          borderRadius: "30px",

          mx: "auto", // وسط چین افقی
          my: 0, // مارجین بالا و پایین صفر
          backgroundColor: "#2A3342",
          p: 0,
          marginTop: "157px",
          marginBottom: "152px",
        }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Box
            component="img"
            src={log}
            alt="Login Logo"
            sx={{
              all: "unset",
              width: "100%",
              maxWidth: "91px",
              marginTop: "32px",
              marginX: "auto",
              display: "block",
            }}
          />

          <Typography
            sx={{
              all: "unset",
              display: "block",
              mt: "31px",
              fontWeight: 700,
              color: "#ABABAB !important",
              ml: "39px",
              fontSize: "16px",
            }}
          >
            Email&nbsp;:
          </Typography>

          <Box
            sx={{
              width: "485px",
              margin: "15px auto 0",
              position: "relative",
            }}
          >
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
                "& .MuiOutlinedInput-root": {
                  height: "57px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "#242C39",
                  p: "0 !important",
                  m: "0 !important",

                  "& .MuiOutlinedInput-input": {
                    p: "0 !important",
                    m: "0 !important",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    paddingLeft: "14px !important",
                    paddingRight: hasEmailError
                      ? "40px !important"
                      : "14px !important",
                    color: "#FFFFFF !important", // اضافه کردن رنگ سفید به متن
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    p: "0",
                    m: "0",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#242C39",
                  },

                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#F66066 !important",
                    borderWidth: "2px !important",
                  },

                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1D8D94",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1D8D94",
                  },

                  "&.Mui-focused": {
                    backgroundColor: "#242C39 !important",
                  },
                },

                "& input": {
                  color: "#FFFFFF !important", // رنگ متن اصلی
                },

                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #242C39 inset !important",
                  WebkitTextFillColor: "#FFFFFF !important",
                  caretColor: "#FFFFFF",
                  transition: "background-color 9999s ease-in-out 0s",
                  p: "0 !important",
                  m: "0 !important",
                  boxSizing: "border-box",
                  paddingLeft: "14px !important",
                  paddingRight: hasEmailError
                    ? "40px !important"
                    : "14px !important",
                  color: "#FFFFFF !important", // رنگ برای autofill
                },

                "& .MuiInputBase-input::placeholder": {
                  color: "#FFFFFF !important",
                  opacity: 1,
                },

                "& .MuiFormHelperText-root": {
                  color: "#F66066",
                  ml: "0",
                  mt: "5px",
                  fontSize: "14px",
                  fontWeight: 500,
                  p: "0",
                  position: "absolute",
                  top: "100%",
                  left: "0",
                },
              }}
              InputProps={{
                sx: {
                  p: "0 !important",
                  m: "0 !important",
                  height: "57px",
                  color: "#FFFFFF !important", // رنگ در InputProps
                },
                inputProps: {
                  style: {
                    color: "#FFFFFF", // رنگ در inputProps
                  },
                },
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      m: "0",
                      p: "0",
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "20px",
                      height: "20px",
                    }}
                  >
                    {hasEmailError && (
                      <Box
                        onClick={handleClearEmail}
                        sx={{
                          width: "20px",
                          height: "20px",
                          p: "0",
                          m: "0",
                          background: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-label="Clear email"
                      >
                        <img
                          src={
                            typeof closeImg === "string"
                              ? closeImg
                              : (closeImg as any).src
                          }
                          alt="clear"
                          style={{
                            width: "20px",
                            height: "20px",
                            display: "block",
                            margin: "0",
                            padding: "0",
                          }}
                        />
                      </Box>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Password */}
          <Typography
            sx={{
              all: "unset",
              display: "block",
              mt: hasEmailError ? "47px" : "27px",  
              fontWeight: 700,
              color: "#ABABAB !important",
              ml: "39px",
              fontSize: "16px",
            }}
          >
            Password&nbsp;:
          </Typography>

          <Box
            sx={{
              width: "485px",
              margin: "15px auto 0",
              position: "relative",
            }}
          >
            <TextField
              name="password"
              placeholder="Please Enter Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasPasswordError}
              helperText={hasPasswordError && formik.errors.password}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "57px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "#242C39",
                  p: "0 !important",
                  m: "0 !important",

                  "& .MuiOutlinedInput-input": {
                    p: "0 !important",
                    m: "0 !important",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    paddingLeft: "14px !important",
                    paddingRight: "14px !important", // آیکون نمایش پسورد همیشه وجود دارد
                    color: "#FFFFFF !important",
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    p: "0",
                    m: "0",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#242C39",
                  },

                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#F66066 !important",
                    borderWidth: "2px !important",
                  },

                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1D8D94",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1D8D94",
                  },

                  "&.Mui-focused": {
                    backgroundColor: "#242C39 !important",
                  },
                },

                "& input": {
                  color: "#FFFFFF !important",
                },

                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #242C39 inset !important",
                  WebkitTextFillColor: "#FFFFFF !important",
                  caretColor: "#FFFFFF",
                  transition: "background-color 9999s ease-in-out 0s",
                  p: "0 !important",
                  m: "0 !important",
                  boxSizing: "border-box",
                  paddingLeft: "14px !important",
                  paddingRight: "14px !important",
                  color: "#FFFFFF !important",
                },

                "& .MuiInputBase-input::placeholder": {
                  color: "#FFFFFF !important",
                  opacity: 1,
                },

                "& .MuiFormHelperText-root": {
                  color: "#F66066",
                  ml: "0",
                  mt: "5px",
                  fontSize: "14px",
                  fontWeight: 500,
                  p: "0",
                  position: "absolute",
                  top: "100%",
                  left: "0",
                },
              }}
              InputProps={{
                sx: {
                  p: "0 !important",
                  m: "0 !important",
                  height: "57px",
                  color: "#FFFFFF !important",
                },
                inputProps: {
                  style: {
                    color: "#FFFFFF",
                  },
                },
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      m: "0",
                      p: "0",
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px",
                      height: "16px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        p: "0",
                        m: "0",
                        background: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={eyeOpenIcon}
                        alt="Show password"
                        style={{
                          width: "16px",
                          height: "16px",
                          display: "block",
                          margin: "0",
                          padding: "0",
                        }}
                      />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Checkbox and Forgot Password Row */}
          <Box
            sx={{
              all: "unset",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: hasPasswordError ? "62px" : "22px",
            }}
          >
            {/* Left: Checkbox and text */}
            <Box
              sx={{
                all: "unset",
                display: "flex",
                alignItems: "center",
                marginLeft: "39px",
              }}
            >
              <Box
                sx={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "3px",
                  border: "1px solid #5B5F5E",
                  backgroundColor: "#242C39",
                  mt: "6px",
                  mr: "6px",
                  boxSizing: "border-box",
                }}
              />

              <Typography
                sx={{
                  color: "#ABABAB",
                  fontSize: "16px",
                  fontWeight: 700,
                  userSelect: "none",
                  display: "block",
                  ml: "6px",
                }}
              >
                Keep Me Login
              </Typography>
            </Box>
            {/* Right: Link */}
            <Link
              href="#"
              onClick={handleForgotPasswordClick}
              sx={{
                color: "#1D8D94",
                fontSize: "16px",
                fontWeight: 700,
                marginRight: "36px",
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Your Password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            sx={{
              mt: "46px",
              backgroundColor: "#1D8D94",
              width: "485px",
              height: "60px",
              marginLeft: "39px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
              textTransform: "none",
              boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
              "&:hover": {
                backgroundColor: "#16666c",
              },
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* Register Link */}
          <Typography
            align="center"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              mt: "27px",
              color: "#ABABAB",
              cursor: "pointer",
              textTransform: "none",
            }}
          >
            Dont Have An Account?{" "}
            <Link
              component="button"
              type="button"
              onClick={handleRegisterClick}
              sx={{
                textDecoration: "none",
                fontWeight: 700,
                color: "#1D8D94",
                cursor: "pointer",
                textTransform: "none",
                padding: "0px",
                display: "inline",
                verticalAlign: "baseline",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default LoginCard;
