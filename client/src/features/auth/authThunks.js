import { createAsyncThunk } from "@reduxjs/toolkit";

export const connectWallet = createAsyncThunk(
    "auth/connectWallet",
    async (__, { rejectWithValue }) => {
        try {
            if (!window.ethereum) {
                throw new Error("Metamask not installed");
            }
            const baseSepoliaChainId = "0x14a34"; // 84532 in hex

          const network = await window.ethereum.request({ method: "eth_chainId" });
          if (network !== baseSepoliaChainId) {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: baseSepoliaChainId }]
            })
          }
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("Chain Id: ", network)
            return {address: accounts[0], chainId: network}
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const autoConnectWallet = createAsyncThunk(
    "auth/autoConnectWallet",
    async (_, { rejectWithValue }) => {
      try {
        if (!window.ethereum) {
          throw new Error("Metamask not installed");
        }
        const baseSepoliaChainId = "0x14a34"; // 84532 in hex

        const network = await window.ethereum.request({ method: "eth_chainId" });
        console.log("Chain Id: ", network)
        if (network !== baseSepoliaChainId) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: baseSepoliaChainId }]
          });
        }
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        console.log("Chain Id: ", network)
        if (accounts.length === 0) {
          return rejectWithValue("Wallet not connected");
        }
        return { address: accounts[0], chainId: network };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
