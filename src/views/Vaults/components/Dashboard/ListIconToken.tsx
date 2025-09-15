import { Box, Stack } from '@mui/material';
import { mapNameNetwork } from 'src/constants/network';
import { mapNameProtocolToIcon } from 'src/constants/protocols';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TokenName } from 'src/libs/crypto-icons/types';

type Props = {
  tokenNames: string[];
  network: string;
  protocol?: string;
};

const ListIconToken = (props: Props) => {
  const { tokenNames, network, protocol } = props;
  const networkInfo = mapNameNetwork[network];
  const networkPosition = tokenNames.length > 2 ? 3.5 : tokenNames.length;

  const protocolKey = protocol ? Object.keys(mapNameProtocolToIcon).find((key) => protocol.toLowerCase().includes(key)) : null;
  const protocolIcon = protocolKey ? mapNameProtocolToIcon[protocolKey] : null;

  return (
    <Stack direction="row" width="fit-content">
      {tokenNames.map((tokenName, index) => {
        if (index > 1) return null;

        return (
          <IconToken
            tokenName={tokenName as TokenName}
            key={tokenName}
            sx={{
              transform: 'translateX(-' + index * 10 + 'px)',
              fontSize: '30px',
            }}
          />
        );
      })}

      {tokenNames.length > 2 && (
        <Box
          sx={{
            transform: `translateX(-${3 * 8}px)`,
            fontSize: '14px',
            fontWeight: 400,
            color: '#fff',
            backgroundColor: '#1C1D17',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +{tokenNames.length - 2}
        </Box>
      )}

      <Box
        sx={{
          '& svg': {
            fontSize: '16px',
          },
          transform: `translateX(-${networkPosition * 8}px)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: tokenNames.length > 1 ? '0px' : '8px',
        }}
      >
        {protocolIcon ? protocolIcon : networkInfo?.icon}
      </Box>
    </Stack>
  );
};

export default ListIconToken;
