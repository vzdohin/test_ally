"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Схемы валидации
const emailSchema = yup
  .object({
    email: yup
      .string()
      .email("Неверный формат Email")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email должен быть в формате index@mail.com"
      )
      .required("Введите Email"),
  })
  .required();

const passwordSchema = yup
  .object({
    password: yup
      .string()
      .required("Введите пароль")
      .min(6, "Пароль должен быть не менее 6 символов"),
  })
  .required();
function Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(step === 1 ? emailSchema : passwordSchema),
  });
  const handleFirstSubmit = (data) => {
    setFormData({ ...formData, email: data.email });
    reset();
    setStep(2);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const mockSubmit = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "error@example.com") {
          reject({ success: false, message: "Ошибка отправки данных!" });
        } else {
          console.log("Данные отправлены на сервер:", data);
          resolve({ success: true, message: "Данные успешно отправлены!" });
        }
      }, 500);
    });
  };
  const handleFinalSubmit = async (data) => {
    try {
      // const response = await fetch('https://your-real-api-url.com/submit', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ...formData, password: data.password }),
      // });
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const result = await response.json();
      // console.log(result);
      // alert(`Успех: ${result.message}`);
      const response = await mockSubmit({
        ...formData,
        password: data.password,
      });
      alert(`Успех: ${response.message}`);
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    } finally {
      reset({ email: "", password: "" });
      setFormData({ email: "", password: "" });
      setStep(1);
    }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(
        step === 1 ? handleFirstSubmit : handleFinalSubmit
      )}
    >
      {step === 1 ? (
        <>
          <TextField
            style={{ width: "300px" }}
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <Button type="submit">Next</Button>
        </>
      ) : (
        <>
          <TextField
            style={{ width: "300px" }}
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button type="submit">Submit</Button>
        </>
      )}
    </form>
  );
}

export default Form;
