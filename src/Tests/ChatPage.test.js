
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../contexts/contexts';
import ChatPage from '../pages/ChatPage';
import { getAllChats } from '../services/chatAPI';


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


// jest.mock('../services/chatAPI', () => ({
//   getAllChats: jest.fn().mockResolvedValue([]),
//   createChat: jest.fn(),
//   deleteChat: jest.fn(),
// }));

// jest.mock('../services/usersAPI', () => ({
//   getUserByCollectionId: jest.fn().mockResolvedValue({ username: 'Test', profilePicture: 'test.jpg' }),
// }));

describe.skip('ChatPage', () => {
  it('renders without crashing', async () => {

    const chat = await getAllChats();
    render(
      <AuthContext.Provider value={user}>
        <ChatPage />
      </AuthContext.Provider>
    );
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
  it('renders without crashing', () => { })

});