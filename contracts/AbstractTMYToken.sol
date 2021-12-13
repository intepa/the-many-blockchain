// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

abstract contract AbstractTMYToken {
    function transferFrom(
        address _owner,
        address buyer,
        uint256 amount
    ) public virtual returns (bool);
}
