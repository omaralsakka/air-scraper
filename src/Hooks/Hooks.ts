import { useContext } from 'react';
import {
  FlightsContext,
  SearchEngineContext,
  SelectedFlightsContext,
} from '../Context/Contexts';
import {
  FlightsContextType,
  SearchEngineContextType,
  SelectedFlightsContextType,
} from '../Types/Types';

export const useFlights = (): FlightsContextType => {
  const context = useContext(FlightsContext);
  if (!context) {
    throw new Error('useFlights must be used within a FlightsProvider');
  }
  return context;
};

export const useSelectedFlights = (): SelectedFlightsContextType => {
  const context = useContext(SelectedFlightsContext);
  if (!context) {
    throw new Error(
      'useSelectedFlights must be used within a SelectedFlightsProvider'
    );
  }
  return context;
};

export const useSearchEngine = (): SearchEngineContextType => {
  const context = useContext(SearchEngineContext);
  if (!context) {
    throw new Error(
      'useSearchEngine must be used within a SearchEngineProvider'
    );
  }
  return context;
};
