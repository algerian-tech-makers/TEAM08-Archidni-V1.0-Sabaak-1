import { Typography, Link } from "@mui/material";
import { SignupForm } from "../../components/form/signup";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { LoginForm } from "../form/login";

import NextLink from "next/link";

export default function Login() {
  const { t } = useTranslation("common");
  return (
    <>
      <LoginForm translation={t} />

      

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3 }}
        color="text.test"
      >
        {t("signup.have-account")}{" "}
        <Link component={NextLink} variant="subtitle2" href="/">
          {t("buttons.login")}
        </Link>
      </Typography>
    </>
  );
}
