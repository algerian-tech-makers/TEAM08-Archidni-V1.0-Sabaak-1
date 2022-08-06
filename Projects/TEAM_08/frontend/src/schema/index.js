import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  role: yup
    .string()
    .oneOf(["school", "student"])
    .label("Select your registration type."),
  email: yup.string().email().required(),
  firstName: yup
    .string()
    .min(3)
    .when("role", {
      is: "student",
      then: yup.string().required("Please provide your first name"),
    }),
  lastName: yup
    .string()
    .min(3)
    .when("role", {
      is: "student",
      then: yup.string().required("Please provide your last name"),
    }),

  password: yup.string().min(5).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  gender: yup
    .string()
    .oneOf(["male", "female"])
    .label("Select your registration gender."),
});
export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required("Required"),
});
