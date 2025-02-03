import { Box, Section, Text } from '@radix-ui/themes';
import { useSearchEngine, useSelectedFlights } from '../Hooks/Hooks';
import { ArrowRightIcon, LoopIcon, PersonIcon } from '@radix-ui/react-icons';
import FlightDetailsSection from '../Components/FlightDetailsSection';

const FlightView = () => {
  const { selectedFlights } = useSelectedFlights();
  const { tripType, cabinClass, passengersCount } = useSearchEngine();
  const totalPassengersCount =
    passengersCount.adultCount + passengersCount.childrenCount;

  return (
    <div aria-label="flight-view" className="w-full items-center flex flex-col">
      <Section
        aria-label="top-section"
        className="lg:w-5/6 flex flex-col w-full lg:flex-row lg:gap-0 gap-2 justify-between pb-5"
      >
        <Box>
          <Text size={'8'} className="flex items-center gap-2" weight="bold">
            {selectedFlights?.goingFlight.from}{' '}
            {tripType === 'oneWay' ? (
              <ArrowRightIcon className="mt-1" />
            ) : (
              <LoopIcon className="mt-1" />
            )}{' '}
            {selectedFlights?.goingFlight.to}
          </Text>
          <Text
            className="flex items-center gap-2"
            as="div"
            size="3"
            color="gray"
          >
            {tripType === 'oneWay' ? 'One way' : 'Rount trip'} . {cabinClass} .{' '}
            <PersonIcon /> {totalPassengersCount}
          </Text>
        </Box>
        <Box>
          <Text size={'8'} className="flex items-center gap-2" weight="bold">
            {selectedFlights?.goingFlight.price}
          </Text>
          <Text
            className="flex items-center gap-2"
            as="div"
            size="3"
            color="gray"
          >
            Total price
          </Text>
        </Box>
      </Section>
      <Section className="flex flex-col gap-2 lg:w-5/6 w-full pt-1">
        <Text as="div" size="5" weight="bold">
          Selected flights
        </Text>
        {selectedFlights?.goingFlight && (
          <FlightDetailsSection
            flight={selectedFlights.goingFlight}
            returnFlight={false}
          />
        )}

        {selectedFlights?.returnFlight && (
          <FlightDetailsSection
            flight={selectedFlights?.returnFlight}
            returnFlight={true}
          />
        )}
      </Section>
    </div>
  );
};

export default FlightView;
