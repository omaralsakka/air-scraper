import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import { WarningCalloutProps } from '../Types/Types';

const WarningCallout = ({ message }: WarningCalloutProps) => {
  return (
    <Callout.Root className="mt-3" color="red" role="alert">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
};

export default WarningCallout;
