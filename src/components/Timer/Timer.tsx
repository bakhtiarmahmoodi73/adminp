// Timer.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

interface TimeLeft {
  minutes: number;
  seconds: number;
}

// کانتینر اصلی - کاملاً مشابه عکس
const TimerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F3F3F3',
  borderRadius: '20px',
  padding: '32px 40px',
  width: 'fit-content',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
  background: 'linear-gradient(145deg, #f0f0f0, #f8f8f8)',
});

// عنوان بالایی
const TimeLabel = styled(Box)({
  fontSize: '22px',
  fontWeight: '700',
  color: '#2C3E50',
  marginBottom: '30px',
  letterSpacing: '0.5px',
  textAlign: 'center',
  fontFamily: "'Arial Rounded MT Bold', 'Arial', sans-serif",
  textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.8)',
});

// بخش نمایش اعداد زمان
const TimeDisplay = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginBottom: '28px',
});

// مستطیل نمایش عدد (دقیقه/ثانیه)
const TimeBox = styled(Box)({
  width: '85px',
  height: '100px',
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 
    '0 6px 12px rgba(0, 0, 0, 0.08), ' +
    'inset 0 1px 0 rgba(255, 255, 255, 0.9), ' +
    'inset 0 -1px 0 rgba(0, 0, 0, 0.05)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '0',
    right: '0',
    height: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    zIndex: 1,
  },
});

// عدد بزرگ
const TimeNumber = styled(Box)({
  fontSize: '58px',
  fontWeight: '800',
  color: '#2C3E50',
  fontVariantNumeric: 'tabular-nums',
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
  letterSpacing: '1px',
  lineHeight: '1',
  textShadow: '1px 1px 1px rgba(0, 0, 0, 0.05)',
  marginTop: '-5px',
});

// برچسب زیر عدد
const TimeUnitLabel = styled(Box)({
  fontSize: '12px',
  fontWeight: '600',
  color: '#7F8C8D',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginTop: '5px',
  fontFamily: "'Arial', sans-serif",
  position: 'absolute',
  bottom: '10px',
});

// دو نقطه وسط
const ColonSeparator = styled(Box)({
  fontSize: '58px',
  fontWeight: '700',
  color: '#2C3E50',
  margin: '0 6px',
  lineHeight: '1',
  paddingBottom: '8px',
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
  textShadow: '1px 1px 1px rgba(0, 0, 0, 0.05)',
});

// خط زیرین با اطلاعات اضافی
const BottomInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  marginTop: '15px',
  paddingTop: '15px',
  borderTop: '2px solid rgba(0, 0, 0, 0.06)',
  width: '100%',
});

// مربع خاکستری
const GraySquare = styled(Box)({
  width: '28px',
  height: '28px',
  backgroundColor: '#E0E0E0',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 
    'inset 0 1px 2px rgba(0, 0, 0, 0.1), ' +
    '0 1px 0 rgba(255, 255, 255, 0.6)',
});

// عدد داخل مربع
const SquareNumber = styled(Box)({
  fontSize: '16px',
  fontWeight: '700',
  color: '#2C3E50',
  fontFamily: "'Arial', sans-serif",
});

// علامت ضربدر
const MultiplySign = styled(Box)({
  fontSize: '16px',
  fontWeight: '600',
  color: '#34495E',
  margin: '0 2px',
  fontFamily: "'Arial', sans-serif",
});

const Timer: React.FC<TimerProps> = ({ 
  initialMinutes = 9, 
  initialSeconds = 59 
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  const decrementTimer = useCallback(() => {
    setTimeLeft(prev => {
      if (prev.minutes === 0 && prev.seconds === 0) {
        return { minutes: 0, seconds: 0 };
      }

      if (prev.seconds === 0) {
        return {
          minutes: prev.minutes - 1,
          seconds: 59
        };
      }

      return {
        minutes: prev.minutes,
        seconds: prev.seconds - 1
      };
    });
  }, []);

  useEffect(() => {
    const timerId = setInterval(decrementTimer, 1000);
    return () => clearInterval(timerId);
  }, [decrementTimer]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <TimerContainer>
      <TimeLabel>Time For Payment</TimeLabel>
      
      <TimeDisplay>
        <TimeBox>
          <TimeNumber>{formatNumber(timeLeft.minutes)}</TimeNumber>
          <TimeUnitLabel>Min</TimeUnitLabel>
        </TimeBox>
        
        <ColonSeparator>:</ColonSeparator>
        
        <TimeBox>
          <TimeNumber>{formatNumber(timeLeft.seconds)}</TimeNumber>
          <TimeUnitLabel>Sec</TimeUnitLabel>
        </TimeBox>
      </TimeDisplay>
      
      <BottomInfo>
        <GraySquare>
          <SquareNumber>7</SquareNumber>
        </GraySquare>
        <MultiplySign>×</MultiplySign>
        <GraySquare>
          <SquareNumber>7</SquareNumber>
        </GraySquare>
      </BottomInfo>
    </TimerContainer>
  );
};

export default Timer;