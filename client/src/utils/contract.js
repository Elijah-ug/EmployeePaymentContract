import contractABI from "../abi/EmployeePayment.json";
import { contractAddress } from "../config";
import {ethers} from "ethers"

// get browser wallet provider
const getProvider = () => {
    if (typeof window.ethereum !== undefined) {
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
    const signer = await getSigner();
    return new ethers.Contract(contractAddress, contractABI.abi, signer);
}
export { getProvider, getSigner, getContract };
