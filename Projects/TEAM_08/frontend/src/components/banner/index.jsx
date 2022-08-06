import { Box, Button, Stack, Typography } from "@mui/material";

import styled from "@emotion/styled";
import Link from "next/link";

const RoundedButton = styled(Button)(() => ({
  fontSize: "1.7rem",
  marginBlock: "2rem",
  borderWidth: "2px",
  borderRadius: "50px",
  flex: 1,
}));

export default function Banner() {
  return (
    <Box bgcolor="#f9f9f9">
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <Box
          sx={{
            my: 6,
            color: "#1f2b3e",
            maxWidth: "60ch",
          }}
        >
          <Typography
            variant="h3"
            lineHeight={1.2}
            sx={{
              fontWeight: "bold",
              textAlign: { xs: "center", md: "start" },
            }}
          >
            اَلْقُرْآن هُوَ نُورُ اَلْحَيَاةِ ،<br /> فَابَحَثَ عَنْهُ حَتَّى
            تُنِيرَ حَيَاتَكَ.
          </Typography>
          <Typography
            variant="h6"
            lineHeight={1.7}
            color="#465162"
            sx={{
              mt: 2,
              fontSize: "1.2rem",
              textAlign: { xs: "center", md: "start" },
            }}
          >
            عن عائشة -رضي الله عنها- قالتْ: قالَ رسولُ اللهِ -صلى الله عليه
            وسلم-: «الذي يقرَأُ القرآنَ وهو مَاهِرٌ به مع السَّفَرَةِ الكِرَامِ
            البَرَرَةِ، والذي يقرَأُ القرآنَ ويَتَتَعْتَعُ فيه وهو عليه شَاقٌ
            لَهُ أجْرَانِ».
          </Typography>
          <Stack direction="row" gap={2}>
            <Button
              variant="contained"
              color="success"
              href="/schools"
              component="a"
              LinkComponent={Link}
            >
              أَقْرَب مَدْرَسَةٍ
            </Button>
            <RoundedButton variant="outlined" color="success">
              اِدْعَمْنَا
            </RoundedButton>
          </Stack>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
          }}
        ></Box>
      </Stack>
    </Box>
  );
}
