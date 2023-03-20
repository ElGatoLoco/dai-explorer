import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputField } from '../InputField';

describe('InputField component', () => {
  const onChange = jest.fn();
  const placeholder = 'Search...';

  it('should render correctly with placeholder', () => {
    render(<InputField onChange={onChange} placeholder={placeholder} />);
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onChange function when user types in input field', () => {
    render(<InputField onChange={onChange} placeholder={placeholder} />);
    const inputElement = screen.getByPlaceholderText(placeholder);
    userEvent.type(inputElement, 'hello');
    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
