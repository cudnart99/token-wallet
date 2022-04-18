import { useState } from 'react'
import { Grid, TextField, Button, Alert, Typography } from '@mui/material'
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';

const { applyDecimals } = require('../../../utils/ethereumAPI');

const CheckTimeLock = ({ web3Token, tokenData }) => {
    const decimals = tokenData.find(x => x.name === "Decimals").value;
    const [data, setData] = useState({ arg1: '', errorMessage: '', result: '' });

    const onClickBalanceOf = async () => {
        let rawBalance;
        try {
            rawBalance = await web3Token.methods.checkTimeLock(data.arg1).call();
            // console.log(rawBalance,"rawBalance");
        } catch (error) {
            setData({ ...data, errorMessage: error.message });
            return;
        }
        setData({ ...data, result: rawBalance });
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={(e) => onClickBalanceOf()}
                >
                    Check Time Lock
                </Button>
                <Typography variant="subtitle1" noWrap display="inline" component="div" sx={{ m: 1 }}>
                    Result:
                </Typography> giây
                <TextField
                    sx={{ m: 1, width: '30ch' }}
                    size="large"
                    value={data.result}
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Owner"
                    sx={{ m: 1, width: '50ch' }}
                    size="small"
                    placeholder="0x"
                    onChange={(e) => setData({ arg1: e.target.value, result: '', errorMessage: '' })}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12}>
                {data.errorMessage &&
                    <Alert
                        severity="error"
                        onClose={() => setData({ ...data, errorMessage: "" })}>
                        {data.errorMessage}
                    </Alert>
                }
            </Grid>
        </Grid>
    )
}

export default CheckTimeLock