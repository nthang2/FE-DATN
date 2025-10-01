export type TMenu = {
  title: string;
  url?: string;
  child?: Array<{ title: string; url: string }>;
  parent?: Array<string>;
};

export const menu: TMenu[] = [
  {
    title: 'My Portfolio',
    url: '/my-portfolio',
  },
  {
    title: 'Mint',
    parent: ['/', '/mint-cross'],
    child: [
      { title: 'Mint', url: '/' },
      { title: 'Mint Cross', url: '/mint-cross' },
    ],
  },
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
  },
  // {
  //   title: 'Universal Wallet',
  //   url: '/universal-wallet',
  // },
];
