import { ReactNode } from 'react';

export type Airline = { airlineName: string; airlineLogo: string };

export interface LegData {
  marketingAirline: Airline;
  operatingAirline: Airline;
  departure: string;
  arrival: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  segments: any;
  duration: string;
}

export interface Flight {
  goingFlight: LegData;
  price: string;
  from: string;
  to: string;
  returnFlight?: LegData;
}

export interface SearchAirportData {
  skyId: string;
  entityId: string;
}

export interface SearchFlightsParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  adults: number;
  childrens: number | null;
  cabinClass: string;
  currency: string;
  limit: number;
}

export interface SingleSelectOptionsProps {
  value: string;
  label: string;
  logo?: React.ReactElement;
}

export type PassengersCount = { adultCount: number; childrenCount: number };
export interface PassengersAmountDropDownProps {
  count: PassengersCount;
  onSetCount: (adultCount: number, childrenCount: number) => void;
}

export interface WarningCalloutProps {
  message: string;
}

export interface GetSearchFlightDataProps {
  from: string;
  to: string;
  date: string;
  passengersCount: PassengersCount;
  cabinClass: string;
  returnDate: string;
  currency: string;
}

export interface SanitizedTextFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export interface DateSelectorProps {
  travelDate: string;
  returnDate: string;
  tripType: string;
  onTravelDateChange: (value: string) => void;
  onReturnDateChange: (value: string) => void;
}

export interface SelectedFlights {
  goingFlight: Flight;
  returnFlight?: Flight;
}

export interface ProvidersProps {
  children: ReactNode;
}

export interface FlightsContextType {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
}

export interface SelectedFlightsContextType {
  selectedFlights: SelectedFlights | undefined;
  setSelectedFlights: React.Dispatch<
    React.SetStateAction<SelectedFlights | undefined>
  >;
}

export interface FlightCardProps {
  returnTrip: boolean;
}

export interface SearchEngineContextType {
  tripType: string;
  setTripType: React.Dispatch<React.SetStateAction<string>>;
  cabinClass: string;
  setCabinClass: React.Dispatch<React.SetStateAction<string>>;
  passengersCount: PassengersCount;
  setPassengersCount: React.Dispatch<React.SetStateAction<PassengersCount>>;
}
