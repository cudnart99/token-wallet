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

const MinterConsensus = ({ web3Token, tokenData, refreshDataGrid,setColor }) => {
  // const symbol = tokenData.find(x => x.name === "Symbol").value;
  // const decimals = tokenData.find(x => x.name === "Decimals").value;

  const [data1, setData1] = useState({
    arg1: "",
    arg2: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const [data2, setData2] = useState({
    arg1: "",
    arg2: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const onClickConsensus = async () => {
    setData1({ ...data1, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      await web3Token.methods.minterConsensus().send({ from: accounts[0] });
      successMessage = `Consensus successful.`;
      refreshDataGrid();
      setColor()
    }
    catch (error) {
      errorMessage = error.message;
    }

    setData1({ ...data1, loading: false, errorMessage, successMessage });
  };

  const onClickReject = async () => {
    setData2({ ...data2, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      await web3Token.methods.minterReject().send({ from: accounts[0] });
      successMessage = `Reject successful.`;
      refreshDataGrid();
    } catch (error) {
      errorMessage = error.message;
    }

    setData2({ ...data2, loading: false, errorMessage, successMessage });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          color="success"
          variant="contained"
          sx={{ m: 1 }}
          onClick={(e) => onClickConsensus()}
          disabled={data1.loading}
        >
          {data1.loading ? <CircularProgress size={25} /> : "Minter Consensus"}
        </Button>
        <Button
          color="success"
          variant="contained"
          sx={{ m: 1 }}
            onClick={(e) => onClickReject()}
          disabled={data2.loading}
        >
          {data2.loading ? <CircularProgress size={25} /> : "Minter Reject"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {data1.errorMessage && (
          <Alert
            severity="error"
            onClose={() => setData1({ ...data1, errorMessage: "" })}
          >
            {data1.errorMessage}
          </Alert>
        )}
        {data1.successMessage && (
          <Alert
            severity="success"
            onClose={() => setData1({ ...data1, successMessage: "" })}
          >
            {data1.successMessage}
          </Alert>
        )}
      </Grid>
      <Grid item xs={12}>
        {data2.errorMessage && (
          <Alert
            severity="error"
            onClose={() => setData2({ ...data2, errorMessage: "" })}
          >
            {data2.errorMessage}
          </Alert>
        )}
        {data2.successMessage && (
          <Alert
            severity="success"
            onClose={() => setData2({ ...data2, successMessage: "" })}
          >
            {data2.successMessage}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default MinterConsensus;
