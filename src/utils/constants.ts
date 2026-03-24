export type ClientStatus = 'overdue' | 'dueSoon' | 'active';

export const STATUS_LABEL: Record<ClientStatus, string> = {
  overdue: 'Overdue',
  dueSoon: 'Due Soon',
  active: 'Active',
};

export const STATUS_EMOJI: Record<ClientStatus, string> = {
  overdue: '🔴',
  dueSoon: '🟡',
  active: '🟢',
};

export type SortKey = 'srNo' | 'name' | 'dueDate' | 'noOfACs';

export type WashFilter = 'all' | 'Jet' | 'Simple';
export type StatusFilter = 'all' | ClientStatus;
export type FreqFilter = 'all' | '1' | '2' | '3' | '4' | '5';
