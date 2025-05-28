import { createAsyncThunk } from "@reduxjs/toolkit";

export const connectWallet = createAsyncThunk(
    "auth/connectWallet",
    async (__, { rejectWithValue }) => {
        try {
            if (!window.ethereum) {
                throw new Error("Metamask not installed");
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const network = await window.ethereum.request({ method: "eth_chainId" });
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
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const network = await window.ethereum.request({ method: "eth_chainId" });
        if (accounts.length === 0) {
          return rejectWithValue("Wallet not connected");
        }
        return { address: accounts[0], chainId: network };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
