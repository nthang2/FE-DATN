export type TMenu = {
  title: string;
  url?: string;
  child?: Array<{ title: string; url: string }>;
  parent?: Array<string>;
  isCrossMode?: boolean | 'both';
};

export const menu: TMenu[] = [
  {
    title: 'My Portfolio',
    url: '/my-portfolio',
  },
  { title: 'Universal Borrow', url: '/universal-borrow', isCrossMode: true },
  { title: 'Borrow', url: '/' },
  { title: 'Mint Cross', url: '/mint-cross', isCrossMode: true },
  {
    title: 'Earn',
    url: '/earn',
    isCrossMode: 'both',
  },
  {
    title: 'Liquidation',
    url: '/liquidation',
  },
  {
    title: 'Convert',
    url: '/convert',
    isCrossMode: 'both',
  },
  {
    title: 'Universal Wallet',
    url: '/universal-wallet',
    isCrossMode: true,
  },
];
