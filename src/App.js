import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";
import "./App.css";
import Web3 from "web3";
import Navbar from "./Navbar";
import ContractTMY from "./ContractTMY";
import ContractRegService from "./ContractRegService";
import Card from "./Card";
import numeral from "numeral";
import ProjectCard from "./ProjectCard";
import TestProjectCard from "./TestProjectCard";
import Whitelist from "./Whitelist";
import Portfolio from "./Portfolio";

const App = () => {
  const [web3api, setWeb3api] = useState({
    provider: null,
    isProviderLoaded: false,
    contracts: { tmy: null, regservice: null, project: null },
    web3: null,
  });
  const [account, setAccount] = useState(null);
  const [balances, setBalances] = useState({
    tmy: null,
    regservice: null,
  });
  const [reload, setReload] = useState(false);
  const [accBalances, setAccBalances] = useState({ eth: 0, tmy: 0 });
  const [owners, setOwners] = useState({ tmy: null, regservice: null });

  const [contractSharesAvailable, setContractSharesAvailable] = useState(null);
  const [contractNAV, setContractNAV] = useState(null);
  const [investors, setInvestors] = useState(null);

  const [orderedShares, setOrderedShares] = useState(null);
  const [ownedShares, setOwnedShares] = useState(null);
  const [allowedInvestmentAmount, setAllowedInvestmentAmount] = useState(null);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", () => window.location.reload());
  };

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const ProjectContract = await loadContract("Project", provider);
        const TMYContract = await loadContract("TMY", provider);
        const RegServiceContract = await loadContract(
          "RegulatorService",
          provider
        );
        setAccountListener(provider);
        setWeb3api({
          provider,
          isProviderLoaded: true,
          contracts: {
            tmy: TMYContract,
            regservice: RegServiceContract,
            project: ProjectContract,
          },
          web3: new Web3(provider),
        });
      } else {
        setWeb3api({ ...web3api, isProviderLoaded: true });
        console.error("Please install Metamask");
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    web3api.web3 && getAccount();
  }, [web3api.web3]);

  useEffect(() => {
    const loadBalance = async () => {
      const { contracts, web3 } = web3api;
      const tmyBalance = await web3.eth.getBalance(contracts.tmy.address);
      const regBalance = await web3.eth.getBalance(
        contracts.regservice.address
      );
      const accEthBalance = await web3.eth.getBalance(account);
      const accTmyBalance = await contracts.tmy.balanceOf(account);
      const ownerTmy = await contracts.tmy.owner();
      const ownerRegService = await contracts.regservice.owner();

      const price = await contracts.project.tokenPrice();
      const investors = await contracts.project.totalShareholders();
      const sharesAvailable = await contracts.project.tokensRemaining();

      const _allowedInvestmentAmount = await contracts.tmy.allowance(
        account,
        contracts.project.address
      );

      const _ownedShares = await contracts.project.balanceOf(account);

      setAllowedInvestmentAmount(_allowedInvestmentAmount);
      setContractNAV(web3.utils.fromWei(price, "ether"));
      setInvestors(investors.toString());
      setContractSharesAvailable(web3.utils.fromWei(sharesAvailable, "ether"));

      setOrderedShares(
        web3.utils.fromWei(_allowedInvestmentAmount.toString(), "ether") /
          contractNAV
      );

      setOwnedShares(web3.utils.fromWei(_ownedShares.toString(), "ether"));

      setBalances({
        ...balances,
        tmy: web3.utils.fromWei(tmyBalance, "ether"),
        regservice: web3.utils.fromWei(regBalance, "ether"),
      });

      setAccBalances({
        ...accBalances,
        eth: web3.utils.fromWei(accEthBalance, "ether"),
        tmy: web3.utils.fromWei(accTmyBalance, "ether"),
      });

      setOwners({
        ...owners,
        tmy: ownerTmy,
        regservice: ownerRegService,
      });
    };
    web3api && account && loadBalance();
    console.log(orderedShares);
  }, [web3api, account, reload]);

  const placeOrder = async (sliderValue) => {
    const { contracts, web3 } = web3api;
    const _amount = Math.floor((sliderValue * 50) / contractNAV) * contractNAV;
    const investmentAmount = web3.utils.toWei(_amount.toString(), "ether");
    await contracts.tmy.approve(contracts.project.address, investmentAmount, {
      from: account,
    });
    setReload(!reload);
  };

  const executeOrderHandler = async () => {
    const { contracts, web3 } = web3api;
    await contracts.project.buy(allowedInvestmentAmount, { from: account });
    setReload(!reload);
  };

  const Home = () => {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <ProjectCard
              contractSharesAvailable={contractSharesAvailable}
              contractNAV={contractNAV}
              placeOrderHandler={placeOrder}
              investors={investors}
              contractAddress={web3api.contracts.project.address}
              title="Nordvest"
              img="https://i.ibb.co/xqWk67M/building1.jpg"
            >
              Nyopført ejendom fra 2019 med 23 moderne lejligheder og 23
              parkeringspladser. Ejendommen ligger i Københavns Nordvestkvarter,
              der bliver mere populært år for år.
            </ProjectCard>
          </div>
          <div className="column">
            <TestProjectCard
              title="Single Units CPH"
              img="https://i.ibb.co/pwpLXR1/building2.png"
              investors={346}
              shares={150615}
              nav={1.09205}
              returns={"8-10%"}
              address={"0xEEb6280efB6A509368Cb0A5f972C4Eb9B8cA002e"}
            >
              20 lejligheder og tre erhvervslejemål i moderne og attraktiv
              ejendom fra 2012. Med mulighed for en forbedret drift på sigt,
              efterhånden som huslejen bliver optimeret.
            </TestProjectCard>
          </div>
          <div className="column">
            <TestProjectCard
              title="Frederiksberg"
              img="https://i.ibb.co/Fgp87r9/building3.jpg"
              investors={1208}
              shares={30290}
              nav={1.026}
              returns={"3-6%"}
              address={"0x271B3676EA1f629CB1057E1502D391DCEB959E4b"}
            >
              Moderne ejendom med 26 studieboliger og et erhvervslejemål på
              Frederiksberg C. Enormt attraktive studieboliger med nem adgang
              til uddannelsestilbud og byliv.
            </TestProjectCard>
          </div>
        </div>
      </div>
    );
  };

  const Contracts = () => {
    return (
      <div className="container mt-5">
        <div className="columns">
          <div className="column">
            <Card
              header={`RegulatorService: ${numeral(balances.regservice).format(
                "0,0.00000"
              )} ETH`}
            >
              <ContractRegService
                owner={owners.regservice}
                account={account}
                web3api={web3api}
                reload={reload}
                setReload={setReload}
              />
            </Card>
          </div>
          <div className="column">
            <Card
              header={`TMY token: ${numeral(balances.tmy).format(
                "0,0.00000"
              )} ETH`}
            >
              <ContractTMY
                owner={owners.tmy}
                account={account}
                web3api={web3api}
                reload={reload}
                setReload={setReload}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="faucet-wrapper">
        <div className="faucet">
          <Navbar web3api={web3api} account={account} balances={accBalances} />
          <div>
            {!web3api.isProviderLoaded ? (
              <div className="centered-wrapper">
                <span className="is-size-7">Looking for Web3...</span>
              </div>
            ) : account ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/portfolio"
                  element={
                    <Portfolio
                      orderedShares={orderedShares}
                      projectAddress={web3api.contracts.project.address}
                      executeOrderHandler={executeOrderHandler}
                      ownedShares={ownedShares}
                    />
                  }
                />
                <Route path="contracts" element={<Contracts />} />
                <Route
                  path="whitelist"
                  element={<Whitelist web3api={web3api} account={account} />}
                />
              </Routes>
            ) : !web3api.provider ? (
              <div className="notification is-warning is-size-7 is-rounded">
                Wallet is not detected!{` `}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://metamask.io/download.html"
                >
                  Install Metamask
                </a>
              </div>
            ) : (
              <div className="centered-wrapper">
                {" "}
                <button
                  className="button is-black is-outlined is-large"
                  onClick={() => {
                    web3api.provider.request({ method: "eth_requestAccounts" });
                  }}
                >
                  Connect &nbsp; <FontAwesomeIcon icon={faSignInAlt} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
