import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT,
    rpcUrl: process.env.RPC_URL as string,
    privateKey: process.env.PRIVATE_KEY as string,
    factoryAddress: process.env.FACTORY_CONTRACT_ADDRESS as string,
};
