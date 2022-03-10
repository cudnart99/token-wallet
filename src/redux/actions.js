
export const addWeb3Library = (data) => {
    return {
        type: 'addWeb3Library',
        payload: data
    }
}

export const addWeb3Account = (data) => {
    return {
        type: 'addWeb3Account',
        payload: data
    }
}
export const addWalletConnectProvider = (data) => {
    return {
        type: 'addWalletConnectProvider',
        payload: data
    }
}