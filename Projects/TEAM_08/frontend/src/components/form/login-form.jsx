import { useState } from "react";
import { Formik, useFormik } from "formik";
import { Stack, Box, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoginSchema } from "schema";
import { Input } from "../input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useStoreDispatch } from "redux/store";
import { loginAction } from "redux/slices/auth.slices";

// const loginHandler = async ({ email, password }, { setSubmitting }) => {
//   /**
//    * @Dhiya
//    * @Suggestin - I propose you do the logic of finding if the user is a student or a school in the backend.
//    */
//   const payload = {
//     email,
//     password,
//     role: "student",
//   };
//   try {
//     const response = await axios.post(
//       "http://localhost:4000/api/auth/login",
//       payload
//     );
//     console.log(response);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     setSubmitting(false);
//   }
// };

export function LoginForm({ translation }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useStoreDispatch();

  const submitHandler = async ({ email, password }, { setSubmitting }) => {
    dispatch(
      loginAction({
        email,
        password,
        role: "student",
      })
    );
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={({ email, password }, { setSubmitting }) =>
        submitHandler({ email, password }, { setSubmitting })
      }
    >
      {({ handleSubmit, getFieldProps, touched, isSubmitting, errors }) => (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Input
              fullWidth
              dir="rtl"
              type="email"
              label={translation("input.email")}
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <Input
              fullWidth
              dir="rtl"
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
          </Stack>

          <Stack marginY={2}>
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
              {translation("buttons.login")}
            </LoadingButton>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
