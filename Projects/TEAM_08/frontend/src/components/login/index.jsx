import { Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { LoginForm } from "../form/login-form";
import { Link } from "../Link";

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
        {t("signup.no-account")}{" "}
        <Link variant="subtitle2" href="/auth?tab=login">
          {t("buttons.login")}
        </Link>
      </Typography>
    </>
  );
}
