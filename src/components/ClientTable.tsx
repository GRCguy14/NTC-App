import type { Client } from '../types';
import type { SortKey } from '../utils/constants';
import { STATUS_EMOJI, STATUS_LABEL } from '../utils/constants';
import { formatDisplayDate, getClientStatus, parseLocalDate, rowHighlightClass } from '../utils/dateHelpers';

export type SortDir = 'asc' | 'desc';

interface ClientTableProps {
  clients: Client[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSortChange: (key: SortKey) => void;
  onRowClick: (client: Client) => void;
}

function cellHead(
  label: string,
  key: SortKey,
  sortKey: SortKey,
  sortDir: SortDir,
  onSort: (k: SortKey) => void,
) {
  const active = sortKey === key;
  return (
    <th scope="col" className="px-3 py-2 text-left">
      <button
        type="button"
        onClick={() => onSort(key)}
        className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-700"
      >
        {label}
        {active && <span className="text-xs text-blue-600">{sortDir === 'asc' ? '↑' : '↓'}</span>}
      </button>
    </th>
  );
}

function statusBadgeClass(status: ReturnType<typeof getClientStatus>) {
  if (status === 'overdue') return 'bg-red-100 text-red-800 border-red-200';
  if (status === 'dueSoon') return 'bg-amber-100 text-amber-900 border-amber-200';
  return 'bg-emerald-100 text-emerald-800 border-emerald-200';
}

function washBadgeClass(jetOrSimple: string) {
  return jetOrSimple === 'Jet'
    ? 'bg-blue-100 text-blue-800 border-blue-200'
    : 'bg-slate-100 text-slate-700 border-slate-200';
}

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
}

export function ClientTable({
  clients,
  sortKey,
  sortDir,
  onSortChange,
  onRowClick,
}: ClientTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {cellHead('Sr No.', 'srNo', sortKey, sortDir, onSortChange)}
            <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-700">
              Card No.
            </th>
            {cellHead('Client Name', 'name', sortKey, sortDir, onSortChange)}
            {cellHead('ACs', 'noOfACs', sortKey, sortDir, onSortChange)}
            <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-700">
              Freq
            </th>
            <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-700">
              Type
            </th>
            {cellHead('Due Date', 'dueDate', sortKey, sortDir, onSortChange)}
            <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-700">
              Status
            </th>
            <th scope="col" className="px-3 py-2 text-left font-semibold text-slate-700">
              Primary
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {clients.map((client) => {
            const status = getClientStatus(client.dueDate);
            const rowClass = rowHighlightClass(client.dueDate);
            const primaryName = client.primaryContactName?.trim();
            const primaryPhone = client.primaryPhone?.trim();
            const href = primaryPhone ? telHref(primaryPhone) : undefined;

            return (
              <tr
                key={client.id}
                onClick={() => onRowClick(client)}
                className={`cursor-pointer border-b border-slate-100 ${rowClass}`}
              >
                <td className="whitespace-nowrap px-3 py-2 text-slate-800">{client.srNo}</td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-800">{client.cardNo}</td>
                <td className="max-w-[200px] truncate px-3 py-2 text-slate-900">{client.name}</td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-800">{client.noOfACs}</td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-700">{client.freq}×/yr</td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span
                    className={`inline-block rounded border px-2 py-0.5 text-xs font-medium ${washBadgeClass(client.jetOrSimple)}`}
                  >
                    {client.jetOrSimple}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-slate-800">
                  {formatDisplayDate(client.dueDate)}
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium ${statusBadgeClass(status)}`}
                  >
                    <span aria-hidden>{STATUS_EMOJI[status]}</span>
                    {STATUS_LABEL[status]}
                  </span>
                </td>
                <td className="max-w-[180px] px-3 py-2 text-slate-800">
                  {primaryName || primaryPhone ? (
                    <span className="block truncate">
                      {primaryName && <span>{primaryName}</span>}
                      {primaryName && primaryPhone && <span className="text-slate-400"> · </span>}
                      {primaryPhone &&
                        (href ? (
                          <a
                            href={href}
                            className="text-blue-700 underline decoration-blue-300 hover:text-blue-900"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {primaryPhone}
                          </a>
                        ) : (
                          primaryPhone
                        ))}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Sort client list (mutates copy). */
export function sortClients(
  list: Client[],
  sortKey: SortKey,
  sortDir: SortDir,
): Client[] {
  const sorted = [...list];
  const mul = sortDir === 'asc' ? 1 : -1;
  sorted.sort((a, b) => {
    if (sortKey === 'srNo' || sortKey === 'noOfACs') {
      return (a[sortKey] - b[sortKey]) * mul;
    }
    if (sortKey === 'name') {
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) * mul;
    }
    const da = parseLocalDate(a.dueDate).getTime();
    const db = parseLocalDate(b.dueDate).getTime();
    return (da - db) * mul;
  });
  return sorted;
}
