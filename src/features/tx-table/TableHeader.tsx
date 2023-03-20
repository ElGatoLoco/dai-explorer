import { SortableColHeader } from './SortableColHeader';

export const TableHeader = () => {
  return (
    <thead className="text-xs uppercase bg-gray-50 text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 text-center">
          Transaction Hash
        </th>
        <SortableColHeader column="timestamp">Timestamp</SortableColHeader>
        <SortableColHeader column="value">Value</SortableColHeader>
        <th scope="col" className="px-6 py-3 text-center">
          Sender
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Recipient
        </th>
      </tr>
    </thead>
  );
};
