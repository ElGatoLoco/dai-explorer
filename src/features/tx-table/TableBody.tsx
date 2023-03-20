import { TX_EXPLORER_BASE_URL } from '../../config';
import { useAppSelector } from '../../redux/hooks';
import { timestampToTimeString } from '../../utils/timestampToTimeString';
import { ExternalLinkCell } from './ExternalLinkCell';

export const TableBody = () => {
  const { txData, txKeys } = useAppSelector((state) => state);

  return (
    <tbody>
      {txKeys.map((txKey) => {
        return (
          <tr key={txKey} className="border-b bg-gray-200 border-gray-100">
            <ExternalLinkCell url={`${TX_EXPLORER_BASE_URL}${txData[txKey].txHash}`}>
              {txData[txKey].txHash}
            </ExternalLinkCell>
            <td className="px-3 py-4 text-center">
              {timestampToTimeString(txData[txKey].timestamp)}
            </td>
            <td className="px-3 py-4 text-right">{txData[txKey].value.toFixed(2)}</td>
            <td className="px-3 py-4">{txData[txKey].sender}</td>
            <td className="px-3 py-4">{txData[txKey].recipient}</td>
          </tr>
        );
      })}
    </tbody>
  );
};
