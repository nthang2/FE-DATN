export type TMenu = {
  title: string;
  url: string;
};

export const menu: TMenu[] = [
  {
    title: 'My Portfolio',
    url: '/my-portfolio',
  },
  {
    title: 'Mint',
    url: '/',
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
