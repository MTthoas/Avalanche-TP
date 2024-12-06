import express, { Request, Response } from "express";
import { factoryContract } from "./provider";
import { ethers } from "ethers";
import { config } from "./config";
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

// Endpoint: Créer un NFT
app.post("/create-nft", async (req: Request, res: Response) => {
    try {
        const { name, symbol, recipient, uri, temperature, humidity, windSpeed, conditionImage } = req.body;

        if (!ethers.isAddress(recipient)) {
            console.log({ error: "Invalid recipient address" });
        }

        // Validate that all fields are provided
        if (!name || !symbol || !uri || !temperature || !humidity || !windSpeed || !conditionImage) {
            console.log({ error: "All fields are required" });
        }

        console.log(req.body)
        const tx = await factoryContract.createWeatherNFT(
            name,
            symbol,
            recipient,
            uri,
            temperature,
            humidity,
            windSpeed,
            conditionImage
        );
        await tx.wait();

        console.log(tx);

        res.status(200).json({ message: "NFT created successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error creating NFT:", error);
        res.status(500).json({ error: "Failed to create NFT" });
    }
});

// Endpoint : Liste des contrats déployés
app.get("/get-deployed-nfts-length", async (_: Request, res: Response) => {
    try {
        const deployedNFTs = await factoryContract.getDeployedNFTsCount();

        console.log(deployedNFTs)
        res.status(200).json({ deployedNFTs: parseInt(deployedNFTs) });
    } catch (error) {
        console.error("Error fetching deployed NFTs:", error);
        res.status(500).json({ error: "Failed to fetch deployed NFTs" });
    }
});

app.get("/get-all-deployed-nfts", async (_: Request, res: Response) => {
    try {
        // Appel au contrat pour récupérer tous les NFTs déployés
        const deployedNFTs = await factoryContract.getAllDeployedNFTs();

        // Transformation des données en un format lisible
        const nftsWithDetails = deployedNFTs.map((nft: any) => ({
            address: nft[0], // Adresse du contrat
            name: nft[1], // Nom du NFT
            symbol: nft[2], // Symbole du NFT
            owner: nft[3], // Adresse propriétaire
            metadataUri: nft[4], // URI des métadonnées
            temperature: nft[5], // Température
            humidity: nft[6], // Humidité
            windSpeed: nft[7], // Vitesse du vent
            imageUrl: nft[8], // Lien vers une image
        }));

        // Envoi des données transformées
        res.status(200).json({ items: nftsWithDetails });
    } catch (error) {
        console.error("Error fetching deployed NFTs:", error);
        res.status(500).json({ error: "Failed to fetch deployed NFTs" });
    }
});


// Démarrer le serveur
const PORT = config.port || 4001;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
