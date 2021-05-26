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
    createdAt: '21/04/2020',
    expirationDate: '23/04/2020',
  },
  {
    id: 2,
    points: 10,
    startPrice: 51,
    endPrice: 120,
    isActive: true,
    createdAt: '22/04/2020',
    expirationDate: '25/04/2020',
  },
  {
    id: 3,
    points: 30,
    startPrice: 121,
    endPrice: 1000,
    isActive: true,
    createdAt: '23/04/2020',
    expirationDate: '28/04/2020',
  },
];
interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  { id: 'points', numeric: true, disablePadding: false, label: 'Pontos' },
  {
    id: 'startPrice',
    numeric: true,
    disablePadding: false,
    label: 'Inicio de preço',
  },
  {
    id: 'endPrice',
    numeric: true,
    disablePadding: false,
    label: 'Final de preço',
  },
  { id: 'isActive', numeric: true, disablePadding: false, label: 'Estado' },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
  },
  {
    id: 'expirationDate',
    numeric: false,
    disablePadding: false,
    label: 'Expirado em',
  },
];

const PointsView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable
        data={systemPointsData}
        fields={headCells}
        actions={true}
      />
    </ResponsiveDrawer>
  );
};

export default PointsView;
