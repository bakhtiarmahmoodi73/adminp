// pages/FlowReceivePage.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks/redux';
import { RootState } from '../store';
import Tether from "../assets/images/tether/tether (2) 1.svg?react";
import PerMoney from "../assets/images/perfectmoney/Group 5.svg?react";

const FlowReceivePage: React.FC = () => {
  const navigate = useNavigate();
  const exchangeState = useAppSelector((state: RootState) => state.exchange);

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Receive Flow - دریافت شما
      </Typography>
      
      <Box sx={{ my: 4, p: 3, backgroundColor: '#1e1e1e', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          جزئیات تراکنش:
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, my: 2 }}>
          <Typography variant="h5">
            {exchangeState.fromAmount} 
          </Typography>
          {exchangeState.fromCurrency === 'tether' ? <Tether /> : <PerMoney />}
          <Typography variant="h5">
            {exchangeState.fromCurrency === 'tether' ? 'USDT' : 'Perfect Money'} →
          </Typography>
          <Typography variant="h5">
            {exchangeState.toAmount} 
          </Typography>
          {exchangeState.toCurrency === 'tether' ? <Tether /> : <PerMoney />}
          <Typography variant="h5">
            {exchangeState.toCurrency === 'tether' ? 'USDT' : 'Perfect Money'}
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ mt: 2 }}>
          ما مبلغ {exchangeState.toAmount} {exchangeState.toCurrency === 'tether' ? 'USDT' : 'Perfect Money'} را به آدرس زیر ارسال خواهیم کرد:
        </Typography>
        
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#2d2d2d', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            U12345678901234567890
          </Typography>
        </Box>
        
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#888' }}>
          (لطفاً آدرس خود را تأیید کنید)
        </Typography>
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/complete')}
        sx={{ mt: 3 }}
      >
        تأیید دریافت
      </Button>
    </Box>
  );
};

export default FlowReceivePage;