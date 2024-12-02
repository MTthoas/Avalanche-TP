// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFT.sol";

contract NFTFactory {
    event WeatherNFTCreated(address indexed creator, address nftContract);
    event NFTUpdated(address indexed nftContract, NFT.WeatherData updatedData);

    struct DeployedNFT {
        address contractAddress;
        string name;
        string symbol;
    }

    DeployedNFT[] public deployedNFTs;

    /// @notice Crée un nouveau NFT dynamique avec des données météo
    function createWeatherNFT(
        string memory name,
        string memory symbol,
        address recipient,
        string memory uri,
        string memory temperature,
        string memory humidity,
        string memory windSpeed,
        string memory conditionImage
    ) public returns (address) {
        NFT nft = new NFT(
            name,
            symbol,
            recipient,
            uri,
            temperature,
            humidity,
            windSpeed,
            conditionImage
        );

        DeployedNFT memory newNFT = DeployedNFT({
            contractAddress: address(nft),
            name: name,
            symbol: symbol
        });

        deployedNFTs.push(newNFT);

        emit WeatherNFTCreated(msg.sender, address(nft));
        return address(nft);
    }
}
