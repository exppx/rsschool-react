import { AppLayout } from '@ui/AppLayout';
import { NewsPage } from './pages/NewsPage';
import { ErrorBoundary } from '@ui/ErrorBoundary';
import { Fallback } from '@ui/Fallback';

function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <AppLayout>
        <NewsPage />
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
