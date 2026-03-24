import { useMemo, useState } from 'react';
import { useSeedClients } from '../hooks/useSeedClients';
import db from '../lib/db';
import type { Client } from '../types';
import type { FreqFilter, SortKey, StatusFilter, WashFilter } from '../utils/constants';
import { getClientStatus } from '../utils/dateHelpers';
import { ClientForm } from './ClientForm';
import { ClientProfileModal } from './ClientProfileModal';
import { ClientTable, sortClients, type SortDir } from './ClientTable';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { KPICards } from './KPICards';
import { SearchAndFilters } from './SearchAndFilters';

function filterClients(
  all: Client[],
  search: string,
  wash: WashFilter,
  status: StatusFilter,
  freq: FreqFilter,
): Client[] {
  let list = all;
  const q = search.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.cardNo.toLowerCase().includes(q) ||
        (c.primaryContactName ?? '').toLowerCase().includes(q) ||
        (c.secondaryContactName ?? '').toLowerCase().includes(q),
    );
  }
  if (wash !== 'all') list = list.filter((c) => c.jetOrSimple === wash);
  if (status !== 'all') list = list.filter((c) => getClientStatus(c.dueDate) === status);
  if (freq !== 'all') list = list.filter((c) => String(c.freq) === freq);
  return list;
}

export function Dashboard() {
  const { isLoading, error, data } = db.useQuery({ clients: {} });
  const clients = (data?.clients ?? []) as Client[];

  useSeedClients(data?.clients, isLoading);

  const [search, setSearch] = useState('');
  const [wash, setWash] = useState<WashFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [freq, setFreq] = useState<FreqFilter>('all');

  const [sortKey, setSortKey] = useState<SortKey>('dueDate');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const [profileClient, setProfileClient] = useState<Client | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const [formClient, setFormClient] = useState<Client | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(
    null,
  );

  const filtered = useMemo(
    () => filterClients(clients, search, wash, status, freq),
    [clients, search, wash, status, freq],
  );

  const sortedFiltered = useMemo(
    () => sortClients(filtered, sortKey, sortDir),
    [filtered, sortKey, sortDir],
  );

  function handleSortChange(key: SortKey) {
    setSortKey((k) => {
      if (k === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        return k;
      }
      setSortDir('asc');
      return key;
    });
  }

  function openAdd() {
    setFormClient(null);
    setFormMode('add');
  }

  function closeForm() {
    setFormMode(null);
    setFormClient(null);
  }

  function openEditFromProfile() {
    if (!profileClient) return;
    setFormClient(profileClient);
    setFormMode('edit');
    setProfileClient(null);
  }

  function handleSaved() {
    closeForm();
    setProfileClient(null);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    db.transact([db.tx.clients[pendingDelete.id].delete()]);
    setPendingDelete(null);
    setProfileClient(null);
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">Could not load data. Check your connection and Instant app ID.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">AC Service — Clients</h1>
            <p className="text-sm text-slate-600">Annual maintenance contracts</p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            + Add client
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4 px-4 py-4">
        {isLoading ? (
          <p className="text-slate-600">Loading…</p>
        ) : (
          <>
            <KPICards clients={clients} />
            <SearchAndFilters
              search={search}
              onSearchChange={setSearch}
              wash={wash}
              onWashChange={setWash}
              status={status}
              onStatusChange={setStatus}
              freq={freq}
              onFreqChange={setFreq}
              filteredCount={sortedFiltered.length}
              totalCount={clients.length}
            />
            {sortedFiltered.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white py-12 text-center text-slate-600">
                No clients match your search or filters.
              </div>
            ) : (
              <ClientTable
                clients={sortedFiltered}
                sortKey={sortKey}
                sortDir={sortDir}
                onSortChange={handleSortChange}
                onRowClick={setProfileClient}
              />
            )}
          </>
        )}
      </main>

      {profileClient && (
        <ClientProfileModal
          client={profileClient}
          onClose={() => setProfileClient(null)}
          onEdit={openEditFromProfile}
          onRequestDelete={() =>
            setPendingDelete({ id: profileClient.id, name: profileClient.name })
          }
        />
      )}

      <DeleteConfirmDialog
        open={!!pendingDelete}
        clientName={pendingDelete?.name ?? ''}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />

      {formMode && (
        <ClientForm
          mode={formMode}
          client={formClient}
          allClients={clients}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
