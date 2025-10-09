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
  { title: 'My Portfolio Cross', url: '/my-portfolio-cross', isCrossMode: true },
  { title: 'Mint', url: '/' },
  { title: 'Mint Cross', url: '/mint-cross', isCrossMode: true },
  {
    title: 'Earn',
    url: '/earn',
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
    isCrossMode: 'both',
  },
];
