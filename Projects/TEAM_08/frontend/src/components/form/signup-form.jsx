import { useState } from "react";
import { Formik, Field } from "formik";
import { Stack, Box, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SignupSchema } from "schema";
import { Input } from "../input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useStoreDispatch } from "redux/store";
import { signupAction } from "redux/slices/auth.slices";
import Select from "../select";

export function SignupForm({ translation }) {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useStoreDispatch();

  const submitHandler = async (
    { firstName, email, password, role, gender },
    { setSubmitting }
  ) => {
    const userData = {
      username: firstName,
      email,
      password,
      role,
      gender,
    };

    dispatch(signupAction(userData));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        gender: "male",
      }}
      /**
       * @Mehdi
       * @ToDO
       * @Fix validation problem
       */
      // validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) =>
        submitHandler(values, { setSubmitting })
      }
    >
      {({ handleSubmit, getFieldProps, touched, isSubmitting, errors }) => (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="column" spacing={3}>
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
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select
                label="role"
                components={Field}
                options={[{ value: "student" }, { value: "school" }]}
                {...getFieldProps("select your gender")}
                error={Boolean(touched.role && errors.role)}
              />

              <Input
                fullWidth
                type="gender"
                label={`gender`}
                {...getFieldProps("select your gender")}
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
        </form>
      )}
    </Formik>
  );
}
