import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import './index.css';

registerSW({ immediate: true });
// Vraagt de browser om de opgeslagen gegevens niet automatisch op te ruimen.
void navigator.storage?.persist?.();

const root = document.getElementById('root');
if (!root) throw new Error('Root element ontbreekt');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary fallback={<p className="p-6">Er ging iets mis. Ververs de pagina.</p>}>
      <BrowserRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
