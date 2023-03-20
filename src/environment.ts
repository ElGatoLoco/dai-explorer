type Environment = {
  ethereumNetwork: string;
  infuraApiKey: string;
};

export const environment: Environment = {
  ethereumNetwork: process.env.REACT_APP_ETHEREUM_NETWORK as string,
  infuraApiKey: process.env.REACT_APP_INFURA_API_KEY as string,
};
