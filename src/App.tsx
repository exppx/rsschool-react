import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '@ui/AppLayout';
import { ThemeProvider } from './contexts/theme';
import { ErrorBoundary } from '@ui/ErrorBoundary';
import { Fallback } from '@ui/Fallback';
import { NewsPage } from './pages/NewsPage';
import { NewsDetails } from '@news/NewsDetails';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<Fallback />}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<NewsPage />}>
                <Route path="details" element={<NewsDetails />} />
              </Route>
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
