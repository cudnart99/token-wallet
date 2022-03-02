import React from "react";
import {Box} from '@mui/system';
import {CssBaseline, Divider, Drawer, List, ListItemButton, ListItemText, Typography} from '@mui/material';
import {AppBar, Toolbar} from '@mui/material';
import ERC20App from "./ERC20/ERC20App";

const AppAuthenticated = () => {
    const drawerWidth = 240;

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline/>
            <AppBar
            position="fixed"
            sx={{width: `calc(100% - ${drawerWidth}px)`, ml:`${drawerWidth}px`}}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    IVIRSE Token Wallet
                </Typography>
            </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="permanent"
                anchor="left">
                <Toolbar />
                <Divider />
                <List>
                    <ListItemButton>
                        <ListItemText primary="IVIRSE Coin"/>
                    </ListItemButton>
                </List>
            </Drawer>
            <Box
                 component="main"
                 sx={{flexGrow: 1, bgcolor:"Background".default, p:3}}>
                 <Toolbar/>
                 <ERC20App/>
            </Box>
        </Box>

    )
}

export default AppAuthenticated