import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Box,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "../assets/images/errorcircle/Frame (2).svg?react";
import {
  ButtonContact,
  CardContact,
  TextAreaContact,
  TextFieldContact,
  TypographyContact,
  TypographyContactDetail,
} from "../components/styled/HompageStylee";

// تعریف schema برای اعتبارسنجی با Zod
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const subjectSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(3, "Subject must be at least 3 characters"),
});

const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type ContactFormData = {
  email: string;
  subject: string;
  message: string;
};

function ContactUs() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // توابع اعتبارسنجی
  const validateEmail = useCallback((value: string) => {
    const result = emailSchema.safeParse({ email: value });
    if (!result.success) {
      return result.error.issues[0]?.message || "Email is required";
    }
    return "";
  }, []);

  const validateSubject = useCallback((value: string) => {
    const result = subjectSchema.safeParse({ subject: value });
    if (!result.success) {
      return result.error.issues[0]?.message || "Subject is required";
    }
    return "";
  }, []);

  const validateMessage = useCallback((value: string) => {
    const result = messageSchema.safeParse({ message: value });
    if (!result.success) {
      return result.error.issues[0]?.message || "Message is required";
    }
    return "";
  }, []);

  // Formik configuration
  const formik = useFormik<ContactFormData>({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },
    validate: () => {
      return {};
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let hasError = false;
      
      // اعتبارسنجی Email
      if (!values.email.trim()) {
        setEmailTouched(true);
        const emailValidationError = validateEmail(values.email);
        setEmailError(emailValidationError);
        if (emailValidationError) hasError = true;
      }
      
      // اعتبارسنجی Subject
      if (!values.subject.trim()) {
        setSubjectTouched(true);
        const subjectValidationError = validateSubject(values.subject);
        setSubjectError(subjectValidationError);
        if (subjectValidationError) hasError = true;
      }
      
      // اعتبارسنجی Message
      if (!values.message.trim()) {
        const messageValidationError = validateMessage(values.message);
        if (messageValidationError) hasError = true;
      }
      
      if (hasError) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // شبیه‌سازی ارسال فرم
        console.log("Contact form data:", values);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // نمایش پیام موفقیت
        setShowSuccess(true);
        
        // ریست فرم
        formik.resetForm();
        setEmailTouched(false);
        setSubjectTouched(false);
        setEmailError("");
        setSubjectError("");
        
      } catch (error) {
        console.error("Form submission failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Event handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (emailTouched) {
      const error = validateEmail(e.target.value);
      setEmailError(error);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (subjectTouched) {
      const error = validateSubject(e.target.value);
      setSubjectError(error);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    formik.handleChange(e);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      setEmailTouched(true);
      const error = validateEmail(value);
      setEmailError(error);
    } else {
      setEmailTouched(false);
      setEmailError("");
    }
    formik.handleBlur(e);
  };

  const handleSubjectBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      setSubjectTouched(true);
      const error = validateSubject(value);
      setSubjectError(error);
    } else {
      setSubjectTouched(false);
      setSubjectError("");
    }
    formik.handleBlur(e);
  };

  const handleMessageBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      // فقط برای اعتبارسنجی، در state ذخیره نمی‌شود
    }
    formik.handleBlur(e);
  };

  const handleClearEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    formik.setFieldValue("email", "");
    setEmailTouched(false);
    setEmailError("");
  };

  const handleClearSubject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    formik.setFieldValue("subject", "");
    setSubjectTouched(false);
    setSubjectError("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    // اعتبارسنجی Email
    if (!formik.values.email.trim()) {
      setEmailTouched(true);
      const emailValidationError = validateEmail(formik.values.email);
      setEmailError(emailValidationError);
      if (emailValidationError) hasError = true;
    }
    
    // اعتبارسنجی Subject
    if (!formik.values.subject.trim()) {
      setSubjectTouched(true);
      const subjectValidationError = validateSubject(formik.values.subject);
      setSubjectError(subjectValidationError);
      if (subjectValidationError) hasError = true;
    }
    
    // اعتبارسنجی Message
    if (!formik.values.message.trim()) {
      const messageValidationError = validateMessage(formik.values.message);
      if (messageValidationError) hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    formik.handleSubmit();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const hasEmailError = emailTouched && Boolean(emailError);
  const hasSubjectError = subjectTouched && Boolean(subjectError);

  // استایل دکمه ضربدر
  const iconButtonStyle = {
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully!
        </Alert>
      </Snackbar>

      <CardContact>
        <TypographyContact>Contact Us</TypographyContact>
        <TypographyContactDetail>
          Reach Out And We Will Get In Touch Within 24 Hours.
        </TypographyContactDetail>

        <Box component="form" onSubmit={handleFormSubmit} noValidate>
          {/* فیلد Email */}
          <TypographyContactDetail sx={{ marginTop: "35px", lineHeight: "1.4" }}>
            Email :
          </TypographyContactDetail>
          <Box sx={{ position: "relative" }}>
            <TextFieldContact
              name="email"
              placeholder="Please Enter Your Email"
              value={formik.values.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={hasEmailError}
              helperText={hasEmailError && emailError}
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
                      component="button"
                      type="button"
                      style={iconButtonStyle}
                    >
                      <CloseIcon style={{ width: "20px", height: "20px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* فیلد Subject */}
          <TypographyContactDetail sx={{ marginTop: "15px", lineHeight: "1.4" }}>
            Subject :
          </TypographyContactDetail>
          <Box sx={{ position: "relative" }}>
            <TextFieldContact
              name="subject"
              placeholder="Please Enter Subject"
              value={formik.values.subject}
              onChange={handleSubjectChange}
              onBlur={handleSubjectBlur}
              error={hasSubjectError}
              helperText={hasSubjectError && subjectError}
              sx={{
                "& .MuiOutlinedInput-input": {
                  paddingRight: hasSubjectError ? "40px !important" : "14px !important",
                },
              }}
              InputProps={{
                endAdornment: hasSubjectError && (
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
                      onClick={handleClearSubject}
                      sx={{ cursor: "pointer" }}
                      aria-label="Clear subject"
                      component="button"
                      type="button"
                      style={iconButtonStyle}
                    >
                      <CloseIcon style={{ width: "20px", height: "20px" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* فیلد Message */}
          <TypographyContactDetail sx={{ marginTop: "21px", lineHeight: "1.4" }}>
            Message text :
          </TypographyContactDetail>
          <TextAreaContact
            name="message"
            minRows={6}
            maxRows={6}
            placeholder="Please Enter Your Message"
            value={formik.values.message}
            onChange={handleMessageChange}
            onBlur={handleMessageBlur}
          />

          {/* دکمه ارسال */}
          <ButtonContact type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </ButtonContact>
        </Box>
      </CardContact>
    </>
  );
}

export default ContactUs;