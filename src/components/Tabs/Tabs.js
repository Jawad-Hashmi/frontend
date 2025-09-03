import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            backgroundColor: '#fff',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = [
    'Digital Retail',
    'Intermediary portals',
    'Originations',
    'Servicing',
    'Wholesale finance',
  ];

  return (
    <Box sx={{ width: '100%', height: '70vh', py: 5 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: 'none',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="standard"
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="custom styled tabs"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#fff',
                height: '3px',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={index}
                label={label}
                {...a11yProps(index)}
                sx={{
                  textTransform: 'none',
                  borderRadius: '20px',
                  paddingX: 2,
                  paddingY: 1,
                  marginX: 1,
                  backgroundColor: value === index ? '#000' : '#696969',
                  color: value === index ? '#fff' : 'white',
                  transition: 'all 0.3s ease',
                  fontWeight: value === index ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: '#444',
                    color: '#fff',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </AppBar>

      {tabLabels.map((label, index) => (
        <TabPanel key={index} value={value} index={index} dir={theme.direction}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000', mb: 2 }}>
              {label}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#333',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'justify',
              }}
            >
              {index === 0 &&
                'Unleash sales growth with omni-channel transformation and AI-powered precision.'}
              {index === 1 &&
                'Provide customers with a unified and self-contained purchasing experience.'}
              {index === 2 &&
                'Experience the future of lease and loan origination with highly agile, easy-to-use, cross-channel platforms.'}
              {index === 3 &&
                'Cutting-edge, AI-powered solutions to streamline loan and lease management.'}
              {index === 4 &&
                'Gain a competitive edge by automating your wholesale finance and floor planning operations effortlessly.'}
            </Typography>
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
}
