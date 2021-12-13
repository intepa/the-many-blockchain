import React, { useState, useEffect } from "react";
import numeral from "numeral";

const ContractTMY = ({ owner, account, web3api, reload, setReload }) => {
  const [amount, setAmount] = useState(0);
  const [weiAmount, setWeiAmount] = useState(0);
  const [tmyAmount, setTmyAmount] = useState(0);
  const [tmySupply, setTmySupply] = useState(null);
  const [sell, setSell] = useState(false);
  const [isOwner, setIsOwner] = useState(account === owner);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const buyTokens = async (amount) => {
    const { contracts } = web3api;
    await contracts.tmy.buy({ value: amount, from: account });
    setWeiAmount(0);
    setReload(!reload);
  };

  const sellTokens = async (_amount) => {
    const { contracts, web3 } = web3api;
    const amount = web3.utils.toWei(_amount, "ether");
    await contracts.tmy.sell(amount, { from: account });
    setTmyAmount(0);
    setReload(!reload);
  };

  const mintOrBurn = async (_amount, burn = false) => {
    const { contracts, web3 } = web3api;
    const amount = web3.utils.toWei(_amount, "ether");
    if (burn) {
      await contracts.tmy.burn(amount, { from: account });
    } else {
      await contracts.tmy.mint(amount, { from: account });
    }
    setAmount(0);
    setReload(!reload);
  };

  useEffect(() => {
    const loadTotalSupply = async () => {
      const { contracts, web3 } = web3api;
      const sup = await contracts.tmy.totalSupply();
      const supply = parseFloat(
        web3.utils.fromWei(sup.toString(), "ether")
      ).toFixed(2);
      setTmySupply(numberWithCommas(supply));
    };
    web3api.contracts.faucet && loadTotalSupply();
  }, [web3api, reload]);

  return (
    <div>
      <div className="is-size-6 my-4">
        Total Supply: <strong>{tmySupply}</strong> TMY
      </div>
      <div className="tabs is-toggle">
        <ul>
          <li
            className={!sell ? "is-active" : ""}
            onClick={() => setSell(false)}
          >
            <a>
              <span>BUY</span>
            </a>
          </li>
          <li className={sell ? "is-active" : ""} onClick={() => setSell(true)}>
            <a>
              <span>SELL</span>
            </a>
          </li>
        </ul>
      </div>
      {sell ? (
        // DISPLAY THE SELL FORM
        <div>
          <div className="field">
            <label className="label">Specify amount (TMY) to sell</label>
            <div className="control">
              TMY
              <input
                className="input"
                type="number"
                placeholder="amount"
                value={tmyAmount}
                onChange={(e) => setTmyAmount(e.target.value)}
              />
            </div>
          </div>
          <button
            disabled={!account}
            className="button is-danger mr-2"
            onClick={() => sellTokens(tmyAmount)}
          >
            Sell
          </button>
          <span className="is-size-7">
            <strong>
              &asymp;{" "}
              {numeral((264406869290464 * tmyAmount) / 10 ** 18).format(
                "0,0.00000"
              )}{" "}
              ETH
            </strong>
          </span>
        </div>
      ) : (
        // DISPLAY THE BUY FORM
        <div>
          <div className="field">
            <label className="label">Specify amount (wei) to spend</label>
            <div className="control">
              wei
              <input
                className="input"
                type="number"
                placeholder="amount"
                value={weiAmount}
                onChange={(e) => setWeiAmount(e.target.value)}
              />
            </div>
          </div>
          <button
            disabled={!account}
            className="button is-primary mr-2"
            onClick={() => buyTokens(weiAmount)}
          >
            Buy
          </button>
          <span className="is-size-7">
            <strong>
              &asymp;{" "}
              {numeral(weiAmount / 264406869290464).format("0,0.00") === "NaN"
                ? "0.00"
                : numeral(weiAmount / 264406869290464).format("0,0.00")}{" "}
              TMY
            </strong>
          </span>
        </div>
      )}
      <div className="pt-6">
        <div className="field">
          <label className="label">Specify amount to mint/burn</label>
          <div className="control">
            TMY
            <input
              className="input"
              type="number"
              placeholder="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!isOwner}
            />
          </div>
        </div>
        <button
          disabled={!account}
          className="button is-success mr-2"
          onClick={() => mintOrBurn(amount)}
          disabled={!isOwner}
        >
          Mint!
        </button>
        <button
          disabled={!account}
          className="button is-danger mr-2"
          onClick={() => mintOrBurn(amount, true)}
          disabled={!isOwner}
        >
          Burn!
        </button>
      </div>

      {!isOwner ? (
        <p className="is-size-7 has-text-danger">
          Only contract owner can mint/burn tokens!
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContractTMY;
