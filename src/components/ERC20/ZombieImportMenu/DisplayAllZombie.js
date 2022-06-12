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

const DisplayAllZombie = ({ web3ZombieContract, refreshDataGrid }) => {
  //   console.log(web3ZombieContract,"helo123")
  const web3 = useSelector((state) => state.web3Library);
  const [data, setData] = useState({
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
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      let results = await web3ZombieContract.methods
        .getZombiesInitialized()
        .call();
      console.log(results, "helo123");
      successMessage = "Display successfull";
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
          {data.loading ? <CircularProgress size={25} /> : "Display All Zombie"}
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

export default DisplayAllZombie;
