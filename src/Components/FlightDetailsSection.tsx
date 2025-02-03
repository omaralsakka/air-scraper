import { Avatar, Separator, Text } from '@radix-ui/themes';
import { useSearchEngine } from '../Hooks/Hooks';
import { Flight } from '../Types/Types';
import {
  convertDateToCalendarDate,
  formatMinutesToHoursMinutes,
  formatTime,
  getWaitingTime,
} from '../Helpers/helpers';
import {
  LightningBoltIcon,
  Link1Icon,
  SpaceBetweenVerticallyIcon,
} from '@radix-ui/react-icons';

const FlightDetailsSection = ({
  flight,
  returnFlight,
}: {
  flight: Flight;
  returnFlight: boolean;
}) => {
  const { cabinClass } = useSearchEngine();

  const selectedFlight = returnFlight
    ? flight.returnFlight
    : flight.goingFlight;

  return (
    <div className="w-full border shadow-md p-3 rounded bg-white flex">
      <Avatar
        src={selectedFlight?.marketingAirline.airlineLogo}
        fallback="A"
        alt="airline"
        className="me-3"
        size="4"
      />
      <div className="w-full flex gap-2 flex-col">
        <div className="w-full flex gap-2">
          <div className="flex flex-col gap-2">
            <Text as="div" size="3" weight="bold">
              {convertDateToCalendarDate(selectedFlight!.segments[0].departure)}
            </Text>

            <Text
              className="flex items-center gap-2"
              as="div"
              size="3"
              weight="bold"
            >
              {formatTime(selectedFlight!.segments[0].departure)}.{' '}
              {selectedFlight!.segments[0].origin.name}
            </Text>
            <Text
              className="flex items-center gap-2"
              as="div"
              size="2"
              color="gray"
            >
              Travel time:{' '}
              {formatMinutesToHoursMinutes(
                selectedFlight!.segments[0].durationInMinutes
              )}
            </Text>
            <Text
              className="flex items-center gap-2"
              as="div"
              size="3"
              weight="bold"
            >
              {formatTime(selectedFlight!.segments[0].arrival)}.{' '}
              {selectedFlight!.segments[0].destination.name}
            </Text>
            <Text
              className="flex items-center gap-2"
              as="div"
              size="2"
              color="gray"
            >
              {selectedFlight!.marketingAirline.airlineName} . {cabinClass}
            </Text>
          </div>
          <div className="flex flex-col gap-1 pr-3 ms-auto">
            <Text
              className="flex items-center gap-3"
              as="div"
              size="2"
              color="gray"
            >
              <SpaceBetweenVerticallyIcon /> Average leg room
            </Text>
            <Text
              className="flex items-center gap-3"
              as="div"
              size="2"
              color="gray"
            >
              <Link1Icon /> Wifi for a fee
            </Text>
            <Text
              className="flex items-center gap-3"
              as="div"
              size="2"
              color="gray"
            >
              <LightningBoltIcon /> In-seat USB outlet
            </Text>
          </div>
        </div>

        {selectedFlight!.segments.length > 1 && (
          <div className="flex flex-col gap-2 mt-3">
            <Separator className="w-full" />
            <Text
              className="flex items-center gap-2 my-2 ms-15"
              as="div"
              size="2"
              weight="bold"
            >
              {getWaitingTime(selectedFlight!)} layover .{' '}
              {selectedFlight!.segments[1].origin.name}
            </Text>
            <Separator className="w-full" />
            <div className="flex">
              <div className="flex flex-col gap-2">
                <Text
                  className="flex items-center gap-2"
                  as="div"
                  size="3"
                  weight="bold"
                >
                  {formatTime(selectedFlight!.segments[1].departure)}.{' '}
                  {selectedFlight!.segments[1].origin.name}
                </Text>
                <Text
                  className="flex items-center gap-2"
                  as="div"
                  size="2"
                  color="gray"
                >
                  Travel time:{' '}
                  {formatMinutesToHoursMinutes(
                    selectedFlight!.segments[1].durationInMinutes
                  )}
                </Text>
                <Text
                  className="flex items-center gap-2"
                  as="div"
                  size="3"
                  weight="bold"
                >
                  {formatTime(selectedFlight!.segments[1].arrival)}.{' '}
                  {selectedFlight!.segments[1].destination.name}
                </Text>
                <Text
                  className="flex items-center gap-2"
                  as="div"
                  size="2"
                  color="gray"
                >
                  {selectedFlight!.segments[1].marketingCarrier.name} .{' '}
                  {cabinClass}
                </Text>
              </div>
              <div className="flex flex-col gap-1 pr-3 ms-auto">
                <Text
                  className="flex items-center gap-3"
                  as="div"
                  size="2"
                  color="gray"
                >
                  <SpaceBetweenVerticallyIcon /> Average leg room
                </Text>
                <Text
                  className="flex items-center gap-3"
                  as="div"
                  size="2"
                  color="gray"
                >
                  <Link1Icon /> Wifi for a fee
                </Text>
                <Text
                  className="flex items-center gap-3"
                  as="div"
                  size="2"
                  color="gray"
                >
                  <LightningBoltIcon /> In-seat USB outlet
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetailsSection;
