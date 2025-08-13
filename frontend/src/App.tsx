// import '@coreui/coreui/dist/css/coreui.min.css';
import './App.css';

import { Main } from './pages/main';

import { configureChains, createClient, WagmiConfig } from 'wagmi';


import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
const customMorphChain = {
  id
    : 2710,
  name
    : 'Morph Sepolia',
  nativeCurrency
    : {
    name
      : 'Ether', symbol
      : 'ETH', decimals
      : 18
  },
  rpcUrls
    : {
    default
      : {
      http
        : ['http://rpc-quicknode-holesky.morphl2.io/']
    },
    public
      : {
      http
        : ['http://rpc-quicknode-holesky.morphl2.io/']
    }
  },
  blockExplorers
    : {
    default
      : {
      name
        : 'Morph Sepolia', url
        : 'http://explorer-holesky.morphl2.io/'
    },
  },

  testnet
    :
    true,
  network
    :
    "morph"
}

const { chains, provider, webSocketProvider } = configureChains(
  [customMorphChain],
  [publicProvider()]
);
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains, options: {
        qrcode: true,
        // version: '1',
        //  projectId: process.env.REACT_APP_WALLET_CONNECT_ID || ''
      }
    }),
    /* new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }), */
  ],
  provider,
  webSocketProvider,
});

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <>
      <WagmiConfig client={client}>
        <Main />
      </WagmiConfig>
    </>
  );
}

export default App;
