import { Typography, Link } from "@mui/material";
import { SignupForm } from "components/form/signup-form";

import { useTranslation } from "next-i18next";

import NextLink from "next/link";

export default function Signup() {
  const { t } = useTranslation("common");
  return (
    <>
      <SignupForm translation={t} />

      <Typography
        variant="body2"
        align="center"
        sx={{ color: "text.secondary", mt: 2 }}
      >
        {t("signup.registration-clause")}
        <Link underline="always" color="text.primary" href="#">
          {t("signup.terms-service")}
        </Link>{" "}
        {t("conjunctions.and")}{" "}
        <Link underline="always" color="text.primary" href="#">
          {t("signup.privacy-policy")}
        </Link>
      </Typography>

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
