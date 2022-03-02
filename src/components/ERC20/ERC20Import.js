import { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BalanceOf from "./ImportMenu/BalanceOf";
import Transfer from "./ImportMenu/Transfer";
import Mint from "./ImportMenu/Mint";
import Approve from "./ImportMenu/Approve";
import Burn from "./ImportMenu/Burn";
import TransferOwnership from "./ImportMenu/TransferOwnership";
import Web3 from "web3/dist/web3.min.js"; // webpack < 5
import AddMinter from "./ImportMenu/AddMinter";
import RemoveMinter from "./ImportMenu/RemoveMinter";
import MinterConsensus from "./ImportMenu/MinterConsensus";
import MintConsensus from "./ImportMenu/MintConsensus";
import RenounceOwnership from "./ImportMenu/RenounceOwnership";
import Allowance from "./ImportMenu/Allowance";
import IncreaseAllowance from "./ImportMenu/IncreaseAllowance";
import DecreaseAllowance from "./ImportMenu/DecreaseAllowance";
import TransferFrom from "./ImportMenu/TransferFrom";
const web3 = new Web3(window.ethereum);

const ERC20Token = require("./ERC20Token");
const { applyDecimals } = require("../../utils/ethereumAPI");

const ERC20Import = ({ tokenAddress }) => {
  const web3Token = new web3.eth.Contract(ERC20Token.abi, tokenAddress);
  const [tokenRefresh, setTokenRefresh] = useState(0);
  const [logMessage, setLogMessage] = useState("");
  const [tokenData, setTokenData] = useState([
    { id: 0, name: "Address", value: tokenAddress },
    { id: 1, name: "Name", value: "" },
    { id: 2, name: "Symbol", value: "" },
    { id: 3, name: "TotalSupply", value: "" },
    { id: 4, name: "Decimals", value: "" },
    { id: 5, name: "Current balance", value: "" },
    { id: 6, name: "Max Supply (Add)", value: "" },
    { id: 7, name: "Owner address (Add)", value: "" },
  ]);
  // const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [color, setColor] = useState("red");
  const [acc, setAcc] = useState("");

  const columns = [
    { field: "name", headerName: "Token", width: 200 },
    { field: "value", headerName: "Value", width: 500 },
  ];

  useEffect(() => {
    async function fetchData() {
      const web3Token = new web3.eth.Contract(ERC20Token.abi, tokenAddress);
      const name = await web3Token.methods.name().call();
      const symbol = await web3Token.methods.symbol().call();
      const totalSupply = await web3Token.methods.totalSupply().call();
      const decimals = await web3Token.methods.decimals().call();
      const maxSupply = await web3Token.methods.maxSupply().call();
      const owner = await web3Token.methods.owner().call();

      const accounts = await web3.eth.getAccounts();
      const currentBalance = await web3Token.methods
        .balanceOf(accounts[0])
        .call();
      const listMinter = await web3Token.methods.getMinters().call();
      // setList(listMinter);
      console.log("accounts", accounts);
      console.log("listMinter", listMinter);

      setTokenData((tokenData) => [
        tokenData[0],
        { ...tokenData[1], value: name },
        { ...tokenData[2], value: symbol },
        { ...tokenData[3], value: applyDecimals(totalSupply, decimals) },
        { ...tokenData[4], value: decimals },
        { ...tokenData[5], value: applyDecimals(currentBalance, decimals) },
        { ...tokenData[6], value: applyDecimals(maxSupply, decimals) },
        { ...tokenData[7], value: owner },
      ]);
    }
    fetchData();
  }, [tokenAddress, tokenRefresh]);

  async function GetAccounts() {
    const accounts = await web3.eth.getAccounts();
    setAcc(accounts);
  }

  const refreshDataGrid = () => setTokenRefresh((t) => ++t);

  async function GetList() {
    const listMinter2 = await web3Token.methods.getMinters().call();
    setList2(listMinter2);
  }


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" noWrap component="div" sx={{ m: 1 }}>
            Token infor
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ height: "550px" }}>
          <DataGrid rows={tokenData} columns={columns}></DataGrid>
        </Grid>
      </Grid>

      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              color="success"
              variant="contained"
              sx={{ m: 1 }}
              onClick={(e) => GetAccounts()}
              // disabled={data1.loading}
            >
              Connected account
            </Button>
            <span> : {acc}</span>
          </Grid>
        </Grid>
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <RenounceOwnership
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <TransferOwnership
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>

      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <Burn
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <BalanceOf web3Token={web3Token} tokenData={tokenData} />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <Transfer
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <Mint
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <AddMinter
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <RemoveMinter
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <MinterConsensus
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              color="success"
              variant="contained"
              sx={{ m: 1 }}
              onClick={(e) => GetList()}
            >
              Get list Minter
            </Button>
            {list2.map((item, index) => {
              return (
                <div key={index} style={{ color: `blue` }}>
                  {item}
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <MintConsensus
          web3Token={web3Token}
          tokenData={tokenData}
          refreshDataGrid={refreshDataGrid}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <Approve
          web3Token={web3Token}
          refreshDataGrid={refreshDataGrid}
          tokenData={tokenData}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <Allowance
          web3Token={web3Token}
          refreshDataGrid={refreshDataGrid}
          tokenData={tokenData}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <IncreaseAllowance
          web3Token={web3Token}
          refreshDataGrid={refreshDataGrid}
          tokenData={tokenData}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <DecreaseAllowance
          web3Token={web3Token}
          refreshDataGrid={refreshDataGrid}
          tokenData={tokenData}
        />
      </Box>
      <Box border={1} sx={{ mt: 2, borderRadius: 1, borderColor: "LightGray" }}>
        <TransferFrom
          web3Token={web3Token}
          refreshDataGrid={refreshDataGrid}
          tokenData={tokenData}
        />
      </Box>
    </div>
  );
};

export default ERC20Import;
