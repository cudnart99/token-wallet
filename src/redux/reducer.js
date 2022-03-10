const initState = {
    web3Library: null,
    web3Account: "",
    walletConnectProvider: null,
};

const rootReducer = (state = initState, action) => {
    // console.log({state, action});
    switch (action.type) {
        case "addWeb3Library":
            return {
                ...state,
                web3Library: action.payload,
            };
        case "addWeb3Account":
            return {
                ...state,
                web3Account: action.payload,
            };
        case "addWalletConnectProvider":
            return {
                ...state,
                walletConnectProvider: action.payload,
            };

        default:
            return state;
    }
};

export default rootReducer;
