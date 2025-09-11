import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import useSignMessageDestination from '../../hooks/useSignMessage';
import { useGenMessageState } from '../../state/hooks';

const SignMessageBtn = () => {
  const [genMessage] = useGenMessageState();
  const { mutate: signMessage, isPending: isSigning } = useSignMessageDestination();

  if (!genMessage || genMessage === '') return null;

  return (
    <ButtonLoading variant="contained" fullWidth onClick={() => signMessage()} loading={isSigning}>
      Sign Message
    </ButtonLoading>
  );
};

export default SignMessageBtn;
