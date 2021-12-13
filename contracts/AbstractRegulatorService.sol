// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

abstract contract AbstractRegulatorService {
    function check(address _from, address _to)
        public
        view
        virtual
        returns (bool authorized);
}
