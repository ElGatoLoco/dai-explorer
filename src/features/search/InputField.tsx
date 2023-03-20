import { ChangeEvent } from 'react';

type Props = {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};
export const InputField = ({ onChange, placeholder }: Props) => {
  return (
    <input
      type="text"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
