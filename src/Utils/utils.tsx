import { ArrowRightIcon, LoopIcon } from '@radix-ui/react-icons';
import SingleSelect from '../Components/SingleSelect';
import { SingleSelectOptionsProps } from '../Types/Types';

export const FlightTypeSelect = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const options: SingleSelectOptionsProps[] = [
    { value: 'roundTrip', label: 'Round trip', logo: <LoopIcon /> },
    { value: 'oneWay', label: 'One way', logo: <ArrowRightIcon /> },
  ];

  return (
    <SingleSelect
      options={options}
      defaultValue="roundTrip"
      onChange={onChange}
    />
  );
};

export const FlightClassSelect = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const options: SingleSelectOptionsProps[] = [
    { value: 'economy', label: 'Economy' },
    { value: 'premium_economy', label: 'Premium economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First' },
  ];

  return (
    <SingleSelect
      options={options}
      defaultValue="economy"
      onChange={onChange}
    />
  );
};

export const CurrencySelect = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const options: SingleSelectOptionsProps[] = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
  ];

  return (
    <SingleSelect options={options} defaultValue="EUR" onChange={onChange} />
  );
};
