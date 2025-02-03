import { ReactNode, useState } from 'react';

import {
  Flight,
  PassengersCount,
  ProvidersProps,
  SelectedFlights,
} from '../Types/Types';
import {
  FlightsContext,
  SearchEngineContext,
  SelectedFlightsContext,
} from '../Context/Contexts';

export const FlightsProvider = ({ children }: { children: ReactNode }) => {
  const [flights, setFlights] = useState<Flight[]>([]);

  return (
    <FlightsContext.Provider value={{ flights, setFlights }}>
      {children}
    </FlightsContext.Provider>
  );
};

export const SelectedFlightsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedFlights, setSelectedFlights] = useState<SelectedFlights>();

  return (
    <SelectedFlightsContext.Provider
      value={{ selectedFlights, setSelectedFlights }}
    >
      {children}
    </SelectedFlightsContext.Provider>
  );
};

export const SearchEngineProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tripType, setTripType] = useState<string>('roundTrip');
  const [cabinClass, setCabinClass] = useState<string>('economy');
  const [passengersCount, setPassengersCount] = useState<PassengersCount>({
    adultCount: 1,
    childrenCount: 0,
  });
  return (
    <SearchEngineContext.Provider
      value={{
        tripType,
        setTripType,
        cabinClass,
        setCabinClass,
        passengersCount,
        setPassengersCount,
      }}
    >
      {children}
    </SearchEngineContext.Provider>
  );
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SearchEngineProvider>
      <FlightsProvider>
        <SelectedFlightsProvider>{children}</SelectedFlightsProvider>
      </FlightsProvider>
    </SearchEngineProvider>
  );
};

export default Providers;
