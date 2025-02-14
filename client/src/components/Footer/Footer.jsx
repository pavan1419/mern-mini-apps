import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  useTheme,
  IconButton,
  Stack,
  Divider,
  Tooltip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

const Footer = () => {
  const theme = useTheme();

  const MotionIconButton = motion(IconButton);

  return (
    <Box
      component='footer'
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth='md'>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2 }}
          divider={<Divider orientation='vertical' flexItem />}
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            Made with{' '}
            <FavoriteIcon sx={{ fontSize: 16, color: 'error.main' }} /> by
            <Link
              href='https://pavan1419.vercel.app/'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Pavan
            </Link>
          </Typography>

          <Stack direction='row' spacing={1}>
            <Tooltip title='GitHub'>
              <MotionIconButton
                component='a'
                href='https://github.com/pavan1419'
                target='_blank'
                rel='noopener noreferrer'
                size='small'
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  },
                }}
              >
                <GitHubIcon fontSize='small' />
              </MotionIconButton>
            </Tooltip>

            <Tooltip title='Portfolio'>
              <MotionIconButton
                component='a'
                href='https://pavan1419.vercel.app/'
                target='_blank'
                rel='noopener noreferrer'
                size='small'
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  },
                }}
              >
                <LanguageIcon fontSize='small' />
              </MotionIconButton>
            </Tooltip>
          </Stack>

          <Typography variant='caption' color='text.secondary'>
            © {new Date().getFullYear()}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
