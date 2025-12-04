// src/pages/ChangePasswordPage/ChangePasswordPage.tsx
import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import changePasswordImage from "../../src/assets/images/changepassword/Change password.svg";

// تعریف تایپ برای form data
interface ChangePasswordFormData {
  newPassword: string;
  repeatNewPassword: string;
}

const ChangePasswordPage: React.FC = () => {
  const [formData, setFormData] = useState<ChangePasswordFormData>({
    newPassword: "",
    repeatNewPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = (e: React.FormEvent): void => {
    e.preventDefault();
    // منطق تغییر رمز عبور اینجا پیاده‌سازی می‌شود
    console.log("Change password data:", formData);
    
    // بعد از تغییر موفق رمز عبور، به صفحه لاگین هدایت شود
    // navigate("/auth/login");
  };

  return (
    <Card
      sx={{
        display: "block",
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
      <Box component="form" onSubmit={handleConfirm}>
        <Box
          component="img"
          src={changePasswordImage} 
          alt="Change Password Logo"
          sx={{
            width: "100%",
            maxWidth: "292px",
            marginTop: "32px",
            marginX: "auto",
            display: "block",
          }}
        />

        {/* فیلد New Password */}
        <Box sx={{ mt: "55px", ml: "38px", mr: "36px" }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#ABABAB",
              fontSize: "16px",
              mb: "15px"
            }}
          >
            New Password:
          </Typography>
          <TextField
            fullWidth
            name="newPassword"
            placeholder="Please Enter Your  Password"
            value={formData.newPassword}
            onChange={handleInputChange}
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
                  borderColor: "#1D8D94",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1D8D94",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF !important",
                opacity: 1,
              },
            }}
           
          />
        </Box>

        {/* فیلد Repeat New Password */}
        <Box sx={{ mt: "19px", ml: "38px", mr: "36px" }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#ABABAB",
              fontSize: "16px",
              mb: "15px"
            }}
          >
            Repeat New Password:
          </Typography>
          <TextField
            fullWidth
            name="repeatNewPassword"
            placeholder="Please Repeat Your  Password"
            value={formData.repeatNewPassword}
            onChange={handleInputChange}
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
                  borderColor: "#1D8D94",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1D8D94",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF !important",
                opacity: 1,
              },
            }}
          
          />
        </Box>

        {/* دکمه Confirm */}
        <Button
          type="submit"
          fullWidth
          sx={{
            mt: "31px",
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
            }
          }}
        >
          Confirm
        </Button>
      </Box>
    </Card>
  );
};

export default ChangePasswordPage;