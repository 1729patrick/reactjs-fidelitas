import React, { useState } from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import {
  Card,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import InfoCard from './components/InfoCard';
import clsx from 'clsx';
// @ts-ignore
import { BlockPicker } from 'react-color';

const GeneralInformationView = () => {
  const [mainColor, setMainColor] = useState();
  const [secondaryColor, setSecondaryColor] = useState();
  return (
    <ResponsiveDrawer>
      <div>
        <InfoCard />
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
