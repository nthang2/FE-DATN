import { walletConnect } from 'wagmi/connectors';

export const walletConnectConnector = walletConnect({
  projectId: '',
  showQrModal: true,
  metadata: {
    name: 'Jpow App',
    url: 'https://app.jpow.ai/',
    description: '',
    icons: ['https://app.jpow.ai/favicon.ico'],
  },
  qrModalOptions: {
    themeMode: 'dark',
    themeVariables: {
      '--wcm-z-index': '1301',
    },
  },
});
