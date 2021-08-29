import React from 'react';
import { Card } from '@material-ui/core';
import { BlockPicker } from 'react-color';

const MobileAppCard = () => {
  return (
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
  );
};

export default MobileAppCard;
