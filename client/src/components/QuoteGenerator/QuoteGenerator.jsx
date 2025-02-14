import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  useTheme,
  IconButton,
} from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteCategories from './components/QuoteCategories';
import QuoteControls from './components/QuoteControls';
import LoadingQuote from './components/LoadingQuote';
import { WishlistDrawer } from './components/WishlistDrawer';

const QuoteGenerator = () => {
  const theme = useTheme();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('inspiration');
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('quoteWishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('quoteWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleLikeToggle = (quote) => {
    setWishlist((prev) => {
      const exists = prev.some((q) => q._id === quote._id);
      if (exists) {
        return prev.filter((q) => q._id !== quote._id);
      }
      return [...prev, quote];
    });
  };

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
      <Card elevation={theme.palette.mode === 'dark' ? 2 : 1}>
        <CardContent sx={{ p: { xs: 2, sm: 3 }, position: 'relative' }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <BookmarksIcon />
          </IconButton>
          <QuoteCategories category={category} onCategoryChange={setCategory} />
          {loading ? (
            <LoadingQuote />
          ) : (
            <QuoteDisplay
              quote={quote}
              isLiked={wishlist.some((q) => q._id === quote?._id)}
              onLikeToggle={() => quote && handleLikeToggle(quote)}
            />
          )}
          <QuoteControls onFetch={fetchQuote} loading={loading} />
        </CardContent>
      </Card>

      <WishlistDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        wishlist={wishlist}
        onRemove={handleLikeToggle}
      />
    </Container>
  );
};

export default QuoteGenerator;
