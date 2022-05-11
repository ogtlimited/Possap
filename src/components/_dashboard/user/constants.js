export const Role = [
  'Administrator',
  'Editor',
  'Moderator',
  'Author',
  'Contributor',
  'Authenticated',
  'Anonymous',
  'Admin (POSSAP)',
  'Desk Officers',
  'DPO',
  'DOAO',
  'DIGFCID',
  'STATECID',
  'DOIGP',
  'DODIGDOPS',
  'CCRANLST',
  'AOBUNUNU',
  'DPOBUNUNU',
  'AIG_ESCORT',
  'IGP_ESCORT',
  'DIG_ESCORT',
  'SQUADRON_ESCORT',
  'CP_ESCORT',
  'DCP_ESCORT',
  'POSSAP SEC.',
  'CPCCR',
  'DOCCR'
];

export const AccessType = ['Viewer', 'Approver'];

export const ServicesList = ['POLICE EXTRACT', 'ESCORT AND GUARD SERVICES', 'POLICE CHARACTER CERTIFICATE'];

export const POLICEEXTRACT = ['Extract Request Flow'];
export const ESCORTGUARDSERVICES = [
  'Escort Request Flow',
  'Escort Tactical Request Flow',
  'Escort Conventional Request Flow'
];
export const WORKFLOW = [
  {
    heading: 'POLICE EXTRACT',
    title: ['Extract Request Flow'],
    approvals: ['Extract First Approval', 'Extract Second Approval']
  },
  {
    heading: 'ESCORT AND GUARD SERVICES',
    title: ['Extract Request Flow'],
    approvals: ['Extract First Approval', 'Extract Second Approval']
  },
  {
    heading: 'POLICE CHARACTER CERTIFICATE',
    title: ['Police Character Certificate'],
    approvals: [
      'First character certificate approval (DIG)',
      ' Second character certificate approval (CP CCR)',
      'Third character certificate approval - Biometric Capture (SCID)',
      'Fourth character certificate approval (DA CCR)',
      'Fifth character certificate approval (CP CCR)',
      'Secretariat Routing'
    ]
  }
];
