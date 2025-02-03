import FlightCard from '../Components/FlightCard';
import {
  useFlights,
  useSearchEngine,
  useSelectedFlights,
} from '../Hooks/Hooks';

const FlightsSelection = () => {
  const { flights } = useFlights();
  const { selectedFlights } = useSelectedFlights();
  const { tripType } = useSearchEngine();
  return (
    <div>
      {flights.length > 0 && !selectedFlights?.goingFlight && (
        <FlightCard returnTrip={false} />
      )}

      {tripType === 'roundTrip' &&
        selectedFlights?.goingFlight &&
        !selectedFlights?.returnFlight && <FlightCard returnTrip={true} />}
    </div>
  );
};

export default FlightsSelection;
