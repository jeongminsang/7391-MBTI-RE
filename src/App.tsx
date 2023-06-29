import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Survey from './pages/Survey';
import Result from './pages/Result';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/survey' element={<Survey />} />
        <Route path='/result/:MbtiName' element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
