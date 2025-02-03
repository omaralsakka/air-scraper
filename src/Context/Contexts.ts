import { createContext } from 'react';
import {
  FlightsContextType,
  SearchEngineContextType,
  SelectedFlightsContextType,
} from '../Types/Types';

export const SearchEngineContext = createContext<
  SearchEngineContextType | undefined
>(undefined);

export const FlightsContext = createContext<FlightsContextType | undefined>(
  undefined
);

export const SelectedFlightsContext = createContext<
  SelectedFlightsContextType | undefined
>(undefined);
