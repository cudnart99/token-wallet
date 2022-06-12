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

const CreateNewZombie = ({ web3ZombieContract, refreshDataGrid }) => {
//   console.log(web3ZombieContract,"helo123")
  const web3 = useSelector((state) => state.web3Library);
  const [data, setData] = useState({
    arg1: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
  });

  const onClickCreate = async () => {
    setData({ ...data, loading: true });
    let errorMessage = "";
    let successMessage = "";

    try {
      const accounts = await web3.eth.getAccounts();
      // const amountToSend = applyDecimals(data.arg2, decimals, "positive");
      await web3ZombieContract.methods
        .createNewZombie(accounts[0], data.arg1)
        .send({ from: accounts[0] });
      successMessage = `Add successful. Zombie name ${data.arg1} had been add`;
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
          onClick={(e) => onClickCreate()}
          disabled={data.loading}
          style={{ backgroundColor: "#e5a84d" }}
        >
          {data.loading ? <CircularProgress size={25} /> : "Create Zombie"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Zombie Name"
          sx={{ m: 1, width: "50ch" }}
          size="small"
          placeholder="Name"
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

export default CreateNewZombie;
