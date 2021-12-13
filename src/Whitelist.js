import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Card from "./Card";
import { Spinner } from "@chakra-ui/react";

const Whitelist = ({ web3api, account }) => {
  const [whitelistLoading, setWhitelistLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [permissions, setPermissions] = useState({
    send: false,
    receive: false,
  });

  useEffect(() => {
    const loadPermissions = async () => {
      const { contracts } = web3api;
      const perm = await contracts.regservice.permissionsOf(account);
      setPermissions({ send: perm.allowSend, receive: perm.allowReceive });
    };
    web3api && account && loadPermissions();
  }, []);

  const requestWhitelist = async () => {
    setWhitelistLoading(true);
    const baseURL = "https://the-many-api.herokuapp.com/whitelist/";
    const res = await axios.post(baseURL + account);
    setApiResponse(res.data.response);
    setWhitelistLoading(false);
  };

  return (
    <div className="centered-wrapper">
      <div>
        <Card header="Whitelist request">
          <div>
            <div className="is-size-7">
              <strong>Authorizer:</strong> The Many A/S
            </div>
            <div className="is-size-7">
              <strong>Address:</strong> {account}
            </div>
            <div className="is-size-7">
              <div className="is-flex is-flex-direction-row">
                <div>
                  <strong>Permissions:</strong>
                </div>
                <div className="ml-2">
                  Send:{" "}
                  <FontAwesomeIcon
                    className={
                      permissions.send ? "has-text-success" : "has-text-danger"
                    }
                    icon={permissions.send ? faCheckCircle : faTimesCircle}
                  />
                </div>
                <div className="ml-2">
                  Receive:{" "}
                  <FontAwesomeIcon
                    className={
                      permissions.receive
                        ? "has-text-success"
                        : "has-text-danger"
                    }
                    icon={permissions.receive ? faCheckCircle : faTimesCircle}
                  />
                </div>
              </div>
            </div>

            <div className="has-text-centered">
              {apiResponse ? (
                <div
                  class={`notification is-size-7 mt-3 is-light ${
                    apiResponse !== "Pending" ? "is-danger" : "is-info"
                  }`}
                >
                  {apiResponse}
                </div>
              ) : whitelistLoading ? (
                <button
                  disabled={true}
                  className="button is-size-7 is-primary mt-3"
                >
                  <Spinner size="xs" /> &nbsp; Sending...
                </button>
              ) : permissions.receive && permissions.send ? (
                <div class="notification is-size-7 mt-3 is-primary is-light">
                  Your account is authorized
                </div>
              ) : (
                <button
                  className="button is-size-7 is-primary mt-3"
                  onClick={() => requestWhitelist()}
                >
                  Send request
                </button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Whitelist;
