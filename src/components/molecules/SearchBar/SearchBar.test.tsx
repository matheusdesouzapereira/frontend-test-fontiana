import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search');
    await userEvent.type(input, 'BTC');
    
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});