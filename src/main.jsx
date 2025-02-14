import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";



const config = getDefaultConfig({
  appName: 'NFT Web',
  projectId: '0f174d7887cbea9950679b65474af5f6',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();



createRoot(document.getElementById('root')).render(
 <div className=''>
     <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>


  
 </div>,
)
