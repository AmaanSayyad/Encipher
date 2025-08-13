// import '@coreui/coreui/dist/css/coreui.min.css';
import './App.css';

import { Main } from './pages/main';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';



const morphSepolia = {
  id: 2810,
  name: 'Morph Sepolia',
  network: "",
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-quicknode-holesky.morphl2.io'],
    }, public: {
      http: ['https://rpc-quicknode-holesky.morphl2.io'],
    }
  },
  blockExplorers: {
    default: {
      name: 'Morph Testnet Explorer',
      url: 'https://explorer-holesky.morphl2.io',
      apiUrl: 'https://explorer-api-testnet.morphl2.io/api',
    },
  },
  testnet: true,
};




const { chains, provider, webSocketProvider } = configureChains(
  [morphSepolia],
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
