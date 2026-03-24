import { id } from '@instantdb/react';
import { useEffect } from 'react';
import { seedClients } from '../data/seedClients';
import db from '../lib/db';

let seedStarted = false;

export function useSeedClients(
  clients: { length: number } | undefined,
  isLoading: boolean,
) {
  useEffect(() => {
    if (isLoading || seedStarted) return;
    if (clients === undefined) return;
    if (clients.length > 0) return;

    seedStarted = true;
    const txs = seedClients.map((c) =>
      db.tx.clients[id()].update({
        srNo: c.srNo,
        cardNo: c.cardNo,
        name: c.name,
        freq: c.freq,
        noOfACs: c.noOfACs,
        jetOrSimple: c.jetOrSimple,
        dueDate: c.dueDate,
        startDate: c.startDate,
        isManual: false,
        primaryContactName: c.primaryContactName ?? undefined,
        primaryPhone: c.primaryPhone ?? undefined,
        secondaryContactName: c.secondaryContactName ?? undefined,
        secondaryPhone: c.secondaryPhone ?? undefined,
      }),
    );
    db.transact(txs);
  }, [isLoading, clients?.length]);
}
