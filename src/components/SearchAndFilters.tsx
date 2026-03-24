import type { FreqFilter, StatusFilter, WashFilter } from '../utils/constants';

interface SearchAndFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  wash: WashFilter;
  onWashChange: (v: WashFilter) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  freq: FreqFilter;
  onFreqChange: (v: FreqFilter) => void;
  filteredCount: number;
  totalCount: number;
}

export function SearchAndFilters({
  search,
  onSearchChange,
  wash,
  onWashChange,
  status,
  onStatusChange,
  freq,
  onFreqChange,
  filteredCount,
  totalCount,
}: SearchAndFiltersProps) {
  const selectClass =
    'rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
      <div className="min-w-[200px] flex-1">
        <label className="mb-1 block text-xs font-medium text-slate-600">Search</label>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Name, contact, card no."
          className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Wash type</label>
        <select
          className={selectClass}
          value={wash}
          onChange={(e) => onWashChange(e.target.value as WashFilter)}
        >
          <option value="all">All</option>
          <option value="Jet">Jet</option>
          <option value="Simple">Simple</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
        <select
          className={selectClass}
          value={status}
          onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        >
          <option value="all">All</option>
          <option value="overdue">Overdue</option>
          <option value="dueSoon">Due Soon</option>
          <option value="active">Active</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-600">Frequency</label>
        <select
          className={selectClass}
          value={freq}
          onChange={(e) => onFreqChange(e.target.value as FreqFilter)}
        >
          <option value="all">All</option>
          <option value="1">1× per year</option>
          <option value="2">2× per year</option>
          <option value="3">3× per year</option>
          <option value="4">4× per year</option>
          <option value="5">5× per year</option>
        </select>
      </div>
      <p className="text-sm text-slate-600 md:pb-1">
        Showing <span className="font-semibold text-slate-900">{filteredCount}</span> of{' '}
        <span className="font-semibold text-slate-900">{totalCount}</span> clients
      </p>
    </div>
  );
}
