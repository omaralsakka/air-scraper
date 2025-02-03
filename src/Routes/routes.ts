import axios from 'axios';
import { XRAPIDAPIHOST, XRAPIDAPIKEY } from '../Globals/GLOBAL_KEYS';
import { SearchFlightsParams } from '../Types/Types';

export const getSearchAirport = async (location: string) => {
  const searchAirportPayload = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
    params: { query: location },
    headers: {
      'X-RapidAPI-Key': XRAPIDAPIKEY,
      'X-RapidAPI-Host': XRAPIDAPIHOST,
    },
  };

  const response = await axios.request(searchAirportPayload);

  return response.data;
};

export const getSearchFlights = async (params: SearchFlightsParams) => {
  const optionsPayload = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
    params,
    headers: {
      'X-RapidAPI-Key': XRAPIDAPIKEY,
      'X-RapidAPI-Host': XRAPIDAPIHOST,
    },
  };

  const response = await axios.request(optionsPayload);
  return response.data;
};
