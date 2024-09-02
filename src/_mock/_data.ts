import {
  _id,
} from './_mock';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Sir Abubakar',
  email: 'demo@possap.ng',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: 'Sir Abubakar',
  company: 'Outsource Global',
  isVerified: true,
  avatarUrl: `/assets/images/avatar/avatar-25.webp`,
  status: index % 4 ? 'active' : 'banned',
  role:
    [
      'Admin',
      'User',
  
    ][index] || 'Admin',
}));






