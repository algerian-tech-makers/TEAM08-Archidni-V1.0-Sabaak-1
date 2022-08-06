import React from "react";
import {
  AppBar,
  Box,
  Stack,
  Typography,
  IconButton,
  Toolbar,
  Avatar,
} from "@mui/material";
import { publicItems } from "../../constants/navigation";
import styled from "@emotion/styled";
import { useTranslation } from "next-i18next";

import { Link } from "../Link";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "70px",
}));

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky">
      <StyledToolbar sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}>
        <Stack
          direction="row"
          alignItems="center"
          color="inherit"
          gap={2}
          sx={{ textDecoration: "none" }}
          component={Link}
          href="/"
        >
       

          <Avatar alt="Logo" src={`/logo.png`} sx={{ width: 50, height: 50 }} />
          <Typography
            variant="h5"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            دليل المدارس القرآنية
          </Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          {publicItems.map(({ title, path }) => (
            <Link
              key={title}
              color="inherit"
              underline="none"
              sx={{ fontSize: "1.2rem" }}
              href={path}
            >
              {t(`navbar.${title}`)}
            </Link>
          ))}
        </Stack>
        <Box>
          <Link
            color="info"
            variant="contained"
            disableElevation
            sx={{ mx: { lg: 1 }, ml: { xs: "auto" } }}
            href="/auth?tab=signup"
            as="button"
          >
            {t("buttons.signup")}
          </Link>
          <Link
            color="error"
            variant="contained"
            disableElevation
            sx={{ mx: 1 }}
            as="button"
            href="/auth?tab=login"
          >
            {t("buttons.login")}
          </Link>
          <IconButton
            color="inherit"
            sx={{ mx: 1, display: { xs: "inline-block", lg: "none" } }}
          ></IconButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
