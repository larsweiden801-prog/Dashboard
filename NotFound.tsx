import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';

export default function NotFound() {
  return (
    <EmptyState title="Pagina niet gevonden">
      <Link className="text-teal-700 underline dark:text-teal-400" to="/">
        Naar het dashboard
      </Link>
    </EmptyState>
  );
}
