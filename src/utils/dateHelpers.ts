import { addDays, format, isAfter, isBefore, startOfDay } from 'date-fns';
import type { ClientStatus } from './constants';

/** Parse YYYY-MM-DD in local calendar (no UTC shift). */
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return startOfDay(new Date(y, m - 1, d));
}

export function formatDisplayDate(iso: string): string {
  return format(parseLocalDate(iso), 'dd MMM yyyy');
}

export function addOneYearIso(startIso: string): string {
  const d = parseLocalDate(startIso);
  const next = new Date(d);
  next.setFullYear(next.getFullYear() + 1);
  return format(startOfDay(next), 'yyyy-MM-dd');
}

export function getClientStatus(dueDateIso: string): ClientStatus {
  const due = parseLocalDate(dueDateIso);
  const today = startOfDay(new Date());
  const lastSoonDay = addDays(today, 30);

  if (isBefore(due, today)) return 'overdue';
  if (!isAfter(due, lastSoonDay)) return 'dueSoon';
  return 'active';
}

export function rowHighlightClass(dueDateIso: string): string {
  const due = parseLocalDate(dueDateIso);
  const today = startOfDay(new Date());
  const lastSoonDay = addDays(today, 30);

  if (isBefore(due, today)) return 'bg-red-50 hover:bg-red-100/80';
  if (!isAfter(due, lastSoonDay)) return 'bg-amber-50 hover:bg-amber-100/80';
  return 'bg-white hover:bg-slate-50';
}

export function isDueThisMonth(dueDateIso: string): boolean {
  const due = parseLocalDate(dueDateIso);
  const now = new Date();
  return due.getMonth() === now.getMonth() && due.getFullYear() === now.getFullYear();
}
