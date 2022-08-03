import { Container, Link, Box, Button, Stack } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Tab } from "@headlessui/react";
import Registration from "../../components/registration";
import Login from "../../components/login";
import { Fragment } from "react";
import { useRouter } from "next/router";

const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

export default function Signup() {
  const { query:{tab} } = useRouter()

  const { t } = useTranslation("common");
  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle boxShadow={`1px 1px 3px #d6c7c733`} borderRadius="5px">
          <HeadingStyle
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "100px",
                width: "100px",
              }}
            >
              <Link to="/">
                <Box
                  component={Image}
                  layout="fill"
                  src="/logo.png"
                  alt="logo"
                />
              </Link>
            </Box>
          </HeadingStyle>
          <Tab.Group defaultIndex={tab === "register"? 0 : 1 }>
            <Stack
              component={Tab.List}
              flexDirection="row"
              justifyContent="center"
              wdith="100%"
              margin="10px"
            >
              <Tab as={Fragment}>
                {({ selected }) => (
                  <Button
                    sx={{
                      backgroundColor: selected ? "#43bd6d" : "#F6F6F6",
                      padding: "5px",
                      margin: "0 5px",
                      color: selected ? "#fff" : "#1B2430",
                      "&:hover": {
                        backgroundColor: selected ? "#43bd6d" : "#efefef",
                      },
                    }}
                  >
                    Signup
                  </Button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <Button
                    sx={{
                      backgroundColor: selected ? "#43bd6d" : "#F6F6F6",
                      padding: "5px",
                      margin: "0 5px",
                      color: selected ? "#fff" : "#1B2430",
                      "&:hover": {
                        backgroundColor: selected ? "#43bd6d" : "#efefef",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Tab>
            </Stack>

            <Tab.Panels>
              <Tab.Panel>
                <Registration />
              </Tab.Panel>
              <Tab.Panel>
                <Login />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
/**
 * 
 * 
 * 

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
 */
