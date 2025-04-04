import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import FinancialPolls from './components/FinancialPolls';
import SentimentAnalysis from './components/SentimentAnalysis';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#800020', // Burgundy 
    },
    secondary: {
      main: '#808080', // Financial green
    },
    background: {
      default: '#15202B',
      paper: '#192734',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8899A6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Simple auth check
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navbar />
          <Box sx={{ display: 'flex', flexGrow: 1, pt: 8 }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Feed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/polls"
                  element={
                    <ProtectedRoute>
                      <FinancialPolls />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sentiment"
                  element={
                    <ProtectedRoute>
                      <SentimentAnalysis />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
