import React from "react";

const ContractFaucet = ({ account, web3api, reload, setReload }) => {
  const addFunds = async () => {
    const { contracts, web3 } = web3api;
    await contracts.faucet.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
    setReload(!reload);
  };

  const withdraw = async () => {
    const { contracts, web3 } = web3api;
    const amount = web3.utils.toWei("0.1", "ether");
    await contracts.faucet.withdraw(amount, { from: account });
    setReload(!reload);
  };

  return (
    <div>
      <button
        disabled={!account}
        className="button is-primary m-2"
        onClick={addFunds}
      >
        Donate 1 ETH
      </button>
      <button
        disabled={!account}
        className="button is-info m-2"
        onClick={withdraw}
      >
        Withdraw
      </button>
    </div>
  );
};

export default ContractFaucet;
