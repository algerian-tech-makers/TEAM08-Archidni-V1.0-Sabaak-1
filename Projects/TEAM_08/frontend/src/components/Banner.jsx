import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import BannerImg from '../assets/images/banner.png';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const RoundedButton = styled(Button)(() => ({
  fontSize: '1.7rem',
  marginBlock: '2rem',
  borderWidth: '2px',
  borderRadius: '50px',
  flex: 1,
}));

export default function Banner() {
  const navigate = useNavigate();
  return (
    <Box bgcolor="#f9f9f9">
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <Box
          sx={{
            my: 6,
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
          <Stack direction="row" gap={2}>
            <RoundedButton
              variant="contained"
              color="success"
              onClick={() => navigate('/schools')}
            >
              أَقْرَب مَدْرَسَةٍ
            </RoundedButton>
            <RoundedButton variant="outlined" color="success">
              اِدْعَمْنَا
            </RoundedButton>
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
