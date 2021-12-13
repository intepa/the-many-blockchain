import React from "react";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@chakra-ui/react";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const Portfolio = ({
  orderedShares,
  projectAddress,
  executeOrderHandler,
  ownedShares,
}) => {
  return (
    <div className="columns mt-2">
      <div className="column is-four-fifths">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Project</Th>
              <Th>Address</Th>
              <Th isNumeric>Orders</Th>
              <Th isNumeric>Owned Shares</Th>
              <Th isNumeric>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Nordvest</Td>
              <Td style={{ fontFamily: "Lucida Console, monospace" }}>
                <a
                  target="_blank"
                  href={`https://mumbai.polygonscan.com/address/${projectAddress}`}
                  className="has-text-link"
                >
                  {projectAddress}
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    size="xs"
                    transform="shrink-3"
                  />{" "}
                </a>
              </Td>
              <Td isNumeric>
                <Tooltip label="Execute order">
                  {orderedShares ? (
                    <button
                      style={{ fontFamily: "Lucida Console, monospace" }}
                      className="button is-size-7 is-primary"
                      onClick={() => executeOrderHandler()}
                    >
                      {numeral(orderedShares).format("0,0")}
                    </button>
                  ) : (
                    <></>
                  )}
                </Tooltip>
              </Td>
              <Td isNumeric style={{ fontFamily: "Lucida Console, monospace" }}>
                {ownedShares ? numeral(ownedShares).format("0,0") : "0"}
              </Td>
              <Td isNumeric>
                <button disabled={true} className="button is-size-7 is-success">
                  Active
                </button>
              </Td>
            </Tr>
            <Tr>
              <Td>Single Units CPH</Td>
              <Td style={{ fontFamily: "Lucida Console, monospace" }}>
                <a
                  target="_blank"
                  href={`https://mumbai.polygonscan.com/address/${"0xEEb6280efB6A509368Cb0A5f972C4Eb9B8cA002e"}`}
                  className="has-text-link"
                >
                  0xEEb6280efB6A509368Cb0A5f972C4Eb9B8cA002e
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    size="xs"
                    transform="shrink-3"
                  />{" "}
                </a>
              </Td>
              <Td isNumeric></Td>
              <Td isNumeric style={{ fontFamily: "Lucida Console, monospace" }}>
                {numeral(4301).format("0,0")}
              </Td>
              <Td isNumeric>
                <button disabled={true} className="button is-size-7 is-success">
                  Active
                </button>
              </Td>
            </Tr>
            <Tr>
              <Td>Frederiksberg</Td>
              <Td style={{ fontFamily: "Lucida Console, monospace" }}>
                <a
                  target="_blank"
                  href={`https://mumbai.polygonscan.com/address/${"0x271B3676EA1f629CB1057E1502D391DCEB959E4b"}`}
                  className="has-text-link"
                >
                  0x271B3676EA1f629CB1057E1502D391DCEB959E4b
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    size="xs"
                    transform="shrink-3"
                  />{" "}
                </a>
              </Td>
              <Td
                isNumeric
                style={{ fontFamily: "Lucida Console, monospace" }}
              ></Td>
              <Td isNumeric style={{ fontFamily: "Lucida Console, monospace" }}>
                {numeral(38233).format("0,0")}
              </Td>
              <Td isNumeric>
                <Tooltip label="Claim reimbursement">
                  <button
                    disabled={false}
                    className="button is-size-7 is-danger"
                  >
                    Canceled
                  </button>
                </Tooltip>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Portfolio;
