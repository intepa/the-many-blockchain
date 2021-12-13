import React, { useState } from "react";

const ContractRegService = ({ owner, account, web3api, reload, setReload }) => {
  const [address, setAddress] = useState("");
  const [allowSend, setAllowSend] = useState(false);
  const [allowReceive, setAllowReceive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(account === owner);

  const setPermissions = async () => {
    const { contracts } = web3api;
    setLoading(true);
    await contracts.regservice.setPermissions(
      address,
      allowSend,
      allowReceive,
      { from: account }
    );
    setAddress("");
    setAllowSend(false);
    setAllowReceive(false);
    setLoading(false);
    setReload(!reload);
  };

  return (
    <div className="is-flex is-flex-direction-column">
      <div className="field">
        <label className="label">Set permissions</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isOwner}
          />
        </div>
      </div>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={allowSend}
          onChange={() => setAllowSend(!allowSend)}
          disabled={!isOwner}
        />{" "}
        allow <strong>send</strong>
      </label>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={allowReceive}
          onChange={() => setAllowReceive(!allowReceive)}
          disabled={!isOwner}
        />{" "}
        allow <strong>receive</strong>
      </label>
      <button
        disabled={!account}
        className={`button is-link m-2 ${loading ? "is-loading" : ""}`}
        onClick={() => setPermissions()}
        disabled={address === ""}
      >
        Update
      </button>
      {!isOwner ? (
        <p className="is-size-7 has-text-danger">
          Only contract owner can set permissions!
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContractRegService;
