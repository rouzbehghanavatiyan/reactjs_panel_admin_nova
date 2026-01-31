import React, { useState } from "react";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Card,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { userName: "", password: "" },
    mode: "onChange",
  });

  const submitData = (data: any) => {
    // console.log("Login Data:", data);
    navigate("/home");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Card sx={{ width: "100%", p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Box component="form" onSubmit={handleSubmit(submitData)}>
          <Typography variant="h5" textAlign="center" mb={3}>
            ورود به پنل مدیریت
          </Typography>
          <Controller
            name="userName"
            control={control}
            rules={{
              required: "لطفا نام کاربری را وارد کنید",
              minLength: {
                value: 2,
                message: "نام کاربری باید بیشتر از 2 حرف باشد",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="نام کاربری"
                fullWidth
                margin="normal"
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "لطفا رمز عبور خود را وارد کنید",
              minLength: {
                value: 4,
                message: "رمز عبور باید بیشتر از 4 حرف باشد",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="رمز عبور"
                type={showPass ? "text" : "password"}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => setShowPass(!showPass)}
                        edge="end"
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
          >
            ورود
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
