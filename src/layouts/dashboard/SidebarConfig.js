// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  reports: getIcon('ic_analytics'),
  finances: getIcon('ic_finances'),
  settings: getIcon('ic_settings'),
  exit: getIcon('ic_exit'),
  services: getIcon('ic_settings')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'app',

        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      {
        title: 'finance',

        path: PATH_DASHBOARD.general.finances,
        icon: ICONS.finances
      },
      {
        title: 'Reports',

        path: PATH_DASHBOARD.general.reports,
        icon: ICONS.reports,
        children: [
          { title: 'Extract Report', path: PATH_DASHBOARD.reports.extract, canView: 'officer' },
          { title: 'Character Certificate Report', path: PATH_DASHBOARD.reports.clearance, canView: 'officer' },
          { title: 'E & G Services Reports', path: PATH_DASHBOARD.reports.guard, canView: 'officer' }
        ]
      }
    ]
  },

  // Police Request
  // ----------------------------------------------------------------------
  {
    subheader: 'Requests',
    items: [
      {
        title: 'Police Requests',

        path: PATH_DASHBOARD.services.policeRequests,
        icon: ICONS.booking
      },
      // {
      //   title: 'Police Requests',

      //   path: PATH_DASHBOARD.services.root,
      //   icon: ICONS.booking,
      //   children: [
      //     { title: 'Extract', path: PATH_DASHBOARD.services.extract, canView: 'officer' },
      //     { title: 'Character Certificate', path: PATH_DASHBOARD.services.clearance, canView: 'officer' },
      //     { title: 'E & G Services', path: PATH_DASHBOARD.services.guard, canView: 'officer' }
      //   ]
      // },
      {
        title: 'user',

        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'User List', path: PATH_DASHBOARD.user.list },
          { title: 'Create User', path: PATH_DASHBOARD.user.newUser }
        ]
      },
      {
        title: 'Service',

        path: PATH_DASHBOARD.service.root,
        icon: ICONS.services,
        children: [
          { title: 'Service List', path: PATH_DASHBOARD.service.list },
          { title: 'Create Service', path: PATH_DASHBOARD.service.newService }
        ]
      }
    ]
  },

  // Misc
  // ----------------------------------------------------------------------
  {
    subheader: 'Misc',
    items: [
      {
        title: 'Settings',

        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.settings
      },
      { title: 'Log Out', path: PATH_DASHBOARD.services.root, icon: ICONS.exit }
    ]
  }
];
export const userSidebarConfig = [
  {
    subheader: 'general',
    items: [
      {
        title: 'app',

        path: PATH_DASHBOARD.general.userApp,
        icon: ICONS.dashboard
      }
    ]
  }
];

export default sidebarConfig;
