import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFundContract } from "../../features/payContract/autoPayContractThunk";

const FundContract = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { loading, error, txHash } = useSelector((state) => state.fund); // <- setup in slice

  const handleFund = () => {
    if (!amount) return alert("Please enter amount");
    dispatch(fetchFundContract({ ethAmount: amount }));
  };

  return (
      <div className="">
          <h3 className="text-center" >Fund Contract For Automation</h3>
          <div className=" justify-center items-center">
      <input className="border p-2 rounded w-full outline-hidden"  type="text" placeholder="Amount in ETH" value={amount} onChange={(e) => setAmount(e.target.value)}
        />
              <button onClick={handleFund} disabled={loading}
              className="mt-2 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-35">
         {loading ? "Funding..." : "Fund Contract"}
              </button>
              </div>
              <p>{txHash && <p>Transaction: {txHash}</p>}</p>
          </div>

  );
};

export default FundContract;
