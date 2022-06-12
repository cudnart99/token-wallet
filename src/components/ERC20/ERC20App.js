import { useState, useEffect } from "react";
import { Link, Box } from "@mui/material";
import ERC20Create from "./ERC20Create";
import ERC20MainMenu from "./ERC20MainMenu";
import ERC20Import from "./ERC20Import";
import { useDispatch, useSelector } from "react-redux";
// import { address } from "./../TokenAddress/tokenAdress";
import {addTokenAddress} from "../../redux/actions";

const Menu = {
    Default: 0,
    Create: 1,
    Import: 2,
};
const ERC20App = () => {
    const [menu, setMenu] = useState(Menu.Main);
    const [tokenAddress, setTokenAddress] = useState("");
    const dispatch = useDispatch();
    // const test = useSelector((state) => state.chainId);
    // console.log(test);
    // const [chainId, setChainId] = useState(
    //     useSelector((state) => state.chainId)
    // );

    // useEffect(() => {
    //     console.log("test update", test);
    // }, [test]);

    const onClickCreate = () => setMenu(Menu.Create);
    // const importToken = (address) => {
        // setTokenAddress(address);
        // setMenu(Menu.Import);
    // };
    const onClickLogin = async (address) => {
        // setTokenAddress(address);
        await dispatch(addTokenAddress("0xF532C78dB5f5177C772266bF1E4280696bE6b34E"));
        // console.log("test", useSelector((state) => state.tokenAddress));
        setMenu(Menu.Import);
    };
    return (
        <div>
            {/* <div>{`test ${test}`}</div> */}
            {menu !== Menu.Main && (
                <Box sx={{ heigh: "5ch" }}>
                    <Link
                        href="#"
                        onClick={() => setMenu(Menu.Main)}
                        sx={{ m: 1 }}
                    >
                        Back
                        {/* {`Back`} */}
                    </Link>
                </Box>
            )}
            {menu === Menu.Main && (
                <ERC20MainMenu
                    onClickCreate={onClickCreate}
                    onClickLogin={onClickLogin}
                />
            )}
            {menu === Menu.Create && <ERC20Create/>}
            {menu === Menu.Import && (
                <ERC20Import/>
            )}
        </div>
    );
};

export default ERC20App;
    