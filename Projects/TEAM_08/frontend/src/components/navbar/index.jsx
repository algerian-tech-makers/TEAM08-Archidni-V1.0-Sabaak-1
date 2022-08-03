import React, { useTransition } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Stack,
  Typography,
  Button,
  Link as MuiLink,
  IconButton,
  Toolbar,
} from "@mui/material";
import { publicItems } from "../../constants/navigation";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "70px",
}));

export default function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <AppBar position="sticky">
      <StyledToolbar sx={{ paddingInline: { xs: "1rem", md: "4rem" } }}>
        <Stack
          direction="row"
          alignItems="center"
          color="inherit"
          gap={2}
          sx={{ textDecoration: "none" }}
        >
          {/* <Avatar alt="Logo" src={logo} sx={{ width: 50, height: 50 }} /> */}
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
            <MuiLink
              key={title}
              color="inherit"
              component={NextLink}
              underline="none"
              sx={{ fontSize: "1.2rem" }}
              href={path}
            >
              {t(title)}
            </MuiLink>
          ))}
        </Stack>
        <Box>
          <Button
            color="info"
            variant="contained"
            disableElevation
            sx={{ mx: { lg: 1 }, ml: { xs: "auto" } }}
            onClick={() => router.push("/auth?tab=register")}
          >
            {t("buttons.signup")}
          </Button>
          <Button
            color="error"
            variant="contained"
            disableElevation
            sx={{ mx: 1 }}
            onClick={() => router.push("/auth?tab=login")}
          >
            {t("buttons.login")}
          </Button>
          <IconButton
            color="inherit"
            sx={{ mx: 1, display: { xs: "inline-block", lg: "none" } }}
          ></IconButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
