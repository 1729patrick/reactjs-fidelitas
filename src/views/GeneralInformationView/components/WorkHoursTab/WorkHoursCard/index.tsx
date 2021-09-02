import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import TimePicker from 'react-time-picker';
import WorkHoursModal from '../WorkHoursModal';
import { Palette } from '../../../../../utils/palette';

const WorkHoursCard = () => {
  const [checked, setChecked] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [breakfastChecked, setBreakfastChecked] = useState(true);
  const [lunchChecked, setLunchChecked] = useState(true);
  const [dinnerChecked, setDinnerChecked] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleCheckWeekDay = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];
    newChecked[currentIndex] = newChecked[currentIndex] === 0 ? 1 : 0;
    setChecked(newChecked);
  };
  return (
    <Card raised={true}>
      <div style={{ width: '100%' }}>
        <Box
          display="flex"
          mb={3}
          mt={3}
          justifyContent="space-between"
          style={{ padding: '0px 10px 0px 10px' }}>
          <Typography variant="h6">Horário de Funcionamento</Typography>
          {openModal && (
            <WorkHoursModal open={openModal} handleCloseModal={handleModal} />
          )}
          <Button
            onClick={() => handleModal()}
            style={{
              background: Palette.primaryBackgroundColor,
              color: Palette.primaryTextColor,
              boxShadow: 'none',
            }}>
            Editar
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Pequeno-Almoço</TableCell>
              <TableCell>Almoço</TableCell>
              <TableCell>Jantar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[0, 1, 2, 3, 4, 5, 6].map(value => {
              const weekDay = (value: number) => {
                switch (value) {
                  case 0:
                    return 'Segunda-feira';
                  case 1:
                    return 'Terça-feira';
                  case 2:
                    return 'Quarta-feira';
                  case 3:
                    return 'Quinta-feira';
                  case 4:
                    return 'Sexta-feira';
                  case 5:
                    return 'Sábado';
                  case 6:
                    return 'Domingo';
                  default:
                    return;
                }
              };

              return (
                <TableRow key={value}>
                  <TableCell>{weekDay(value)}</TableCell>
                  {breakfastChecked && <TableCell>7:00 até 10:00</TableCell>}

                  {lunchChecked && <TableCell>12:00 até 14:00</TableCell>}

                  {dinnerChecked && <TableCell>19:00 até 22:00</TableCell>}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default WorkHoursCard;
