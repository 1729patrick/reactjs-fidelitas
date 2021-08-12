import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const discountsData = [
  {
    id: 1,
    title: 'Title',
    description: 'Description lorem ipsum',
    trophy: 'Almoço 20% desconto',
    costPoints: 0,
    costVisits: 3,
    isActive: true,
    expirationDate: new Date('2014-08-18T21:11:54'),
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    title: 'Title',
    description: 'Description lorem ipsum',
    trophy: 'Jantar oferta de 1 bebida n/alcoólica',
    costPoints: 50,
    costVisits: 1,
    isActive: false,
    expirationDate: new Date('2014-08-18T21:11:54'),
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    title: 'Title',
    description: 'Description lorem ipsum',
    trophy: 'Oferta de um jantar',
    costPoints: 500,
    costVisits: 0,
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
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Título',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descrição',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'trophy',
    numeric: false,
    disablePadding: false,
    label: 'Prémio',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'costPoints',
    numeric: true,
    disablePadding: false,
    label: 'Custo em pontos',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'costVisits',
    numeric: true,
    disablePadding: false,
    label: 'Custo em visitas',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'isActive',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'expirationDate',
    numeric: false,
    disablePadding: false,
    label: 'Expira em',
    type: 'date',
    isEditable: true,
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
    type: 'number',
    isEditable: false,
  },
];

const DiscountsView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable
        data={discountsData}
        fields={headCells}
        actions={true}
        title={'Desconto'}
      />
    </ResponsiveDrawer>
  );
};

export default DiscountsView;
