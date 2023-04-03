import React, {Suspense, lazy} from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Waiting from './components/Waiting/Waiting';
import './App.scss';

const MainPage = lazy(() => import('./components/MainPage'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense
          fallback={
            <Waiting />
          }
          >
            <Routes>
              <Route path="*" element={<MainPage />} />
            </Routes>
          </Suspense>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
              style: {
                position: 'relative',
                top: '4rem',
                right: '1.5rem',
                margin: '5px 0',
                padding: '.7rem 1.5rem',
                color: 'white',
                fontSize: '16px',
                borderRadius: '20px',
                border: '2px solid #10172a',
                boxShadow:
                    '0px 0px 0px 1.6px #1A2238, -4px -4px 8px rgba(255, 255, 255, 0.1), 4px 8px 8px rgba(1, 7, 19, 0.2)',
                background: 'linear-gradient(135deg, #35405b 0%, #222c45 100%)',
              },
            }}
          />
      </BrowserRouter>
    </div>
  );
}

export default App;
