import { startOfDay } from 'date-fns';
import type { Client } from '../types';
import { effectiveCardRenewalIso, getCardRenewalStatus, isDueThisMonth, parseLocalDate } from '../utils/dateHelpers';

interface KPICardsProps {
  clients: Client[];
}

export function KPICards({ clients }: KPICardsProps) {
  const today = startOfDay(new Date());
  const overdue = clients.filter((c) => parseLocalDate(c.dueDate) < today).length;
  const dueThisMonth = clients.filter((c) => isDueThisMonth(c.dueDate)).length;
  const totalACs = clients.reduce((s, c) => s + c.noOfACs, 0);
  const jet = clients.filter((c) => c.jetOrSimple === 'Jet').length;
  const simple = clients.filter((c) => c.jetOrSimple === 'Simple').length;

  const cardsExpiringSoon = clients.filter((c) => {
    if (!c.cardIssueDate?.trim()) return false;
    const iso = effectiveCardRenewalIso(c);
    if (!iso) return false;
    const s = getCardRenewalStatus(iso);
    return s === 'renewalOverdue' || s === 'renewalSoon';
  }).length;

  const cards = [
    { label: 'Total Clients', value: String(clients.length), tone: 'slate' as const },
    { label: 'Total ACs', value: String(totalACs), tone: 'slate' as const },
    {
      label: 'Overdue',
      value: String(overdue),
      tone: 'danger' as const,
    },
    {
      label: 'Due This Month',
      value: String(dueThisMonth),
      tone: 'warn' as const,
    },
    {
      label: 'Cards Expiring Soon',
      value: String(cardsExpiringSoon),
      tone: 'orange' as const,
    },
    {
      label: 'Jet / Simple',
      value: `${jet} Jet · ${simple} Simple`,
      tone: 'slate' as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`rounded-lg border px-3 py-2 shadow-sm ${
            c.tone === 'danger'
              ? 'border-red-200 bg-red-50'
              : c.tone === 'warn'
                ? 'border-amber-200 bg-amber-50'
                : c.tone === 'orange'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-slate-200 bg-white'
          }`}
        >
          <p className="text-xs font-medium text-slate-500">{c.label}</p>
          <p
            className={`mt-0.5 text-lg font-semibold ${
              c.tone === 'danger'
                ? 'text-red-700'
                : c.tone === 'warn'
                  ? 'text-amber-800'
                  : c.tone === 'orange'
                    ? 'text-orange-900'
                    : 'text-slate-900'
            }`}
          >
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}
