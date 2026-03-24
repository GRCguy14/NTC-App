/** Client row shape from Instant `clients` entity + `id`. */
export interface Client {
  id: string;
  srNo: number;
  cardNo: string;
  name: string;
  freq: number;
  noOfACs: number;
  jetOrSimple: string;
  dueDate: string;
  startDate: string;
  isManual: boolean;
  primaryContactName?: string | null;
  primaryPhone?: string | null;
  secondaryContactName?: string | null;
  secondaryPhone?: string | null;
  cardIssueDate?: string | null;
  cardRenewalDate?: string | null;
}
