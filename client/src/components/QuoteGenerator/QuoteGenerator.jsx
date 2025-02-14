import React, { useState, useCallback } from 'react';
import { Container, Card, CardContent, useTheme } from '@mui/material';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteControls from './components/QuoteControls';
import QuoteCategories from './components/QuoteCategories';
import LoadingQuote from './components/LoadingQuote';

const QuoteGenerator = () => {
  const theme = useTheme();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('inspiration');

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://mern-mini-apps.onrender.com/api/quotes/random${
          category ? `?category=${category}` : ''
        }`
      );
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

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
          <QuoteCategories category={category} onCategoryChange={setCategory} />
          {loading ? <LoadingQuote /> : <QuoteDisplay quote={quote} />}
          <QuoteControls onFetch={fetchQuote} loading={loading} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuoteGenerator;
