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

const AttackZombie = ({ web3ZombieContract, refreshDataGrid }) => {
  //   console.log(web3ZombieContract,"helo123")
  const web3 = useSelector((state) => state.web3Library);
  const [data, setData] = useState({
    arg1: "",
    arg2: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });
  console.log(data.arg1, "data.arg1-Change");
  console.log(data.arg2, "data.arg2-Change");

  const onClick = async () => {
    setData({ ...data, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(data.arg1, "data.arg1");
      console.log(data.arg2, "data.arg2");
      //   const data.arg1 = parseInt(data.arg1);
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      let results = await web3ZombieContract.methods
        .attackZombie(parseInt(data.arg1), parseInt(data.arg2))
        .send({ from: accounts[0] });
      if (results) {
        successMessage = `You win , achieve 5 IVI`;
      } else {
        errorMessage = "You lose , your zombie cant attack in 5 minutes";
      }
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
          {data.loading ? <CircularProgress size={25} /> : "Attack !!!"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="ID zombie attack"
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
        <TextField
          label="ID zombie target"
          sx={{ m: 1, width: "50ch" }}
          size="small"
          placeholder="ID"
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

export default AttackZombie;
