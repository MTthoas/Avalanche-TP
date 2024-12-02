// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    struct WeatherData {
        string temperature;
        string humidity;
        string windSpeed;
        string conditionImage;
        uint256 timestamp;
    }

    uint256 public tokenId; // Unique ID du NFT
    WeatherData public weather; // Données météo actuelles
    address public creator; // Adresse de celui qui a créé ce NFT

    constructor(
        string memory name,
        string memory symbol,
        address recipient,
        string memory uri,
        string memory temperature,
        string memory humidity,
        string memory windSpeed,
        string memory conditionImage
    ) ERC721(name, symbol) {
        tokenId = 0; // ID unique initialisé à 0
        creator = recipient;

        // Mint unique NFT
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, uri);

        // Initialise les données météo
        weather = WeatherData({
            temperature: temperature,
            humidity: humidity,
            windSpeed: windSpeed,
            conditionImage: conditionImage,
            timestamp: block.timestamp
        });
    }

    /// @notice Met à jour les données météo actuelles (seulement par le créateur ou Factory)
    /// @param temperature Nouvelle température
    /// @param humidity Nouvelle humidité
    /// @param windSpeed Nouvelle vitesse du vent
    /// @param conditionImage Nouvelle image des conditions météo
    function updateWeather(
        string memory temperature,
        string memory humidity,
        string memory windSpeed,
        string memory conditionImage
    ) external {
        require(msg.sender == creator, "Only the creator can update weather data");

        weather = WeatherData({
            temperature: temperature,
            humidity: humidity,
            windSpeed: windSpeed,
            conditionImage: conditionImage,
            timestamp: block.timestamp
        });
    }

    /// @notice Récupère les données météo actuelles
    function getWeatherData() public view returns (WeatherData memory) {
        return weather;
    }
}
