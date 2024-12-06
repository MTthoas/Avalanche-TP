import { ethers, N } from "ethers";
import { config } from "./config";
import { StatementSync } from "node:sqlite";

const ABI = [
    {
        inputs: [],
        name: "getDeployedNFTsCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "symbol", type: "string" },
            { internalType: "address", name: "recipient", type: "address" },
            { internalType: "string", name: "uri", type: "string" },
            { internalType: "string", name: "temperature", type: "string" },
            { internalType: "string", name: "humidity", type: "string" },
            { internalType: "string", name: "windSpeed", type: "string" },
            { internalType: "string", name: "conditionImage", type: "string" },
        ],
        name: "createWeatherNFT",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "nftContract", type: "address" },
            { internalType: "string", name: "temperature", type: "string" },
            { internalType: "string", name: "humidity", type: "string" },
            { internalType: "string", name: "windSpeed", type: "string" },
            { internalType: "string", name: "conditionImage", type: "string" },
        ],
        name: "updateWeatherNFT",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllDeployedNFTs",
        outputs: [
            {
                internalType: "struct NFTFactory.DeployedNFT[]",
                name: "",
                type: "tuple[]",
                components: [
                    { internalType: "address", name: "contractAddress", type: "address" },
                    { internalType: "string", name: "name", type: "string" },
                    { internalType: "string", name: "symbol", type: "string" },
                    { internalType: "address", name: "recipient", type: "address" },
                    { internalType: "string", name: "uri", type: "string" },
                    { internalType: "string", name: "temperature", type: "string" },
                    { internalType: "string", name: "humidity", type: "string" },
                    { internalType: "string", name: "windSpeed", type: "string" },
                    { internalType: "string", name: "conditionImage", type: "string" },
                ],
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];


console.log("Loaded RPC_URL:", config.rpcUrl); // Ajoutez ceci pour debug

// Initialisation du provider
export const provider = new ethers.JsonRpcProvider("https://avalanche-fuji-c-chain-rpc.publicnode.com");
// Initialisation du portefeuille
export const wallet = new ethers.Wallet(config.privateKey, provider);

// Instance du contrat Factory
export const factoryContract = new ethers.Contract(config.factoryAddress, ABI, wallet);
