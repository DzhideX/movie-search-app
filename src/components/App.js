import React from 'react';
import Movies from './MovieSearch';
import Navigation from './Navigation';

function App() {
  return (
    <div data-test='app' className='app'>
        <Navigation />
        <Movies />
    </div>
  );
}

export default App;
