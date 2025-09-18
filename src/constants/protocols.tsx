import { WasabiIcon } from 'src/assets/protocols/WasabiIcon';
import { KaminoIcon } from '../assets/protocols/KaminoIcon';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TokenName } from 'src/libs/crypto-icons';
import { SiloV2Icon } from 'src/assets/protocols/SiloV2Icon';
import { FluidIcon } from '../assets/protocols/FluidIcon';
import { BeefyIcon } from 'src/assets/protocols/BeefyIcon';
import { MorphoIcon } from 'src/assets/protocols/MorphoIcon';
import { TokenmakIcon } from 'src/assets/protocols/TokemakIcon';
import { JupiterIcon } from 'src/assets/protocols/JupiterIcon';

export const mapNameProtocolToIcon: Record<string, React.ReactNode> = {
  kamino: <KaminoIcon />,
  wasabi: <WasabiIcon />,
  susdx: <IconToken tokenName={TokenName.USDC} />,
  silo: <SiloV2Icon />,
  fluid: <FluidIcon />,
  beefy: <BeefyIcon />,
  tokenmak: <TokenmakIcon />,
  morpho: <MorphoIcon />,
  jup: <JupiterIcon />,
};
