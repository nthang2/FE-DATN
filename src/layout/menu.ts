export type TMenu = {
  title: string;
  url: string;
};

export const menu: TMenu[] = [
  {
    title: 'My Portfolio',
    url: '/my_portfolio',
  },
  {
    title: 'Borrow',
    url: '/',
  },
  {
    title: 'Lend',
    url: '/lend',
  },
  {
    title: 'Docs',
    url: '/docs',
  },
];
