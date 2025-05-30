// import contractABI from "../abi/EmployeePayment.json";
import contractABI from "../../../contract/artifacts/contracts/EmployeePayment.sol/EmployeePayment.json"
import  {contractAddress}  from "../config";
import { ethers } from "ethers";

// get browser wallet provider
const getProvider = () => {
    if (window.ethereum ) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new error("Metamask not installed");
    }
};
//get signer(connected wallet)
const getSigner = async () => {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    return await provider.getSigner()
};
//get the contract instance

const getContract = async () => {
    if (!contractAddress) {
        throw new Error("contractAddress is undefined. Check your config.js");
    }
    const signer = await getSigner();
    const provider = getProvider();
    const network = await provider.getNetwork()
    // console.log("🛰️ Connected chain ID:", network.chainId);

    // return
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
    // console.log("✅ Contract address from contract.address:", contract.target);
    // console.log("✅ Contract address from config.js:", contractAddress);
    return contract;
}
export { getProvider, getSigner, getContract };
