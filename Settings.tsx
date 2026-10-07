import { useRef, useState, type ChangeEvent } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';
import { useTheme, type Theme } from '../hooks/useTheme';
import { downloadBackup, readBackup } from '../services/backupService';
import { dashboardActions } from '../store/dashboardStore';

const themes: Array<{ value: Theme; label: string }> = [
  { value: 'system', label: 'Systeem' },
  { value: 'light', label: 'Licht' },
  { value: 'dark', label: 'Donker' },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const notify = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const onImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const backup = await readBackup(file);
    if (!backup) return notify('Dit bestand is geen geldige back-up.', 'error');
    dashboardActions.replace(backup);
    notify('Back-up hersteld.', 'success');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Instellingen</h1>
      <Card>
        <h2 className="mb-2 font-semibold">Weergave</h2>
        <div className="flex gap-2">
          {themes.map((t) => (
            <Button key={t.value} variant={theme === t.value ? 'primary' : 'secondary'} onClick={() => setTheme(t.value)}>
              {t.label}
            </Button>
          ))}
        </div>
      </Card>
      <Card>
        <h2 className="mb-1 font-semibold">Gegevens</h2>
        <p className="mb-3 text-sm text-slate-500">
          Je dashboard staat alleen op dit apparaat. Maak regelmatig een back-up.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={downloadBackup}>Back-up maken</Button>
          <Button variant="secondary" onClick={() => fileInput.current?.click()}>
            Back-up herstellen
          </Button>
          <Button variant="danger" onClick={() => setConfirmReset(true)}>
            Dashboard wissen
          </Button>
        </div>
        <input ref={fileInput} type="file" accept="application/json" hidden onChange={onImport} />
      </Card>
      <Modal open={confirmReset} title="Dashboard wissen?" onClose={() => setConfirmReset(false)}>
        <p className="mb-3 text-sm">Alle widgets en hun inhoud worden verwijderd.</p>
        <Button
          variant="danger"
          onClick={() => {
            dashboardActions.reset();
            setConfirmReset(false);
            notify('Dashboard gewist.', 'success');
          }}
        >
          Ja, alles wissen
        </Button>
      </Modal>
    </div>
  );
}
