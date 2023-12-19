import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import ChatPage from '../pages/ChatPage';
import { AuthContext } from '../contexts/contexts';
import { BrowserRouter as Router } from 'react-router-dom';

const user = {
  userId: '3d3e3f53-fe64-4d06-bc9c-1a168767593b',
  isAuthenticated: true,
  email: 'peter@abv.bg',
  username: 'Peter',
  profilePicture: 'https://i.pinimg.com/originals/68/76/99/6876993a25a8fc274cc09aee12171034.jpg',
  wallets: {
    monero: 'monerowallet',
    bitcoin: 'bitcoinwallet'
  }
}

jest.mock('../services/chatAPI', () => ({
  getAllChats: jest.fn(),
  createChat: jest.fn(),
  deleteChat: jest.fn(),
}));

jest.mock('../services/usersAPI', () => ({
  getUserByCollectionId: jest.fn(),
}));

HTMLElement.prototype.scrollIntoView = jest.fn();

describe('ChatPage', () => {
  const mockUser = user;

  it('renders without crashing', () => {
    act(() => {
      render(
        <AuthContext.Provider value={mockUser}>
          <Router>
            <ChatPage />
          </Router>
        </AuthContext.Provider>
      );
    });
  });

  it('submits input on form submit', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={mockUser}>
        <Router>
          <ChatPage />
        </Router>
      </AuthContext.Provider>
    );

    const input = getByPlaceholderText('Make a chat...');
    const button = getByText('Submit');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);

    await waitFor(() => expect(getByText('Sent')).toBeInTheDocument());

  });
});