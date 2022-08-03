import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { Stack, Box, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SignupSchema } from "../../schemas";
import { Input } from "../input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export function SignupForm({ translation }) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      email: "",
      firstName: "",
      lastName: "",
      school: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      setTimeout(() => {
        console.log("worked");
      }, 2000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} >
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Input
              fullWidth
              label={translation("input.first-name")}
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <Input
              fullWidth
              label={translation("input.last-name")}
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack spacing={3}>
            <Input
              fullWidth
              type="email"
              label={translation("input.email")}
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <Input
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label={translation("input.password")}
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {!showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <Input
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label={translation("input.confirm-password")}
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {!showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Box>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#59CE8F",
                opacity: ".8",
                "&:hover": {
                  backgroundColor: "#59CE8F",
                  opacity: "1",
                },
              }}
              loading={isSubmitting}
            >
              {translation("buttons.signup")}
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
