import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
// import Web3 from "web3/dist/web3.min.js";
// const web3 = new Web3(window.ethereum);
import { useSelector } from "react-redux";

const SetStatusAttack = ({ web3ZombieContract, refreshDataGrid }) => {
  //   console.log(web3ZombieContract,"helo123")
  const web3 = useSelector((state) => state.web3Library);
  const [data, setData] = useState({
    arg1: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const onClickAttack = async () => {
    setData({ ...data, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      await web3ZombieContract.methods
        .setStatusAttack(data.arg1, true)
        .send({ from: accounts[0] });
      successMessage = `Change status to attack successful.`;
      refreshDataGrid();
    } catch (error) {
      errorMessage = error.message;
    }

    setData({ ...data, loading: false, errorMessage, successMessage });
  };

  const onClickDefense = async () => {
    setData({ ...data, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      await web3ZombieContract.methods
        .setStatusAttack(data.arg1, false)
        .send({ from: accounts[0] });
      successMessage = `Change status to defense successful.`;
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
          variant="contained"
          sx={{ m: 1 }}
          onClick={(e) => onClickAttack()}
          disabled={data.loading}
          style={{ backgroundColor: "#e5a84d" }}
        >
          {data.loading ? (
            <CircularProgress size={25} />
          ) : (
            "Change status to attack"
          )}
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={(e) => onClickDefense()}
          disabled={data.loading}
          style={{ backgroundColor: "#e5a84d" }}
        >
          {data.loading ? (
            <CircularProgress size={25} />
          ) : (
            "Change status to defense"
          )}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="ID zombie"
          sx={{ m: 1, width: "50ch" }}
          size="small"
          placeholder="ID"
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

export default SetStatusAttack;
