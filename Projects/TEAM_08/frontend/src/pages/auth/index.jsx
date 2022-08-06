import { Container, Link, Box, Button, Stack } from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Tab } from "@headlessui/react";
import Signup from "components/signup";
import Login from "components/login";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import MainLayout from "layout/main";

const RootStyle = styled("div")({
  height: "100%",
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

export default function Authentication() {
  const {
    query: { tab },
    push,
  } = useRouter();

  const x = useSelector((state) => state.auth.token);
  console.log(x);
  const { t } = useTranslation("common");
  return (
    <MainLayout  title="authentication">
      <RootStyle>
        <Container
          maxWidth="sm"
          sx={{
            padding: "50px 0",
          }}
        >
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
            <Tab.Group
              defaultIndex={tab === "signup" ? 0 : tab === "login" ? 1 : 0}
            >
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
                      onClick={() => push("?tab=signup")}
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
                      onClick={() => push("?tab=login")}
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
                  <Signup />
                </Tab.Panel>
                <Tab.Panel>
                  <Login />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </ContentStyle>
        </Container>
      </RootStyle>
    </MainLayout>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
