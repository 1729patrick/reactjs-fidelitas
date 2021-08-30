import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import TimePicker from 'react-time-picker';
import WorkHoursModal from '../WorkHoursModal';
import { Palette } from '../../../../../utils/palette';

const WorkHoursCard = () => {
  const [checked, setChecked] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);
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

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <List style={{ display: 'flex', flexDirection: 'row' }}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={breakfastChecked}
                  tabIndex={-1}
                  onClick={() => setBreakfastChecked(!breakfastChecked)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'breakfast' }}
                  onChange={() => setBreakfastChecked(!breakfastChecked)}
                />
              </ListItemIcon>
              <ListItemText id={'breakfast'} primary={'Pequeno-Almoço'} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={lunchChecked}
                  tabIndex={-1}
                  onClick={() => setLunchChecked(!lunchChecked)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'lunch' }}
                  onChange={() => setLunchChecked(!lunchChecked)}
                />
              </ListItemIcon>
              <ListItemText id={'lunch'} primary={'Almoço'} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={dinnerChecked}
                  tabIndex={-1}
                  onClick={() => setDinnerChecked(!dinnerChecked)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'dinner' }}
                  onChange={() => setDinnerChecked(!dinnerChecked)}
                />
              </ListItemIcon>
              <ListItemText id={'dinner'} primary={'Jantar'} />
            </ListItem>
          </List>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
              <div
                key={value}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Checkbox
                    checked={checked[value] === 1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': weekDay(value) }}
                    onClick={() => handleCheckWeekDay(value)}
                  />

                  <p>{weekDay(value)}</p>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  {breakfastChecked && (
                    <div
                      style={{
                        flex: 1,
                        margin: '10px 0px 10px 0px',
                        textAlign: 'center',
                      }}>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p>até</p>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    margin: '10px 0px 10px 0px',
                    textAlign: 'center',
                  }}>
                  {lunchChecked && (
                    <div>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p>até</p>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    margin: '10px 0px 10px 0px',
                    textAlign: 'center',
                  }}>
                  {dinnerChecked && (
                    <div>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p>até</p>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default WorkHoursCard;
