import React from "react";
import { useState } from "react";
import { Button, Grid, TextField} from "@mui/material";

const ERC20MainMenu = ({onClickCreate}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="contained"
                        sx={{ m: 1}}
                        onClick = {() => onClickCreate()}
                >
                    Create token
                </Button>
            </Grid>
        </Grid>
    )
}

export default ERC20MainMenu