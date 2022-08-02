import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import BannerImg from '../assets/images/banner.png';
export default function Banner() {
  return (
    <Box bgcolor="#f9f9f9">
      <Stack
        direction="row"
        sx={{ py: 6 }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box
          sx={{
            color: '#1f2b3e',
            maxWidth: '60ch',
          }}
        >
          <Typography
            variant="h3"
            lineHeight={1.2}
            sx={{
              fontWeight: 'bold',
              textAlign: { xs: 'center', md: 'start' },
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
              fontSize: '1.2rem',
              textAlign: { xs: 'center', md: 'start' },
            }}
          >
            عن عائشة -رضي الله عنها- قالتْ: قالَ رسولُ اللهِ -صلى الله عليه
            وسلم-: «الذي يقرَأُ القرآنَ وهو مَاهِرٌ به مع السَّفَرَةِ الكِرَامِ
            البَرَرَةِ، والذي يقرَأُ القرآنَ ويَتَتَعْتَعُ فيه وهو عليه شَاقٌ
            لَهُ أجْرَانِ».
          </Typography>
          <Stack direction="row" justifyContent="stretch">
            <Button
              variant="contained"
              color="success"
              sx={{
                fontSize: '1.7rem',
                my: '2rem',
                px: '3rem',
                borderRadius: 50,
                flex: 1,
              }}
            >
              أَقْرَب مَدْرَسَةٍ
            </Button>
            <Button
              variant="outlined"
              color="success"
              sx={{
                fontSize: '1.7rem',
                my: '2rem',
                px: '3rem',
                mx: 2,
                borderWidth: '2px',
                borderRadius: 50,
                flex: 1,
              }}
            >
              اِدْعَمْنَا
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <img src={BannerImg} alt="banner" className="img-fluid" width="250" />
        </Box>
      </Stack>
    </Box>
  );
}
