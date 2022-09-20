export const EXTRACTCATEGORYLIST = ['Loss of Document', 'Loss of Property', 'Others'];
export const DOCUMENTLOSS = [
  'Certificate',
  'Book/Journal',
  'Vehicle Particulars',
  'Government issued document',
  'Others'
];
export const PROPERTYLOSS = [
  'Vehicle',
  'Mobile device',
  'Electrical / Electronics equipment',
  'Household equipment',
  'Clothing / Wears',
  'Others'
];
export const CCERTREQUEST = ['Domestic', 'International'];
export const INQUIRYREASON = ['Education', 'Employment', 'Travelling', 'Others'];
export const EGSERVICECATEGORY = [
  { id: 0, title: 'Escort Service', key: 'ES' },
  { id: 1, title: 'Guard Service', key: 'GS' },
  { id: 2, title: 'Special Protection Service', key: 'SPS' }
];

export const EGCATEGORYTYPE = {
  SPS: ['Orderly'],
  ES: ['Intra-state Escort', 'Inter-state Escort'],
  GS: [
    'Bank',
    'Event',
    'Individual & Private Residence',
    'Multinational Corporation',
    'Non-Governmental Organizations',
    'Oil Protection',
    'Religious Body'
  ]
};

export const EGUNIT = ['Conventional', 'Tactical'];
export const TACTICALSQUAD = [
  {
    title: 'DEPARTMENT OF OPERATIONS - COUNTER-TERRORISM UNIT',
    code: '93'
  },
  {
    title: 'DEPARTMENT OF OPERATIONS - SPECIAL PROTECTION UNIT',
    code: '88'
  },
  {
    title: 'DEPARTMENT OF OPERATIONS - POLICE MOBILE FORCE',
    code: '38'
  },
  {
    title: 'DEPARTMENT OF OPERATIONS - EXPLOSIVE ORDINANCE DISPOSAL (EOD)',
    code: '24'
  }
];
