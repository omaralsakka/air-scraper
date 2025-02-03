import { Select } from '@radix-ui/themes';
import { SingleSelectOptionsProps } from '../Types/Types';
import { useState } from 'react';

interface SingleSelectProps {
  options: SingleSelectOptionsProps[];
  defaultValue: string;
  onChange: (value: string) => void;
}

const SingleSelect = ({
  options,
  defaultValue,
  onChange,
}: SingleSelectProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const getOption = (value: string) => {
    const option = options.find((option) => option.value === value);

    if (!option) return 'Select an option';

    return (
      <span className="flex items-center gap-2">
        {option.logo}
        {option.label && ` ${option.label}`}
      </span>
    );
  };

  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={(value: string) => {
        setSelectedValue(value);
        onChange(value);
      }}
    >
      <Select.Trigger className="cursor-pointer lg:w-auto">
        {getOption(selectedValue)}
      </Select.Trigger>
      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default SingleSelect;
