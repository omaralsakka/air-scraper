import { useState } from 'react';
import { Button, DropdownMenu, Text } from '@radix-ui/themes';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { PersonIcon } from '@radix-ui/react-icons';
import { PassengersAmountDropDownProps } from '../Types/Types';

export const PassengersAmountDropDown = ({
  count,
  onSetCount,
}: PassengersAmountDropDownProps) => {
  const [adultCounter, setAdultCounter] = useState(count.adultCount);
  const [childrenCounter, setChildrenCounter] = useState(count.childrenCount);
  const [isOpen, setIsOpen] = useState(false);

  const resetCount = () => {
    setAdultCounter(count.adultCount);
    setChildrenCounter(count.childrenCount);
  };

  return (
    <DropdownMenu.Root open={isOpen}>
      <DropdownMenu.Trigger onClick={() => setIsOpen(true)}>
        <Button color="gray" variant="outline">
          <PersonIcon />
          {count.adultCount + count.childrenCount}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-64 p-2">
        <div className="grid grid-cols-2 mb-3">
          <Text>Adults</Text>
          <ToggleGroup.Root type="single" className="flex justify-between">
            <Button
              size={'1'}
              onClick={() =>
                setAdultCounter(adultCounter > 1 ? adultCounter - 1 : 1)
              }
            >
              -
            </Button>
            <Text>{adultCounter}</Text>
            <Button
              size={'1'}
              onClick={() => setAdultCounter(adultCounter + 1)}
            >
              +
            </Button>
          </ToggleGroup.Root>
        </div>
        <div className="grid grid-cols-2 mb-3">
          <Text>Children</Text>
          <ToggleGroup.Root type="single" className="flex justify-between">
            <Button
              size={'1'}
              onClick={() =>
                setChildrenCounter(adultCounter > 0 ? childrenCounter - 1 : 0)
              }
            >
              -
            </Button>
            <Text>{childrenCounter}</Text>
            <Button
              size={'1'}
              onClick={() => setChildrenCounter(childrenCounter + 1)}
            >
              +
            </Button>
          </ToggleGroup.Root>
        </div>
        <div className="mt-3">
          <ToggleGroup.Root type="single" className="flex justify-end gap-3">
            <Button
              onClick={() => {
                resetCount();
                setIsOpen(false);
              }}
              radius="full"
              variant="soft"
              color="gray"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSetCount(adultCounter, childrenCounter);
                setIsOpen(false);
              }}
              radius="full"
              variant="soft"
              color="gray"
            >
              Done
            </Button>
          </ToggleGroup.Root>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
