import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const discountsData = [
  {
    id: 1,
    description: 'Almoço 20% desconto',
    costPoints: 0,
    costVisits: 3,
    isActive: true,
    createdAt: '21/04/2020',
    expirationDate: '23/04/2020',
  },
  {
    id: 2,
    description: 'Jantar oferta de 1 bebida n/alcoólica',
    costPoints: 50,
    costVisits: 1,
    isActive: false,
    createdAt: '22/04/2020',
    expirationDate: '25/04/2020',
  },
  {
    id: 3,
    description: 'Oferta de um jantar',
    costPoints: 500,
    costVisits: 0,
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
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descrição',
  },
  {
    id: 'costPoints',
    numeric: true,
    disablePadding: false,
    label: 'Custo em pontos',
  },
  {
    id: 'costVisits',
    numeric: true,
    disablePadding: false,
    label: 'Custo em visitas',
  },
  { id: 'isActive', numeric: false, disablePadding: false, label: 'Estado' },
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
    label: 'Expira em',
  },
];

const DiscountsView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable data={discountsData} fields={headCells} actions={true} />
    </ResponsiveDrawer>
  );
};

export default DiscountsView;
