import React from 'react';
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
} from '@mui/material';
import logo from '../assets/images/logo.png';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { publicItems } from '../constants/navigation';
import { Menu } from '@mui/icons-material';
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '70px',
}));

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky">
      <StyledToolbar sx={{ paddingInline: { xs: '1rem', md: '4rem' } }}>
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
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        >
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
            sx={{ mx: { lg: 1 }, ml: { xs: 'auto' } }}
            onClick={() => navigate('/register')}
          >
            إنشاء حساب
          </Button>
          <Button
            color="error"
            variant="contained"
            disableElevation
            sx={{ mx: 1 }}
            onClick={() => navigate('/login')}
          >
            تسجيل الدخول
          </Button>
          <IconButton
            color="inherit"
            sx={{ mx: 1, display: { xs: 'inline-block', lg: 'none' } }}
          >
            <Menu />
          </IconButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
