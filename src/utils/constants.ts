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

export type CardRenewalStatus = 'noDate' | 'renewalOverdue' | 'renewalSoon' | 'active';

export const CARD_RENEWAL_LABEL: Record<CardRenewalStatus, string> = {
  noDate: 'No Card Date',
  renewalOverdue: 'Renewal Overdue',
  renewalSoon: 'Renewal Soon',
  active: 'Active',
};

export const CARD_RENEWAL_EMOJI: Record<CardRenewalStatus, string> = {
  noDate: '⚪',
  renewalOverdue: '🔴',
  renewalSoon: '🟡',
  active: '🟢',
};

export type SortKey = 'srNo' | 'name' | 'dueDate' | 'noOfACs' | 'cardRenewalDate';

export type CardRenewalFilter = 'all' | CardRenewalStatus;

export type WashFilter = 'all' | 'Jet' | 'Simple';
export type StatusFilter = 'all' | ClientStatus;
export type FreqFilter = 'all' | '1' | '2' | '3' | '4' | '5';
