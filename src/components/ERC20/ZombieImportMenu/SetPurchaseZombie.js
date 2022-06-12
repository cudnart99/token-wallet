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

const SetPurchaseZombie = ({ web3ZombieContract, refreshDataGrid }) => {
  //   console.log(web3ZombieContract,"helo123")
  const { applyDecimals } = require("../../../utils/ethereumAPI");
  const web3 = useSelector((state) => state.web3Library);
  const [data, setData] = useState({
    arg1: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const onClick = async () => {
    setData({ ...data, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      const amount = applyDecimals(data.arg1, "", "positive");
      await web3ZombieContract.methods
        .setPurchaseZombie(amount)
        .send({ from: accounts[0] });
      successMessage = `Price for purchase zombie had been set successfully !!`;
      // test(accounts[0]);
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
          onClick={(e) => onClick()}
          disabled={data.loading}
          style={{ backgroundColor: "#e5a84d" }}
        >
          {data.loading ? (
            <CircularProgress size={25} />
          ) : (
            "Set price for purchase Zombie"
          )}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          sx={{ m: 1, width: "50ch" }}
          size="small"
          placeholder="Price"
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

export default SetPurchaseZombie;
