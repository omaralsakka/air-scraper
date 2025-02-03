import React, { useEffect, useState } from 'react';
import { getSearchFlightsData } from '../Helpers/helpers';
import { Spinner, Button } from '@radix-ui/themes';
import {
  CurrencySelect,
  FlightClassSelect,
  FlightTypeSelect,
} from '../Utils/utils';
import { PassengersAmountDropDown } from '../Components/PassengersAmountDropDown';
import WarningCallout from '../Components/WarningCallout';
import SanitizedTextField from '../Components/SanitizedTextField';
import DateSelector from '../Components/DateSelector';
import { useFlights, useSearchEngine } from '../Hooks/Hooks';

const SearchEngine: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [calloutMessage, setCalloutMessage] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const { setFlights } = useFlights();
  const {
    tripType,
    setTripType,
    cabinClass,
    setCabinClass,
    passengersCount,
    setPassengersCount,
  } = useSearchEngine();

  const onTripTypeChange = (value: string) => {
    setTripType(value);
  };

  const onTripClassChange = (value: string) => {
    setCabinClass(value);
  };

  const onCurrencyChange = (value: string) => {
    setCurrency(value);
  };

  const onSetFromChange = (value: string) => {
    setFrom(value);
  };

  const onSetToChange = (value: string) => {
    setTo(value);
  };

  const onSetDateChange = (value: string) => {
    setDate(value);
  };

  const onSetReturnDateChange = (value: string) => {
    setReturnDate(value);
  };

  const onSetCount = (adultCount: number, childrenCount: number) => {
    setPassengersCount({
      adultCount,
      childrenCount,
    });
  };

  const searchFlights = async () => {
    setLoading(true);

    const flights = await getSearchFlightsData({
      from,
      to,
      date,
      passengersCount,
      cabinClass,
      returnDate,
      currency,
    });

    setFlights(flights);

    if (flights.length === 0) {
      setCalloutMessage('No flights were found with this info.');
    } else {
      setCalloutMessage('');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (
      from &&
      to &&
      date &&
      (tripType === 'oneWay' ||
        (tripType === 'roundTrip' && returnDate.length !== 0))
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [from, to, date, tripType, returnDate]);

  return (
    <div aria-label="search-engine" className="w-screen pt-3 lg:w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Flights</h1>
      <div className="flex items-center flex-wrap mb-2 gap-2">
        <FlightTypeSelect onChange={onTripTypeChange} />
        <PassengersAmountDropDown
          count={passengersCount}
          onSetCount={onSetCount}
        />
        <FlightClassSelect onChange={onTripClassChange} />
        <CurrencySelect onChange={onCurrencyChange} />
      </div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <SanitizedTextField
          placeholder="from"
          value={from}
          onChange={onSetFromChange}
        />
        <SanitizedTextField
          placeholder="to"
          value={to}
          onChange={onSetToChange}
        />
        <DateSelector
          travelDate={date}
          returnDate={returnDate}
          tripType={tripType}
          onTravelDateChange={onSetDateChange}
          onReturnDateChange={onSetReturnDateChange}
        />
      </div>
      <Button
        className="mb-3"
        size={'3'}
        onClick={searchFlights}
        disabled={loading || disabled}
      >
        {loading ? <Spinner className="p-3" /> : 'Search'}
      </Button>

      {calloutMessage.length > 0 && <WarningCallout message={calloutMessage} />}
    </div>
  );
};

export default SearchEngine;
