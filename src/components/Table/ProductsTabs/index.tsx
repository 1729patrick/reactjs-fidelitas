import React, { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const PRODUCTSTYPE = [
  'starter',
  'main',
  'dessert',
  'salad',
  'side',
  'drink',
  'special',
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const ProductsTabs = () => {
  const [valueTabs, setValueTabs] = useState('');
  const handleChange = () => {};
  return (
    <div>
      <Tabs
        value={valueTabs}
        style={{ maxWidth: '100%' }}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example">
        {PRODUCTSTYPE.map((value, index) => (
          <Tab key={index} label={value} {...a11yProps(index)} />
        ))}
      </Tabs>
      <TabPanel value={valueTabs} index={0}>
        <div></div>
      </TabPanel>
      <TabPanel value={valueTabs} index={1}>
        <div></div>
      </TabPanel>
      <TabPanel value={valueTabs} index={2}>
        <div></div>
      </TabPanel>
      <TabPanel value={valueTabs} index={3}>
        <div></div>
      </TabPanel>
      <TabPanel value={valueTabs} index={4}>
        <div></div>
      </TabPanel>
    </div>
  );
};

export default ProductsTabs;
