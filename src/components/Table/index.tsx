/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateUpdateModal from '../CreateUpdateModal';
import { format } from 'date-fns';

import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import ConfigModal from '../ConfigModal';

import { Palette } from '../../utils/palette';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  fields: any;
  order: Order;
  orderBy: string;
  rowCount: number;
  actions?: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    fields,
    actions = false,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {fields.map((f: any) => (
          <TableCell
            key={f.id}
            align={'left'}
            padding={f.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === f.id ? order : false}>
            <TableSortLabel
              active={orderBy === f.id}
              direction={orderBy === f.id ? order : 'asc'}
              onClick={createSortHandler(f.id)}>
              {f.label}
              {orderBy === f.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {actions && (
          <TableCell align={'left'} padding={'none'}>
            <TableSortLabel>Ações</TableSortLabel>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

type Props = {
  data: any;
  fields: any;
  actions?: boolean;
  title?: string;
  notifications?: boolean;
  reserve?: boolean;
};

const ResponsiveTable: React.FC<Props> = ({
  data,
  fields,
  actions = false,
  title,
  notifications = false,
  reserve = false,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [openModal, setOpenModal] = useState(false);
  const [openConfigModal, setOpenConfigModal] = useState(false);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const modalDataRef = useRef();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const booleanToString = (bool: boolean) => {
    return bool ? 'Ativo' : 'Inativo';
  };

  const cellRenderByType = (type: string, value: any) => {
    if (type === 'boolean') {
      return booleanToString(value);
    } else if (type === 'object') {
      return format(value, 'yyyy/MM/dd');
    } else if (type === 'string' && value.includes('base64')) {
      return <img src={value} style={{ width: 50, height: 50 }} />;
    } else {
      return value;
    }
  };

  const handleModal = (data?: any) => {
    //useRef para transportar dados se existirem para dentro dos fields do modal
    if (data) {
      modalDataRef.current = data;
    }

    setOpenModal(!openModal);
  };

  const handleConfigModal = (data?: any) => {
    //useRef para transportar dados se existirem para dentro dos fields do modal

    setOpenConfigModal(!openConfigModal);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '10px',
            paddingTop: '10px',
          }}>
          {actions && (
            <Button
              style={{
                marginRight: '10px',
                background: Palette.primaryBackgroundColor,
                color: Palette.primaryTextColor,
              }}
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={handleModal}>
              Adicionar {title}
            </Button>
          )}
          {reserve && (
            <IconButton aria-label="config" onClick={handleConfigModal}>
              <SettingsIcon style={{ color: Palette.primaryBackgroundColor }} />
            </IconButton>
          )}
        </div>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            size={'small'}>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              fields={fields}
              actions={actions}
            />
            {openModal && (
              <CreateUpdateModal
                open={openModal}
                handleCloseModal={handleModal}
                fields={fields}
                title={title}
                dataRef={modalDataRef}
              />
            )}
            {openConfigModal && (
              <ConfigModal handleCloseModal={handleConfigModal} />
            )}
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((d: any) => {
                  return (
                    <TableRow hover tabIndex={-1} key={d.id}>
                      {Object.keys(d).map(
                        (value, i) =>
                          i !== 0 && (
                            <TableCell align={'left'} key={i}>
                              {cellRenderByType(typeof d[value], d[value])}
                            </TableCell>
                          ),
                      )}
                      {actions && (
                        <TableCell align={'left'}>
                          {notifications && (
                            <IconButton
                              aria-label="send"
                              style={{ marginLeft: '-28px' }}>
                              <SendIcon />
                            </IconButton>
                          )}
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleModal(d)}
                            style={
                              !notifications ? { marginLeft: '-28px' } : {}
                            }>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={fields.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ResponsiveTable;
