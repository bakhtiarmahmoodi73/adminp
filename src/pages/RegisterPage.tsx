// src/pages/RegisterPage/RegisterPage.tsx
import React, { useState } from "react";
import { Box, Card, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TypographyLogin } from "../components/styled/LoginStyled";

// تعریف تایپ برای form data
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent): void => {
    e.preventDefault();
    // منطق ثبت‌نام اینجا پیاده‌سازی می‌شود
    console.log("Register data:", formData);

    // بعد از ثبت‌نام موفق، به صفحه لاگین هدایت شود
    // navigate("/login");
  };

  const handleLoginClick = (): void => {
    navigate("/auth/login");
  };

  return (
    <Card
      sx={{
        maxWidth: "560px",
        width: "100%",
        height: "606px",
        borderRadius: "30px",
        marginTop: "157px",
        marginBottom: "152px",
        marginX: "auto",
        backgroundColor: "#2A3342",
      }}
    >
      <TypographyLogin
        sx={{
          width: "100%",
          maxWidth: "138px",
          marginTop: "50px",
          marginX: "auto",
          display: "block",
        }}
      >
        Register
      </TypographyLogin>
      <Box component="form" onSubmit={handleRegister}>
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
            fullWidth
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
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

        {/* فیلد Email */}
        <Box sx={{ mt: "19px", ml: "39px", mr: "36px" }}>
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
            fullWidth
            name="email"
            type="email"
            placeholder="Please Enter Your Email"
            value={formData.email}
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

        {/* فیلد Password */}
        <Box sx={{ mt: "19px", ml: "39px", mr: "36px" }}>
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
            type="password"
            fullWidth
            name="password"
            placeholder="Please Enter Your Password"
            value={formData.password}
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

        {/* دکمه ثبت‌نام */}
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
            "&:hover": {
              backgroundColor: "#16666c",
            },
          }}
        >
          Register
        </Button>

        {/* لینک برگشت به لاگین */}
        <Typography
          align="center"
          sx={{
            fontWeight: 700,
            mt: "28px",
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
  );
};

export default RegisterPage;
