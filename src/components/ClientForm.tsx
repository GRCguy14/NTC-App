import { id } from '@instantdb/react';
import { useMemo, useState } from 'react';
import db from '../lib/db';
import type { Client } from '../types';
import { addOneYearIso, addTwoYearsIso, formatDisplayDate } from '../utils/dateHelpers';

type Mode = 'add' | 'edit';

interface ClientFormProps {
  mode: Mode;
  client: Client | null;
  allClients: Client[];
  onClose: () => void;
  onSaved: () => void;
}

export function ClientForm({ mode, client, allClients, onClose, onSaved }: ClientFormProps) {
  const isImportedEdit = mode === 'edit' && client && !client.isManual;

  const nextSrNo = useMemo(() => {
    if (allClients.length === 0) return 1;
    return Math.max(...allClients.map((c) => c.srNo)) + 1;
  }, [allClients]);

  const [cardNo, setCardNo] = useState(client?.cardNo ?? '');
  const [cardIssueDate, setCardIssueDate] = useState(client?.cardIssueDate ?? '');
  const [name, setName] = useState(client?.name ?? '');
  const [freq, setFreq] = useState<number>(client?.freq ?? 2);
  const [noOfACs, setNoOfACs] = useState<number>(client?.noOfACs ?? 1);
  const [jetOrSimple, setJetOrSimple] = useState<'Jet' | 'Simple'>(
    (client?.jetOrSimple as 'Jet' | 'Simple') || 'Jet',
  );
  const [startDate, setStartDate] = useState(client?.startDate ?? '');
  const [dueDateImp, setDueDateImp] = useState(client?.dueDate ?? '');

  const [primaryContactName, setPrimaryContactName] = useState(client?.primaryContactName ?? '');
  const [primaryPhone, setPrimaryPhone] = useState(client?.primaryPhone ?? '');
  const [secondaryContactName, setSecondaryContactName] = useState(
    client?.secondaryContactName ?? '',
  );
  const [secondaryPhone, setSecondaryPhone] = useState(client?.secondaryPhone ?? '');

  const dueReadOnly =
    startDate && !isImportedEdit ? addOneYearIso(startDate) : '';

  function handleStartChange(v: string) {
    setStartDate(v);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cardNo.trim() || !name.trim() || !startDate) return;
    if (isImportedEdit && !dueDateImp) return;

    const dueDateToSave = isImportedEdit ? dueDateImp : addOneYearIso(startDate);

    const cardIssueTrim = cardIssueDate.trim();

    const payload = {
      srNo: mode === 'add' ? nextSrNo : client!.srNo,
      cardNo: cardNo.trim(),
      name: name.trim(),
      freq,
      noOfACs,
      jetOrSimple,
      startDate,
      dueDate: dueDateToSave,
      isManual: mode === 'add' ? true : client!.isManual,
      primaryContactName: primaryContactName.trim() || undefined,
      primaryPhone: primaryPhone.trim() || undefined,
      secondaryContactName: secondaryContactName.trim() || undefined,
      secondaryPhone: secondaryPhone.trim() || undefined,
      cardIssueDate: cardIssueTrim || undefined,
      cardRenewalDate: cardIssueTrim ? addTwoYearsIso(cardIssueTrim) : undefined,
    };

    if (mode === 'add') {
      db.transact([db.tx.clients[id()].update(payload)]);
    } else {
      db.transact([db.tx.clients[client!.id].update(payload)]);
    }
    onSaved();
  }

  const title = mode === 'add' ? 'Add client' : 'Edit client';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 px-4 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-slate-700">Card No. *</span>
              <input
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                value={cardNo}
                onChange={(e) => setCardNo(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-700">Card issue date</span>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                value={cardIssueDate}
                onChange={(e) => setCardIssueDate(e.target.value)}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-700">Card renewal date (computed)</span>
              <input
                readOnly
                className="mt-1 w-full cursor-not-allowed rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm text-slate-700"
                value={
                  cardIssueDate.trim()
                    ? formatDisplayDate(addTwoYearsIso(cardIssueDate.trim()))
                    : '—'
                }
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-medium text-slate-700">Client name *</span>
              <input
                required
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-700">Frequency *</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                value={freq}
                onChange={(e) => setFreq(Number(e.target.value))}
              >
                <option value={1}>1× per year</option>
                <option value={2}>2× per year</option>
                <option value={3}>3× per year</option>
                <option value={4}>4× per year</option>
                <option value={5}>5× per year</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-700">No. of ACs *</span>
              <input
                required
                type="number"
                min={1}
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                value={noOfACs}
                onChange={(e) => setNoOfACs(Number(e.target.value))}
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-slate-700">Wash type *</span>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                value={jetOrSimple}
                onChange={(e) => setJetOrSimple(e.target.value as 'Jet' | 'Simple')}
              >
                <option value="Jet">Jet</option>
                <option value="Simple">Simple</option>
              </select>
            </label>
            {mode === 'add' && (
              <p className="text-sm text-slate-600 sm:col-span-2">
                Serial no. will be <span className="font-semibold">{nextSrNo}</span>.
              </p>
            )}
            <label className="block text-sm">
              <span className="font-medium text-slate-700">Start date *</span>
              <input
                required
                type="date"
                className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                value={startDate}
                onChange={(e) => handleStartChange(e.target.value)}
              />
            </label>
            {isImportedEdit ? (
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Due date *</span>
                <input
                  required
                  type="date"
                  className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  value={dueDateImp}
                  onChange={(e) => setDueDateImp(e.target.value)}
                />
              </label>
            ) : (
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Due date (computed)</span>
                <input
                  readOnly
                  className="mt-1 w-full cursor-not-allowed rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-sm text-slate-700"
                  value={dueReadOnly}
                />
              </label>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contacts</p>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Primary name</span>
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  value={primaryContactName}
                  onChange={(e) => setPrimaryContactName(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Primary phone</span>
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Secondary name</span>
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  value={secondaryContactName}
                  onChange={(e) => setSecondaryContactName(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-700">Secondary phone</span>
                <input
                  className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
