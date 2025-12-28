import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { Box, Card, TextField, Button, Typography, InputAdornment } from "@mui/material";
import { TypographyLogin } from "../components/styled/LoginStyled";
import EyeOpenIcon from "../assets/images/passwordicon/Frame (3).svg?react";

const changePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(5, "Password Is Required"),
  repeatNewPassword: z.string().min(1, "Please repeat your password"),
}).refine((data) => data.newPassword === data.repeatNewPassword, {
  message: "Passwords do not match",
  path: ["repeatNewPassword"], 
});

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
      if (result.success) return {};
      const errors: any = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      return errors;
    },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Change password data:", values);
      setTimeout(() => {
        setSubmitting(false);
        alert("Password changed successfully!");
      }, 1000);
    },
  });

  const hasNewPasswordError = formik.touched.newPassword && Boolean(formik.errors.newPassword);
  const hasRepeatPasswordError = formik.touched.repeatNewPassword && Boolean(formik.errors.repeatNewPassword);

  const toggleNewPasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowNewPassword((prev) => !prev);
  }, []);

  const toggleRepeatPasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowRepeatPassword((prev) => !prev);
  }, []);

  const eyeSlashStyle = (isVisible: boolean) => ({
    cursor: "pointer",
    background: 'none',
    border: 'none',
    p: 0,
    m: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: !isVisible ? "100%" : "0%", 
      height: "1.5px",
      backgroundColor: "#ABABAB",
      transform: "rotate(-45deg)",
      transition: "width 0.2s ease-in-out",
      pointerEvents: "none",
    }
  });

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

        <Box sx={{ 
          mt: "55px", 
          ml: "38px", 
          mr: "36px",
          mb: hasNewPasswordError ? "39px" : "19px" 
        }}>
          <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>
            New Password:
          </Typography>
          <TextField
            type={showNewPassword ? "text" : "password"}
            fullWidth
            placeholder="Please Enter Your Password"
            {...formik.getFieldProps("newPassword")}
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
                "& fieldset": { borderColor: hasNewPasswordError ? "#f44336" : "transparent" },
                "&:hover fieldset": { borderColor: hasNewPasswordError ? "#f44336" : "#1D8D94" },
                "&.Mui-focused fieldset": { borderColor: hasNewPasswordError ? "#f44336" : "#1D8D94" },
              },
              "& .MuiInputBase-input::placeholder": { color: "#FFFFFF !important", opacity: 1 },
              "& .MuiFormHelperText-root": { color: "#f44336", marginLeft: 0, marginTop: "8px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
                  <Box
                    onClick={toggleNewPasswordVisibility}
                    sx={eyeSlashStyle(showNewPassword)}
                    component="button"
                    type="button"
                    aria-label="Toggle password visibility"
                  >
                    <EyeOpenIcon style={{ width: "16px", height: "16px", color: "#FFFFFF" }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ 
          ml: "38px", 
          mr: "36px",
          mb: hasRepeatPasswordError ? "39px" : "31px"
        }}>
          <Typography sx={{ fontWeight: 700, color: "#ABABAB", fontSize: "16px", mb: "15px" }}>
            Repeat New Password:
          </Typography>
          <TextField
            type={showRepeatPassword ? "text" : "password"}
            fullWidth
            placeholder="Please Repeat Your Password"
            {...formik.getFieldProps("repeatNewPassword")}
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
                "& fieldset": { borderColor: hasRepeatPasswordError ? "#f44336" : "transparent" },
                "&:hover fieldset": { borderColor: hasRepeatPasswordError ? "#f44336" : "#1D8D94" },
                "&.Mui-focused fieldset": { borderColor: hasRepeatPasswordError ? "#f44336" : "#1D8D94" },
              },
              "& .MuiInputBase-input::placeholder": { color: "#FFFFFF !important", opacity: 1 },
              "& .MuiFormHelperText-root": { color: "#f44336", marginLeft: 0, marginTop: "8px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
                  <Box
                    onClick={toggleRepeatPasswordVisibility}
                    sx={eyeSlashStyle(showRepeatPassword)}
                    component="button"
                    type="button"
                    aria-label="Toggle password visibility"
                  >
                    <EyeOpenIcon style={{ width: "16px", height: "16px", color: "#FFFFFF" }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          sx={{
            backgroundColor: formik.isSubmitting || !formik.isValid ? "#1D8D9480" : "#1D8D94",
            width: "485px",
            height: "60px",
            mx: "auto",
            display: "block",
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