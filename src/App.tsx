import React, { useEffect, useState } from 'react';
import SearchEngine from './Apps/SearchEngine';
import { Container, Theme } from '@radix-ui/themes';
import Navbar from './Components/Navbar';
import FlightsSelection from './Apps/FlightsSelection';
import FlightView from './Apps/FlightView';
import { useSearchEngine, useSelectedFlights } from './Hooks/Hooks';

const App: React.FC = () => {
  const { selectedFlights } = useSelectedFlights();
  const { tripType } = useSearchEngine();
  const [renderEngine, setRenderEngine] = useState(true);

  useEffect(() => {
    if (tripType === 'oneWay' && selectedFlights?.goingFlight) {
      setRenderEngine(false);
    } else if (tripType === 'roundTrip' && selectedFlights?.returnFlight) {
      setRenderEngine(false);
    }
  }, [tripType, selectedFlights]);

  return (
    <Theme aria-label="theme" className="w-full">
      <Navbar />
      <Container
        aria-label="mid-container"
        className="w-full min-h-screen flex items-center justify-center pt-16 px-3"
      >
        {renderEngine && <SearchEngine />}
        <FlightsSelection />
        {!renderEngine && <FlightView />}
      </Container>
    </Theme>
  );
};

export default App;
