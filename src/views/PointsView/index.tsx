import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const systemPointsData = [
  {
    id: 1,
    points: 20,
    startPrice: 0,
    endPrice: 50,
    isActive: true,
    expirationDate: new Date('2014-08-18T21:11:54'),
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    points: 10,
    startPrice: 51,
    endPrice: 120,
    isActive: true,
    expirationDate: new Date('2014-08-18T21:11:54'),
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    points: 30,
    startPrice: 121,
    endPrice: 1000,
    isActive: true,
    expirationDate: new Date('2014-08-18T21:11:54'),
    createdAt: new Date('2014-08-18T21:11:54'),
  },
];
interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  type: string;
  isEditable: boolean;
}
const headCells: HeadCell[] = [
  {
    id: 'points',
    numeric: true,
    disablePadding: false,
    label: 'Pontos',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'startPrice',
    numeric: true,
    disablePadding: false,
    label: 'Inicio de preço',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'endPrice',
    numeric: true,
    disablePadding: false,
    label: 'Final de preço',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'isActive',
    numeric: true,
    disablePadding: false,
    label: 'Estado',
    type: 'boolean',
    isEditable: true,
  },

  {
    id: 'expirationDate',
    numeric: false,
    disablePadding: false,
    label: 'Expirado em',
    type: 'date',
    isEditable: true,
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
    type: 'date',
    isEditable: false,
  },
];

const PointsView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable
        data={systemPointsData}
        fields={headCells}
        actions={true}
        title={'Pontuação'}
      />
    </ResponsiveDrawer>
  );
};

export default PointsView;
