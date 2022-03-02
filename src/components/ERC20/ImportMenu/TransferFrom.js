import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import Web3 from "web3/dist/web3.min.js";
const web3 = new Web3(window.ethereum);

const { applyDecimals } = require("../../../utils/ethereumAPI");

const TransferFrom = ({ web3Token, refreshDataGrid, tokenData }) => {
  const symbol = tokenData.find((x) => x.name === "Symbol").value;
  const decimals = tokenData.find((x) => x.name === "Decimals").value;

  const [data, setData] = useState({
    arg1: "",
    arg2: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const onClickTransferFrom = async () => {
    setData({ ...data, loading: true });

    let errorMessage = "";
    let successMessage = "";
    try {
      const accounts = await web3.eth.getAccounts();
      const amountToApprove = applyDecimals(data.arg2, decimals, "positive");
      await web3Token.methods
        .transferFrom(data.arg1, data.arg3, amountToApprove)
        .send({ from: accounts[0] });
      successMessage = `Transfer successful. ${data.arg2} ${symbol} added to ${data.arg1}`;

      // Refresh the token info to update the wallet balance
      refreshDataGrid();
    } catch (error) {
      errorMessage = error.message;
    }

    setData({ ...data, loading: false, errorMessage, successMessage });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          color="success"
          variant="contained"
          sx={{ m: 1 }}
          onClick={(e) => onClickTransferFrom()}
          disabled={data.loading}
        >
          {data.loading ? (
            <CircularProgress size={25} />
          ) : (
            "Transfer from (address from, address to, uint256 value)"
          )}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="From"
          sx={{ m: 1, width: "50ch" }}
          size="small"
          placeholder="0x0000000000000000000000000000000000000000"
          onChange={(e) =>
            setData({
              ...data,
              arg1: e.target.value,
              errorMessage: "",
              successMessage: "",
            })
          }
          InputLabelProps={{ shrink: true }}
          disabled={data.loading}
        />
        <TextField
          label="To"
          sx={{ m: 1, width: "50ch" }}
          size="small"
          placeholder="0x0000000000000000000000000000000000000000"
          onChange={(e) =>
            setData({
              ...data,
              arg3: e.target.value,
              errorMessage: "",
              successMessage: "",
            })
          }
          InputLabelProps={{ shrink: true }}
          disabled={data.loading}
        />
        <TextField
          label="Value"
          sx={{ m: 1, width: "30ch" }}
          size="small"
          placeholder="1"
          type="number"
          onChange={(e) =>
            setData({
              ...data,
              arg2: e.target.value,
              errorMessage: "",
              successMessage: "",
            })
          }
          InputLabelProps={{ shrink: true }}
          disabled={data.loading}
        />
      </Grid>
      <Grid item xs={12}>
        {data.errorMessage && (
          <Alert
            severity="error"
            onClose={() => setData({ ...data, errorMessage: "" })}
          >
            {data.errorMessage}
          </Alert>
        )}
        {data.successMessage && (
          <Alert
            severity="success"
            onClose={() => setData({ ...data, successMessage: "" })}
          >
            {data.successMessage}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default TransferFrom;
