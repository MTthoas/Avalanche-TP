// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/NFTFactory.sol";

contract DeployFactory is Script {
    function run() external {
        vm.startBroadcast();
        NFTFactory factory = new NFTFactory();
        vm.stopBroadcast();

        console.log("Factory deployed at:", address(factory));
    }
}
