// src/pages/ChangePasswordPage/ChangePasswordPage.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { Box, Card, TextField, Button, Typography, InputAdornment } from "@mui/material";
import { TypographyLogin } from "../components/styled/LoginStyled";
import EyeOpenIcon from "../assets/images/passwordicon/Frame (3).svg?react";

// تعریف schema با Zod
const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(5, "Password Is Required"),
  
  repeatNewPassword: z.string().min(1, "Please repeat your password"),
}).refine((data) => data.newPassword === data.repeatNewPassword, {
  message: "Passwords do not match",
  path: ["repeatNewPassword"],
});

// تعریف تایپ برای form data
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordPage: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const formik = useFormik<ChangePasswordFormData>({
    initialValues: {
      newPassword: "",
      repeatNewPassword: "",
    },
    validate: (values) => {
      const result = changePasswordSchema.safeParse(values);
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
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Change password data:", values);
      // منطق تغییر رمز عبور اینجا پیاده‌سازی می‌شود
      
      // شبیه‌سازی API call
      setTimeout(() => {
        setSubmitting(false);
        alert("Password changed successfully!");
        // بعد از تغییر موفق رمز عبور، به صفحه لاگین هدایت شود
        // navigate("/auth/login");
      }, 1000);
    },
  });

  // متغیرهای کمکی برای نمایش خطاها
  const hasNewPasswordError = formik.touched.newPassword && Boolean(formik.errors.newPassword);
  const hasRepeatPasswordError = formik.touched.repeatNewPassword && Boolean(formik.errors.repeatNewPassword);

  const toggleNewPasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNewPassword(!showNewPassword);
  };

  const toggleRepeatPasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <Card
      sx={{
        maxWidth: "560px",
        width: "100%",
        height: "auto",
        borderRadius: "30px",
        marginTop: "161px",
        marginBottom: "152px",
        marginX: "auto",
        backgroundColor: "#2A3342",
        paddingBottom: "32px",
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TypographyLogin
          sx={{
            width: "100%",
            maxWidth: "292px",
            marginTop: "32px",
            marginX: "auto",
            display: "block",
          }}
        >
          Change Password
        </TypographyLogin>

        {/* فیلد New Password */}
        <Box sx={{ 
          mt: "55px", 
          ml: "38px", 
          mr: "36px",
          mb: hasNewPasswordError ? "39px" : "19px"
        }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#ABABAB",
              fontSize: "16px",
              mb: "15px",
            }}
          >
            New Password:
          </Typography>
          <TextField
            type={showNewPassword ? "text" : "password"}
            fullWidth
            name="newPassword"
            placeholder="Please Enter Your Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={hasNewPasswordError}
            helperText={hasNewPasswordError && formik.errors.newPassword}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "57px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#FFFFFF",
                backgroundColor: "#242C39",
                "& fieldset": {
                  borderColor: hasNewPasswordError ? "#f44336" : "transparent",
                },
                "&:hover fieldset": {
                  borderColor: hasNewPasswordError ? "#f44336" : "#1D8D94",
                },
                "&.Mui-focused fieldset": {
                  borderColor: hasNewPasswordError ? "#f44336" : "#1D8D94",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF !important",
                opacity: 1,
              },
              "& .MuiFormHelperText-root": {
                color: "#f44336",
                marginLeft: 0,
                marginTop: "8px",
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
                    onClick={toggleNewPasswordVisibility}
                    sx={{ cursor: "pointer" }}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
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
                    <EyeOpenIcon style={{ width: "16px", height: "16px", color: "#FFFFFF" }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* فیلد Repeat New Password */}
        <Box sx={{ 
          ml: "38px", 
          mr: "36px",
          mb: hasRepeatPasswordError ? "39px" : "31px"
        }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#ABABAB",
              fontSize: "16px",
              mb: "15px",
            }}
          >
            Repeat New Password:
          </Typography>
          <TextField
            type={showRepeatPassword ? "text" : "password"}
            fullWidth
            name="repeatNewPassword"
            placeholder="Please Repeat Your Password"
            value={formik.values.repeatNewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={hasRepeatPasswordError}
            helperText={hasRepeatPasswordError && formik.errors.repeatNewPassword}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "57px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#FFFFFF",
                backgroundColor: "#242C39",
                "& fieldset": {
                  borderColor: hasRepeatPasswordError ? "#f44336" : "transparent",
                },
                "&:hover fieldset": {
                  borderColor: hasRepeatPasswordError ? "#f44336" : "#1D8D94",
                },
                "&.Mui-focused fieldset": {
                  borderColor: hasRepeatPasswordError ? "#f44336" : "#1D8D94",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF !important",
                opacity: 1,
              },
              "& .MuiFormHelperText-root": {
                color: "#f44336",
                marginLeft: 0,
                marginTop: "8px",
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
                    onClick={toggleRepeatPasswordVisibility}
                    sx={{ cursor: "pointer" }}
                    aria-label={showRepeatPassword ? "Hide password" : "Show password"}
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
                    <EyeOpenIcon style={{ width: "16px", height: "16px", color: "#FFFFFF" }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* دکمه Confirm */}
        <Button
          type="submit"
          fullWidth
          disabled={formik.isSubmitting || !formik.isValid}
          sx={{
            backgroundColor: formik.isSubmitting || !formik.isValid ? "#1D8D9480" : "#1D8D94",
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
              backgroundColor: formik.isSubmitting || !formik.isValid ? "#1D8D9480" : "#16666c",
            },
            "&.Mui-disabled": {
              backgroundColor: "#1D8D9480",
              color: "#FFFFFF80",
            },
          }}
        >
          {formik.isSubmitting ? "Changing Password..." : "Confirm"}
        </Button>
      </Box>
    </Card>
  );
};

export default ChangePasswordPage;