import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { theme } from '../../styles/theme';

type ButtonAppBarProp = {
  account: boolean
 }

export default function ButtonAppBar({ account } : ButtonAppBarProp) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: theme.color.secondary}}>
          <IconButton
            size="large"
            edge="start"
            color="success"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="success">{account ? `Logout` : `Login`}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}