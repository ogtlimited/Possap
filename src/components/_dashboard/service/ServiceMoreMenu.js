import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import ViewMoreService from './ViewMoreService';

// ----------------------------------------------------------------------

ServceMoreMenu.propTypes = {
  serviceName: PropTypes.string,
  formSchema: PropTypes.array
};

export default function ServceMoreMenu({ serviceName, formSchema }) {
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
          to={`${PATH_DASHBOARD.service.newService}/${paramCase(serviceName)}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
        {/* <MenuItem onClick={onDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
      <ViewMoreService open={open} handleClose={handleClose} formSchema={formSchema} />
    </>
  );
}
