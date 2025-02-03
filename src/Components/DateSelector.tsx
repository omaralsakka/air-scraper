import { Box, TextField } from '@radix-ui/themes';
import { DateSelectorProps } from '../Types/Types';

const DateSelector = ({
  travelDate,
  returnDate,
  tripType,
  onTravelDateChange,
  onReturnDateChange,
}: DateSelectorProps) => {
  return (
    <Box className="flex items-center gap-2">
      <TextField.Root
        type="date"
        size={'3'}
        className="border"
        value={travelDate}
        onChange={(e) => onTravelDateChange(e.target.value)}
      />
      {tripType === 'roundTrip' && (
        <TextField.Root
          type="date"
          size={'3'}
          className="border"
          value={returnDate}
          onChange={(e) => onReturnDateChange(e.target.value)}
        />
      )}
    </Box>
  );
};

export default DateSelector;
