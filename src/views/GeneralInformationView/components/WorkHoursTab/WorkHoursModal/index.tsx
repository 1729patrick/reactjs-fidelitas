import React, { useState } from 'react';
import {
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
} from '@material-ui/core';
import TimePicker from 'react-time-picker';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 900,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 8,
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    modalStyle: {
      overflow: 'scroll',
      display: 'block',

      position: 'absolute',
      top: '10%',
      left: '10%',
    },
  }),
);

type PropsType = {
  open: boolean;
  handleCloseModal: () => void;
};

const WorkHoursModal: React.FC<PropsType> = ({ open, handleCloseModal }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);

  const handleCheckWeekDay = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];
    newChecked[currentIndex] = newChecked[currentIndex] === 0 ? 1 : 0;
    setChecked(newChecked);
  };
  return (
    <Modal
      open={open}
      onClose={() => handleCloseModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modalStyle}>
      <div className={classes.paper}>
        <h2
          style={{
            paddingLeft: '20px',
          }}>
          Horário de Funcionamento
        </h2>
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
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
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
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {breakfastChecked && (
                    <div
                      style={{
                        flex: 1,
                        // margin: '10px 0px 10px 0px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p style={{ margin: '0px 5px' }}>até</p>

                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}

                  {lunchChecked && (
                    <div
                      style={{
                        flex: 1,
                        //margin: '10px 0px 10px 0px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p style={{ margin: '0px 5px' }}>até</p>

                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}

                  {dinnerChecked && (
                    <div
                      style={{
                        flex: 1,
                        //  margin: '10px 0px 10px 0px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p style={{ margin: '0px 5px' }}>até</p>
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
    </Modal>
  );
};

export default WorkHoursModal;
