/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSearchAirport, getSearchFlights } from '../Routes/routes.ts';
import {
  AirportSchema,
  ItinerariesSchema,
  Itinerary,
} from '../Schemas/flightSchema.ts';
import {
  Flight,
  GetSearchFlightDataProps,
  LegData,
  SearchAirportData,
} from '../Types/Types.ts';

const processItineraries = (itineraries: any[]): Itinerary[] => {
  const validationResult = ItinerariesSchema.safeParse(itineraries);

  if (!validationResult.success) {
    console.error('Invalid itineraries data:', validationResult.error.format());
    return [];
  }

  return validationResult.data;
};

const processAirportData = (airportData: any): SearchAirportData => {
  const validationResult = AirportSchema.safeParse(airportData);
  if (!validationResult.success) {
    console.error('Invalid Airport data:', validationResult.error.format());
    return { skyId: '', entityId: '' };
  }

  return validationResult.data;
};

export const getSearchAirportData = async (
  location: string
): Promise<SearchAirportData> => {
  const searchAirportData = { skyId: '', entityId: '' };

  try {
    const responseData = await getSearchAirport(location);
    const validateResponse = processAirportData(responseData.data[0]);

    searchAirportData.skyId = validateResponse.skyId;
    searchAirportData.entityId = validateResponse.entityId;
  } catch (error) {
    console.error('Error fetching AirportData', error);
  }

  return searchAirportData;
};

export const getSearchFlightsData = async ({
  from,
  to,
  date,
  passengersCount,
  cabinClass,
  returnDate,
  currency,
}: GetSearchFlightDataProps) => {
  const flightFrom = await getSearchAirportData(from);
  const flightTo = await getSearchAirportData(to);
  let flights: Flight[] = [];

  const params = {
    originSkyId: flightFrom.skyId,
    destinationSkyId: flightTo.skyId,
    originEntityId: flightFrom.entityId,
    destinationEntityId: flightTo.entityId,
    date: date,
    returnDate: returnDate.length > 0 ? returnDate : null,
    adults: passengersCount.adultCount,
    childrens:
      passengersCount.childrenCount > 0 ? passengersCount.childrenCount : null,
    cabinClass,
    currency,
    limit: 20,
  };

  try {
    const searchflightsResponse = await getSearchFlights(params);

    const itineraries = searchflightsResponse.data.itineraries;
    const validFlights = processItineraries(itineraries);

    const getLegData = (leg: any) => {
      const departure = leg.departure;
      const arrival = leg.arrival;
      const duration = leg.durationInMinutes;
      const segments = leg.segments;
      const marketingAirline = {
        airlineLogo: leg.carriers.marketing[0].logoUrl,
        airlineName: leg.carriers.marketing[0].name,
      };
      let operatingAirline = { airlineName: '', airlineLogo: '' };

      if (leg.carriers.operating && leg.carriers.operating.length > 0) {
        operatingAirline = {
          airlineLogo: leg.carriers.operating[0].logoUrl,
          airlineName: leg.carriers.operating[0].name,
        };
      }

      return {
        departure,
        arrival,
        duration,
        segments,
        marketingAirline,
        operatingAirline,
      };
    };

    flights = validFlights.map((itinerary: any) => {
      const price = itinerary.price.formatted;

      const flight: Flight = {
        to: flightTo.skyId,
        from: flightFrom.skyId,
        price,
        goingFlight: getLegData(itinerary.legs[0]),
        returnFlight:
          itinerary.legs.length > 1 ? getLegData(itinerary.legs[1]) : undefined,
      };
      return flight;
    });
  } catch (error) {
    console.error('Error fetching flights', error);
  }

  return flights;
};

export const sanitizeInput = (text: string) => {
  return /^[a-z]*$/.test(text);
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

export const formatMinutesToHoursMinutes = (minutesString: string) => {
  const totalMinutes = parseInt(minutesString, 10);

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const formattedTime = `${
    hours > 0 ? hours + 'h ' : ''
  }${remainingMinutes}min`;
  return formattedTime;
};

export const formatTimeDifference = (
  startDateString: string,
  endDateString: string
) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  const differenceInMinutes = Math.round(
    differenceInMilliseconds / (1000 * 60)
  );

  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  const formattedTime = `${hours > 0 ? hours + 'h ' : ''}${
    minutes > 0 ? minutes + 'min' : ''
  }`;
  return formattedTime;
};

export const getWaitingTime = (flightLegData: LegData) => {
  const arrivalTime = flightLegData.segments[0].arrival;
  const departureTime = flightLegData.segments[1].departure;

  return formatTimeDifference(arrivalTime, departureTime);
};

export const convertDateToCalendarDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
