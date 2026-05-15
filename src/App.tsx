import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '@ui/AppLayout';
import { ErrorBoundary } from '@ui/ErrorBoundary';
import { Fallback } from '@ui/Fallback';
import { NewsPage } from './pages/NewsPage';
import { NewsDetails } from '@news/NewsDetails';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<NewsPage />}>
              <Route path="details" element={<NewsDetails />} />
            </Route>
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
