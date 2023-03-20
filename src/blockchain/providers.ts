import { ethers } from 'ethers';

import { DAI_ABI, DAI_CONTRACT_ADDRESS } from '../config';
import { environment } from '../environment';

const { ethereumNetwork, infuraApiKey } = environment;
const provider = new ethers.providers.InfuraProvider(ethereumNetwork, infuraApiKey);
const wsProvider = new ethers.providers.InfuraWebSocketProvider(ethereumNetwork, infuraApiKey);

export const daiContractProvider = new ethers.Contract(DAI_CONTRACT_ADDRESS, DAI_ABI, provider);
export const daiContractWsProvider = new ethers.Contract(DAI_CONTRACT_ADDRESS, DAI_ABI, wsProvider);
