import { TokenName } from 'src/libs/crypto-icons';
import useGetBalanceUniversal from './useGetBalanceUniversal';

const useGetBalanceUniversalByToken = ({ address, network, token }: { address: string; network: string; token: TokenName }) => {
  const query = useGetBalanceUniversal({ address, network });
  return { ...query, balance: query.balance[token], data: query.data?.[token] };
};

export default useGetBalanceUniversalByToken;
