import { Flight, FlightCardProps } from '../Types/Types';
import { Avatar, Box, Button, Card, Flex, Text } from '@radix-ui/themes';
import {
  formatMinutesToHoursMinutes,
  formatTime,
  getWaitingTime,
} from '../Helpers/helpers';
import { useFlights, useSelectedFlights } from '../Hooks/Hooks';

const FlightCard = ({ returnTrip }: FlightCardProps) => {
  const { selectedFlights, setSelectedFlights } = useSelectedFlights();
  const { flights } = useFlights();

  // this is for simplicity of this task, to avoid showing flights that has one or more stops atm
  const filteredFlights = flights.filter(
    (flight) => flight.goingFlight.segments.length <= 2
  );
  const setSelectedFlightsChange = (flight: Flight, returnTrip: boolean) => {
    if (returnTrip) {
      setSelectedFlights({
        ...selectedFlights!,
        returnFlight: flight,
      });
    } else {
      setSelectedFlights({ goingFlight: flight });
    }
  };
  return (
    <>
      {filteredFlights.map((flight, index) => {
        const flightTypeData =
          returnTrip && flight.returnFlight
            ? flight.returnFlight
            : flight.goingFlight;
        return (
          <Box key={index} width="w-full">
            <Card>
              <Flex align="center" justify="between" wrap="wrap">
                <Flex align="center" gap="6">
                  <Avatar
                    size={'2'}
                    fallback={flightTypeData.marketingAirline.airlineName}
                    alt={flightTypeData.marketingAirline.airlineName}
                    src={flightTypeData.marketingAirline.airlineLogo}
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {formatTime(flightTypeData.departure)} -{' '}
                      {formatTime(flightTypeData.arrival)}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {flightTypeData.marketingAirline.airlineName}
                    </Text>
                  </Box>
                </Flex>

                <Box>
                  <Text as="div" size="2" weight="bold">
                    {flightTypeData.segments.length > 1 ? `1 Stop` : `Nonstop`}
                  </Text>
                  {flightTypeData.segments.length > 1 && (
                    <Text as="div" size="2" color="gray">
                      {getWaitingTime(flightTypeData)}
                    </Text>
                  )}
                </Box>
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {formatMinutesToHoursMinutes(flightTypeData.duration)}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {returnTrip
                      ? `${flight.to} - ${flight.from}`
                      : `${flight.from} - ${flight.to}`}
                  </Text>
                </Box>
                <Flex align="center" gap="3">
                  <Button
                    className="w-auto"
                    onClick={() => setSelectedFlightsChange(flight, returnTrip)}
                  >
                    Select
                  </Button>

                  <Text as="div" size="2" weight="bold">
                    {flight.price}
                  </Text>
                </Flex>
              </Flex>
            </Card>
          </Box>
        );
      })}
    </>
  );
};

export default FlightCard;
