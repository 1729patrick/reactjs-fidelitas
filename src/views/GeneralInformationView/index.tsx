import React, { useState } from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import {
  Card,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import RestaurantInfoCard from './components/RestaurantInfoCard';
import UserInfoCard from './components/UserInfoCard';
import clsx from 'clsx';
// @ts-ignore
import { BlockPicker } from 'react-color';

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

const GeneralInformationView = () => {
  const [mainColor, setMainColor] = useState();
  const [secondaryColor, setSecondaryColor] = useState();
  return (
    <ResponsiveDrawer>
      <div>
        <UserInfoCard />
        <RestaurantInfoCard data={restaurantData} />
        <Card style={{ marginTop: '30px' }} raised={true}>
          <h2
            style={{
              paddingLeft: '20px',
            }}>
            Informação da Aplicação Móvel
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              textAlign: 'center',
            }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>Cor Principal</h3>
              <BlockPicker />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>Cor Secundária</h3>
              <BlockPicker />
            </div>
          </div>
        </Card>
      </div>
    </ResponsiveDrawer>
  );
};

export default GeneralInformationView;
