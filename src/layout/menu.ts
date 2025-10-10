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
  { title: 'My Portfolio', url: '/universal-my-portfolio', isCrossMode: true },
  { title: 'Borrow', url: '/' },
  { title: 'Universal Borrow', url: '/universal-borrow', isCrossMode: true },
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
  },
  {
    title: 'Universal Wallet',
    url: '/universal-wallet',
    isCrossMode: true,
  },
];
