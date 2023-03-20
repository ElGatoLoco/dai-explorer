import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  url: string;
};
export const ExternalLinkCell = ({ children, url }: Props) => {
  return (
    <td className="group hover:cursor-pointer">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex justify-between items-center px-6 py-4 hover:bg-slate-300 truncate"
      >
        <span className="truncate w-24 md:w-60 2xl:w-auto">{children}</span>
        <ArrowTopRightOnSquareIcon className="w-6 h-6 ml-2 transition-all ease-in-out duration-200 group-hover:fill-gray-500 group-active:fill-gray-300" />
      </a>
    </td>
  );
};
