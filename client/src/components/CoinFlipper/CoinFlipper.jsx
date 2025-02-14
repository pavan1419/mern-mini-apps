import React, { useState, useCallback } from 'react';
import { Container, Card, CardContent, useTheme } from '@mui/material';
import CoinFlipperHeader from './components/CoinFlipperHeader';
import CoinDisplay from './components/CoinDisplay';
import FlipStatistics from './components/FlipStatistics';
import FlipControls from './components/FlipControls';

const CoinFlipper = () => {
  const theme = useTheme();
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const flipCoin = useCallback(() => {
    setFlipping(true);
    const audio = new Audio('/coin-flip-sound.mp3'); // Add a coin flip sound
    audio.play();

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(outcome);
      setFlipping(false);
      setFlipCount((prev) => prev + 1);
      setStats((prev) => ({
        ...prev,
        [outcome.toLowerCase()]: prev[outcome.toLowerCase()] + 1,
      }));
    }, 1000);
  }, []);

  const resetGame = useCallback(() => {
    setResult(null);
    setFlipCount(0);
    setStats({ heads: 0, tails: 0 });
  }, []);

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
          <CoinFlipperHeader flipCount={flipCount} onReset={resetGame} />
          <CoinDisplay result={result} flipping={flipping} />
          <FlipStatistics stats={stats} flipCount={flipCount} />
          <FlipControls flipping={flipping} onFlip={flipCoin} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CoinFlipper;
