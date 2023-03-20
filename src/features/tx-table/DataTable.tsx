import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

export const DataTable = () => {
  return (
    <div className="rounded-lg relative overflow-x-auto m-6">
      <table className="w-full text-sm text-left text-gray-800">
        <TableHeader />
        <TableBody />
      </table>
    </div>
  );
};
