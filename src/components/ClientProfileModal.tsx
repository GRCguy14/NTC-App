import type { Client } from '../types';
import { STATUS_EMOJI, STATUS_LABEL } from '../utils/constants';
import { formatDisplayDate, getClientStatus } from '../utils/dateHelpers';

interface ClientProfileModalProps {
  client: Client;
  onClose: () => void;
  onEdit: () => void;
  onRequestDelete: () => void;
}

function statusBadgeClass(status: ReturnType<typeof getClientStatus>) {
  if (status === 'overdue') return 'bg-red-100 text-red-800 border-red-200';
  if (status === 'dueSoon') return 'bg-amber-100 text-amber-900 border-amber-200';
  return 'bg-emerald-100 text-emerald-800 border-emerald-200';
}

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
}

export function ClientProfileModal({
  client,
  onClose,
  onEdit,
  onRequestDelete,
}: ClientProfileModalProps) {
  const status = getClientStatus(client.dueDate);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{client.name}</h2>
              <p className="text-sm text-slate-600">Card {client.cardNo}</p>
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium ${statusBadgeClass(status)}`}
            >
              <span aria-hidden>{STATUS_EMOJI[status]}</span>
              {STATUS_LABEL[status]}
            </span>
          </div>
          <span
            className={`mt-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${
              client.isManual
                ? 'bg-slate-100 text-slate-700'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            {client.isManual ? 'Manual' : 'Imported'}
          </span>
        </div>

        <div className="space-y-4 px-4 py-4 text-sm">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contract
            </h3>
            <dl className="mt-2 grid grid-cols-2 gap-2 text-slate-800">
              <div>
                <dt className="text-slate-500">Wash</dt>
                <dd className="font-medium">{client.jetOrSimple}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Frequency</dt>
                <dd className="font-medium">{client.freq}× / year</dd>
              </div>
              <div>
                <dt className="text-slate-500">AC units</dt>
                <dd className="font-medium">{client.noOfACs}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Serial no.</dt>
                <dd className="font-medium">{client.srNo}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Start</dt>
                <dd className="font-medium">{formatDisplayDate(client.startDate)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Due</dt>
                <dd className="font-medium">{formatDisplayDate(client.dueDate)}</dd>
              </div>
            </dl>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contacts
            </h3>
            <div className="mt-2 space-y-2 text-slate-800">
              <div>
                <p className="text-slate-500">Primary</p>
                <p>
                  {[client.primaryContactName, client.primaryPhone].filter(Boolean).join(' · ') ||
                    '—'}
                </p>
                {client.primaryPhone && telHref(client.primaryPhone) && (
                  <a
                    href={telHref(client.primaryPhone)!}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Call {client.primaryPhone}
                  </a>
                )}
              </div>
              {(client.secondaryContactName || client.secondaryPhone) && (
                <div>
                  <p className="text-slate-500">Secondary</p>
                  <p>
                    {[client.secondaryContactName, client.secondaryPhone]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  {client.secondaryPhone && telHref(client.secondaryPhone) && (
                    <a
                      href={telHref(client.secondaryPhone)!}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Call {client.secondaryPhone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onRequestDelete}
            className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
