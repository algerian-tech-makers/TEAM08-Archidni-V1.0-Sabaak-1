import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import MuiButton from "@mui/material/Button";

export  function Link({ as, href, children, ...props }) {
  if (as === "link" || !as) {
    return (
      <NextLink href={href} passHref>
        <MuiLink {...props}>{children}</MuiLink>
      </NextLink>
    );
  } else if (as === "button") {
    return (
      <NextLink href={href} passHref>
        <MuiButton {...props}>{children}</MuiButton>
      </NextLink>
    );
  }
}
