// src/components/Layout.tsx
import { Container, Box } from '@mui/material';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        m: 0,
        p: 0,
      }}
    >
      {/* همیشه Header */}
      <Header />

      {/* Main Content */}
      <Container
        component="main"
        disableGutters
        sx={{
          flex: 1,
          p: 0,         // بدون padding
          m: 0,         // بدون margin
          width: '100%',
          maxWidth: '100% !important',
        }}
      >
        <Outlet />  {/* Route فعلی اینجا رندر می‌شود */}
      </Container>

      {/* همیشه Footer */}
      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
