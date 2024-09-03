import React from 'react'

import { Box, Grid, List, ListItem, Typography } from '@mui/material'

export default function AboutView() {
  return (
    <>
      <Box sx={{ margin: 0, padding: '10px', border: "1px solid #E3E3E3", borderLeft: "none", borderRight: "none", background: "#FCFDFD" }}>
        <Typography variant="h4" textAlign="center">About</Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2} sx={{ padding: "20px", background: "white", width: "60%", margin: "30px auto", marginBottom: "30px", borderRadius: "10px"}}>
        <Typography variant='h5' sx={{ textDecoration: "underline" }}>HISTORY OF THE NIGERIA POLICE FORCE</Typography>
        <Typography>
          The Nigeria Police Force (NPF) is the principal law enforcement agency in Nigeria. It has staff deployment across the 36 states of the country and the Federal Capital Territory (FCT). 
          The command and control of the Nigeria Police Force is under the Inspector-General of Police (IGP).
        </Typography>
        <Typography>
          For administrative ease, the Force is divided into eight (8) administrative departments, viz. Finance and Administration; Operations; 
          Logistics and Supply; Force Criminal Investigation Department; Training and Development; Research and Planning; Information and Communication Technology and Force Intelligence Bureau, 
          each headed by a Deputy Inspector-General of Police (DIG). The Force is further divided into 17 Operational Zonal Commands (usually comprising between two and three State Commands) 
          and 37 State Commands including the FCT. While the Zone is headed by an Assistant Inspector-General of Police (AIG), the State Command is headed by a Commissioner of Police (CP), the Area Command by an Assistant Commissioner of Police (ACP) 
          and the Division by an officer in the Superintendent cadre.
        </Typography>

        <Typography variant='h5' sx={{ textDecoration: "underline" }}>POLICE SPECIALIZED SERVICES AUTOMATION PROJECT (POSSAP)</Typography>
        <Typography>
          An Initiative launched by the Nigeria Police Force (NPF) for improvements in the efficiency of the processes and administration of all its fee-based Specialized Services through automation. This solution will use smart technology to automate and manage 
          the entire process of rendering Police Specialized Services in an efficient, transparent and highly professional manner in line with global best practices.
        </Typography>

        <Typography variant='h5' sx={{ textDecoration: "underline" }}>OBJECTIVES</Typography>
        <List component="ol" style={{ listStyleType: 'decimal', paddingLeft: '30px' }}>
          <ListItem>
            <Typography variant="body1" component="li">
              To improve efficiency in the process and administration of all fee-based specialized services provided by the Nigeria Police Force;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" component="li">
              To enhance the general working conditions of officers and men as well as advance the public perception and image of the Nigeria Police Force;
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" component="li">
              To reposition the Nigeria Police for improved service delivery in meeting its statutory and other non-core obligations; and
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" component="li">
              To act as a catalyst for transformation of Police administrative and operational activities through fusion of technology and improved processes.
            </Typography>
          </ListItem>
        </List>

        <Typography variant='h5' sx={{ textDecoration: "underline" }}>SPECIALIZED SERVICES</Typography>
        <Typography>
          With respect to extant and relevant laws, the Police Force Order which draws strength from the Police Act 2020, provides for the Nigeria Police 
          to charge fees for specialized services rendered to the Nigerian public. These include the services of Police Orderlies for protection and safety of lives 
          and properties. Likewise, the Police Act 2020 permits the NPF to charge fees for private engagements and other Specialized Services. It is on this basis that 
          the Police has since its inception applied fees on services such as Escort Services, Issuance of Licenses for Arms & Ammunition, Police Extracts and other Specialized 
          Services. Police Specialized Services also referred to as Police Revenue Services include Police Escort & Special Security Services, Arms & Ammunition Licenses, Contractor Registration, 
          International Driving Permit, Police Extract & Information Services, other permits & reports services provided pursuant to the Force Order.
        </Typography>

        <Typography variant='h5' sx={{ textDecoration: "underline" }}>LIST OF POLICE SPECIALIZED SERVICES</Typography>
        <List component="ol" style={{ listStyleType: 'decimal', paddingLeft: '30px' }}>
          <ListItem>
            <Typography variant="body1" component="li">Guards & Special Protection Services</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1" component="li">Arms & Ammunition</Typography>
          </ListItem>
          <List component="ol" style={{ listStyleType: 'lower-roman', paddingLeft: '50px' }}>
            <ListItem disablePadding>
              <Typography variant="body1" component="li" padding={0}>Issuance of Fire Arm and License</Typography>
            </ListItem>
          </List>
          <ListItem>
            <Typography variant="body1" component="li">Police Information Services</Typography>
          </ListItem>
          <List component="ol" style={{ listStyleType: 'lower-roman', paddingLeft: '50px' }}>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Police Extract</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Police Character Clearance Certificate</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Police Investigation Report</Typography>
            </ListItem>
          </List>
          <ListItem>
            <Typography variant="body1" component="li">Contractor Registration</Typography>
          </ListItem>
          <List component="ol" style={{ listStyleType: 'lower-roman', paddingLeft: '50px' }}>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Contractor Registration</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Renewal of Contractor Registration</Typography>
            </ListItem>
          </List>
          <ListItem>
            <Typography variant="body1" component="li">International Driving Permit</Typography>
          </ListItem>
          <List component="ol" style={{ listStyleType: 'lower-roman', paddingLeft: '50px' }}>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">International Driving Permit</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">International Vehicle Certification</Typography>
            </ListItem>
          </List>
          <ListItem>
            <Typography variant="body1" component="li">Other Services</Typography>
          </ListItem>
          <List component="ol" style={{ listStyleType: 'lower-roman', paddingLeft: '50px' }}>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Tint Permit</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Electronic Central Motor Registry</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Use of Uniforms, Accoutrement & Fire Arms</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Allocation of Spy Plate Numbers</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Permit to Import/Sell & Use Fireworks</Typography>
            </ListItem>
            <ListItem disablePadding>
              <Typography variant="body1" component="li">Police Clearance for DPR Approval</Typography>
            </ListItem>
          </List>
        </List>
      </Box>
    </>
  )
}
