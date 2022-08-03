import { Container } from "@mui/material";

export default function LayoutLogin({ children }) {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Container>
  );
}
