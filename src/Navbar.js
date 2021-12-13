import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBoxOpen,
  faAddressBook,
  faFileCode,
  faThList,
  faCaretDown,
  faUserCheck,
  faCopy,
  faGlobe,
  faChartLine,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const Navbar = ({ web3api, account, balances }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const saveClipboard = () => {
    navigator.clipboard.writeText(account);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/">
          <img
            className="mt-2"
            href="https://bulma.io"
            src="https://i.ibb.co/tJchWJn/themany-blockchain-logo.png"
            width="170"
            height="67"
          />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="buttons ml-4">
            <Link to="/">
              <div
                className={`button is-info ${
                  location.pathname === "/" ? "" : "is-light"
                }`}
              >
                <FontAwesomeIcon icon={faThList} /> &nbsp; Browse projects
              </div>
            </Link>
            <Link to="/portfolio">
              <div
                className={`button is-danger ml-2 ${
                  location.pathname === "/portfolio" ||
                  location.pathname === "/portfolio/"
                    ? ""
                    : "is-light"
                }`}
              >
                <FontAwesomeIcon icon={faChartLine} /> &nbsp; Portfolio
              </div>
            </Link>

            <a className="button is-black is-outlined ml-3">
              <FontAwesomeIcon icon={faGithub} /> &nbsp; GitHub
            </a>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons are-small">
              <Link to="/contracts">
                <div
                  className={`button is-primary mr-2 ${
                    location.pathname === "/contracts" ||
                    location.pathname === "/contracts/"
                      ? ""
                      : "is-outlined is-light"
                  }`}
                >
                  <FontAwesomeIcon icon={faFileCode} />
                </div>
              </Link>
              {account ? (
                <div className="mr-2">
                  <Menu>
                    <MenuButton>
                      <a
                        className="button is-light is-size-7"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                      >
                        <span>
                          {" "}
                          <FontAwesomeIcon icon={faAddressBook} />
                          &nbsp; {account} &nbsp;{" "}
                          <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                      </a>
                    </MenuButton>
                    <MenuList className="is-size-7">
                      <MenuItem
                        className="is-size-7"
                        onClick={() => saveClipboard()}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                        &nbsp;&nbsp; Copy address
                      </MenuItem>
                      <MenuItem className="is-size-7">
                        <a
                          target="_blank"
                          href={`https://mumbai.polygonscan.com/address/${account}`}
                        >
                          <FontAwesomeIcon
                            icon={faGlobe}
                            className="has-text-danger"
                          />
                          &nbsp;&nbsp; View on Polygonscan
                        </a>
                      </MenuItem>
                      <MenuItem
                        className="is-size-7"
                        onClick={() => {
                          navigate(`/contracts`);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBoxOpen}
                          className="has-text-link"
                        />
                        &nbsp; Get TMY tokens
                      </MenuItem>
                      <MenuItem
                        className="is-size-7"
                        onClick={() => {
                          navigate(`/whitelist`);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUserCheck}
                          className="has-text-primary"
                        />
                        &nbsp; Authorize account
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              ) : (
                <button
                  className="button is-danger is-outlined is-size-7"
                  onClick={() => {
                    web3api.provider.request({ method: "eth_requestAccounts" });
                  }}
                >
                  <FontAwesomeIcon icon={faAddressBook} />
                  &nbsp; No account connected
                </button>
              )}

              <a
                className="button is-link is-size-7 mr-2"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>
                  <FontAwesomeIcon icon={faBoxOpen} />
                  &nbsp;&nbsp;
                  <strong>{numeral(balances.tmy).format("0,0.00")}</strong> TMY
                </span>
              </a>

              <a className="button is-dark is-size-7">
                <FontAwesomeIcon icon={faEthereum} />
                &nbsp;&nbsp;
                <span>
                  <strong>{numeral(balances.eth).format("0,0.00000")}</strong>{" "}
                  ETH
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
