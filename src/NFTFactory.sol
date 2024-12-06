// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFT.sol";

contract NFTFactory {
    event WeatherNFTCreated(address indexed creator, address nftContract);

    struct DeployedNFT {
        address contractAddress;
        string name;
        string symbol;
        address recipient;
        string uri;
        string temperature;
        string humidity;
        string windSpeed;
        string conditionImage;
    }

    DeployedNFT[] private deployedNFTs;

    /// @notice Create a new dynamic Weather NFT
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
            symbol: symbol,
            recipient: recipient,
            uri: uri,
            temperature: temperature,
            humidity: humidity,
            windSpeed: windSpeed,
            conditionImage: conditionImage
        });

        deployedNFTs.push(newNFT);

        emit WeatherNFTCreated(msg.sender, address(nft));
        return address(nft);
    }

    /// @notice Update weather data of an NFT
    function updateWeatherNFT(
        address nftContract,
        string memory temperature,
        string memory humidity,
        string memory windSpeed,
        string memory conditionImage
    ) public {
        NFT nft = NFT(nftContract);
        nft.updateWeather(temperature, humidity, windSpeed, conditionImage);
    }

    /// @notice Get weather data for a specific NFT
    function getNftData(address nftContract) public view returns (NFT.WeatherData memory) {
        NFT nft = NFT(nftContract);
        return nft.getWeatherData();
    }

    /// @notice Get all deployed NFTs
    function getAllDeployedNFTs() public view returns (DeployedNFT[] memory) {
        return deployedNFTs;
    }

    /// @notice Get the count of deployed NFTs
    function getDeployedNFTsCount() public view returns (uint256) {
        return deployedNFTs.length;
    }
}
