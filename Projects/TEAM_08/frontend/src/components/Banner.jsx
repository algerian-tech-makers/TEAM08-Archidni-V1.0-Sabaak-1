import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

export default function Banner() {
  return (
    <Box bgcolor="#f9f9f9">
      <Stack sx={{ px: 12, py: 3 }}>
        <Box sx={{ color: '#1f2b3e', maxWidth: '60ch', padding: 3 }}>
          <Typography variant="h3" lineHeight={1.2} sx={{ fontWeight: 'bold' }}>
            اَلْقُرْآن هُوَ نُورُ اَلْحَيَاةِ ،<br /> فَابَحَثَ عَنْهُ حَتَّى
            تُنِيرَ حَيَاتَكَ.
          </Typography>
          <Typography
            variant="h6"
            lineHeight={1.7}
            color="#465162"
            sx={{ mt: 2, fontSize: '1.2rem' }}
          >
            عن عائشة -رضي الله عنها- قالتْ: قالَ رسولُ اللهِ -صلى الله عليه
            وسلم-: «الذي يقرَأُ القرآنَ وهو مَاهِرٌ به مع السَّفَرَةِ الكِرَامِ
            البَرَرَةِ، والذي يقرَأُ القرآنَ ويَتَتَعْتَعُ فيه وهو عليه شَاقٌ
            لَهُ أجْرَانِ».
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{
              fontSize: '1.7rem',
              my: '2rem',
              px: '3rem',
              borderRadius: 50,
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
            }}
          >
            اِدْعَمْنَا
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
