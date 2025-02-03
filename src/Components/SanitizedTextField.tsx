import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { sanitizeInput } from '../Helpers/helpers';
import { TextField } from '@radix-ui/themes';
import { SanitizedTextFieldProps } from '../Types/Types';

const SanitizedTextField = ({
  value,
  onChange,
  placeholder,
}: SanitizedTextFieldProps) => {
  return (
    <TextField.Root
      size={'3'}
      className="border p-2 rounded sm:w-1/2 lg:w-1/3"
      placeholder={placeholder}
      value={value}
      onChange={(e) =>
        onChange(sanitizeInput(e.target.value) ? e.target.value : '')
      }
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SanitizedTextField;
