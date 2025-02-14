import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, useTheme } from '@mui/material';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import TimerModes from './components/TimerModes';
import TimerProgress from './components/TimerProgress';

const PomodoroTimer = () => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
  const [rounds, setRounds] = useState(0);

  const modes = {
    work: { label: 'Work', time: 25 * 60, color: 'primary.main' },
    shortBreak: { label: 'Short Break', time: 5 * 60, color: 'success.main' },
    longBreak: { label: 'Long Break', time: 15 * 60, color: 'secondary.main' },
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    const audio = new Audio('/timer-complete.mp3');
    audio.play();
    setIsRunning(false);
    if (mode === 'work') {
      setRounds((prev) => prev + 1);
      if (rounds + 1 >= 4) {
        switchMode('longBreak');
        setRounds(0);
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('work');
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].time);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setTimeLeft(modes[mode].time);
    setIsRunning(false);
  };

  return (
    <Container maxWidth='sm' sx={{ py: 4 }}>
      <Card
        elevation={theme.palette.mode === 'dark' ? 2 : 1}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <TimerModes mode={mode} modes={modes} onModeChange={switchMode} />
          <TimerProgress
            timeLeft={timeLeft}
            totalTime={modes[mode].time}
            color={modes[mode].color}
          />
          <TimerDisplay timeLeft={timeLeft} mode={mode} modes={modes} />
          <TimerControls
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default PomodoroTimer;
