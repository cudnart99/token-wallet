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

const RenounceOwnership = ({ web3Token, tokenData, refreshDataGrid }) => {

  const [data, setData] = useState({
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const onClickRenounce = async () => {
    setData({ ...data, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      await web3Token.methods.renounceOwnership().send({ from: accounts[0] });
      successMessage = `Renounce successful. The contract has no owner now`;
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
          onClick={(e) => onClickRenounce()}
          disabled={data.loading}
        >
          {data.loading ? (
            <CircularProgress size={25} />
          ) : (
            "Renounce Ownership"
          )}
        </Button>
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

export default RenounceOwnership;
