import { WasabiIcon } from 'src/assets/protocols/WasabiIcon';
import { KaminoIcon } from '../assets/protocols/KaminoIcon';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TokenName } from 'src/libs/crypto-icons';
import { SiloV2Icon } from 'src/assets/protocols/SiloV2Icon';

export const mapNameProtocolToIcon: Record<string, React.ReactNode> = {
  kamino: <KaminoIcon />,
  wasabi: <WasabiIcon />,
  susdx: <IconToken tokenName={TokenName.USDC} />,
  silo: <SiloV2Icon />,
};
