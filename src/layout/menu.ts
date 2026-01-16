export type TMenu = {
  title: string;
  url?: string;
  child?: Array<{ title: string; url: string }>;
  parent?: Array<string>;
  isUniversalMode?: boolean | 'both';
};

export const menu: TMenu[] = [
  {
    title: 'My Portfolio',
    url: '/my-portfolio',
  },
  { title: 'My Portfolio', url: '/universal-my-portfolio', isUniversalMode: true },
  { title: 'Borrow', url: '/' },
  { title: 'Universal Borrow', url: '/universal-borrow', isUniversalMode: true },
  // {
  //   title: 'Earn',
  //   url: '/earn',
  //   isUniversalMode: 'both',
  // },
  // {
  //   title: 'Liquidation',
  //   url: '/liquidation',
  // },
  // {
  //   title: 'Convert',
  //   url: '/convert',
  // },
  {
    title: 'Universal Wallet',
    url: '/universal-wallet',
    isUniversalMode: true,
  },
];
