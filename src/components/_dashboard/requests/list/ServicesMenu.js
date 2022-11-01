import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import eyeFill from '@iconify/icons-eva/eye-fill';

import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemText, ListItemIcon } from '@material-ui/core';
// routes
import PropTypes from 'prop-types';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import ViewMoreServiceRequests from './ViewMoreRequests';

// ----------------------------------------------------------------------

ServicesMoreMenu.propTypes = {
  serviceData: PropTypes.object,
  formFields: PropTypes.array
};
export default function ServicesMoreMenu({ serviceData, formFields }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleClickOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.services.root}/approval/${serviceData?.id}`}
          state={[serviceData, context]}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Approvals" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
        {/* <MenuItem onClick={onDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Approvals" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}

        {/* <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.services.root}/view-details/${serviceData?.id}`}
          state={[serviceData, context]}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View Details" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
      <ViewMoreServiceRequests open={open} handleClose={handleClose} formSchema={formFields} />
    </>
  );
}
