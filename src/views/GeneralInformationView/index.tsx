import React, { useState } from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import {
  Card,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import RestaurantInfoCard from './components/RestaurantInfoTab/RestaurantInfoCard';
import UserInfoCard from './components/UserInfoTab/UserInfoCard';
import clsx from 'clsx';
import MobileAppCard from './components/MobileAppCard';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import WorkHoursCard from './components/WorkHoursTab/WorkHoursCard';
import FacilitiesCard from './components/FacilitiesTab/FacilitiesCard';

const userDate = {
  firstName: 'Patrick',
  lastNanem: 'Forsthofer',
  phone: 913060881,
  email: 'patrickforsthofer@gmail.com',
};

const restaurantData = {
  title: 'Flavours Spot',
  description: 'Premium Burgers',
  workHours: [
    { monday: {} },
    { tuesday: {} },
    { wednesday: {} },
    { thursday: {} },
    { friday: {} },
    { saturday: {} },
    { sunday: {} },
  ],
  contacts: [
    { contact: 'restaurant@gmail.com', type: 'email' },
    { contact: 913060881, type: 'phone' },
  ],
  addresses: {
    lat: 1111.33,
    long: 1111.44,
    address1: 'rua teste 123',
    address2: 'Setúbal 2860-045',
    postalCode: '2860-045',
    city: 'Setúbal',
    responsible: 'Bruno',
    phone: 913060881,
    notes: 'Notas teste 123',
  },
  facilities: ['wc', 'zona de fumadores', 'esplanada'],
};

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.Palette.background.paper,
  },
}));

const GeneralInformationView = () => {
  const classes = useStyles();
  const [mainColor, setMainColor] = useState();
  const [secondaryColor, setSecondaryColor] = useState();
  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValueTabs(newValue);
  };
  return (
    <ResponsiveDrawer>
      <div className={classes.root} style={{ marginTop: '20px' }}>
        <Tabs
          value={valueTabs}
          style={{ maxWidth: '100%' }}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="Informação do Utilizador" {...a11yProps(0)} />
          <Tab label="Informação Geral do Restaurante" {...a11yProps(1)} />
          <Tab label="Horas de Funcionamento" {...a11yProps(2)} />
          <Tab label="Facilidades" {...a11yProps(3)} />
          <Tab label="Informação da Aplicação Móvel" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={valueTabs} index={0}>
          <UserInfoCard />
        </TabPanel>
        <TabPanel value={valueTabs} index={1}>
          <RestaurantInfoCard />
        </TabPanel>
        <TabPanel value={valueTabs} index={2}>
          <WorkHoursCard />
        </TabPanel>
        <TabPanel value={valueTabs} index={3}>
          <FacilitiesCard />
        </TabPanel>
        <TabPanel value={valueTabs} index={4}>
          <MobileAppCard />
        </TabPanel>
      </div>
    </ResponsiveDrawer>
  );
};

export default GeneralInformationView;
