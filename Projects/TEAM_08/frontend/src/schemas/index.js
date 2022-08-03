import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["school", "user"])
    .label("Select your registration type."),
  email: yup.string().email().required(),
  firstName: yup
    .string()
    .min(3)
    .when("type", {
      is: "user",
      then: yup.string().required("Please provide your first name"),
    }),
  lastName: yup
    .string()
    .min(3)
    .when("type", {
      is: "user",
      then: yup.string().required("Please provide your last name"),
    }),

  password: yup.string().min(5).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  school: yup
    .string()
    .max(25)
    .when("type", {
      is: "school",
      then: yup.string().required("Please provide your school name"),
    }),
});
export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required("Required"),
});
