import React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Stack,
  Typography,
  Button,
  Link as MuiLink,
} from '@mui/material';
import logo from '../assets/images/logo.png';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { publicItems } from '../constants/navigation';

const StyledToolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '70px',
  padding: '0px 4rem',
}));

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Stack
          direction="row"
          alignItems="center"
          color="inherit"
          gap={2}
          sx={{ textDecoration: 'none' }}
          component={Link}
          to="/"
        >
          <Avatar alt="Logo" src={logo} sx={{ width: 50, height: 50 }} />
          <Typography
            variant="h5"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            دليل المدارس القرآنية
          </Typography>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center">
          {publicItems.map((item, index) => (
            <MuiLink
              key={index}
              color="inherit"
              underline="none"
              sx={{ fontSize: '1.2rem' }}
              href={item.path}
            >
              {item.title}
            </MuiLink>
          ))}
        </Stack>
        <Box>
          <Button
            color="info"
            variant="contained"
            disableElevation
            sx={{ mx: 2 }}
            onClick={() => navigate('/register')}
          >
            إنشاء حساب
          </Button>
          <Button
            color="error"
            variant="contained"
            disableElevation
            onClick={() => navigate('/login')}
          >
            تسجيل الدخول
          </Button>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
