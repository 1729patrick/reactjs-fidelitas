//@ts-ignore-start
import React, { useEffect, useRef, useState } from 'react';
import ResponsiveDrawer, { translations } from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';
import { useReservations } from '../../api/useReservations';
import { format } from 'date-fns';
import api from '../../utils/Api';
import { useSWRConfig } from 'swr';
//@ts-ignore-start
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, Typography } from '@material-ui/core';
import { Palette } from '../../utils/Palette';
import CreateUpdateModal from '../../components/CreateUpdateModal';
import { useAuth } from '../../contexts/Auth';
import AnswerReserveModal from './components/AnswerReserveModal';

const RESERVE_STATE = {
  CONFIRMED: 'confirmada',
  PENDING: 'Pendente',
  REFUSED: 'Recusada',
};

const reservesData = [
  {
    id: 1,
    name: 20,
    adults: 3,
    kids: 2,

    babies: 0,
    hours: new Date('2014-08-18T21:12:54'),
    date: new Date('2014-08-18T21:11:54'),
    reserveState: RESERVE_STATE.REFUSED,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    name: 10,
    adults: 3,
    kids: 2,
    babies: 0,
    hours: new Date('2014-08-18T21:11:54').toLocaleTimeString().substring(0, 5),
    date: new Date('2014-08-18T21:11:54'),
    reserveState: RESERVE_STATE.PENDING,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    name: 30,
    adults: 3,
    kids: 2,

    babies: 0,
    hours: new Date('2014-08-18T20:11:54'),
    date: new Date('2014-08-18T21:11:54'),
    reserveState: RESERVE_STATE.CONFIRMED,
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
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Tipo de Reserva',
    type: 'select',
    isEditable: true,
  },
  {
    id: 'adults',
    numeric: true,
    disablePadding: false,
    label: 'Nº de adultos',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'kids',
    numeric: true,
    disablePadding: false,
    label: 'Nº de crianças (Até aos 11 anos)',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'babies',
    numeric: true,
    disablePadding: false,
    label: 'Nº de bebés',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Estado da Reserva',
    type: 'select',
    isEditable: true,
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Horas',
    type: 'time',
    isEditable: true,
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Data',
    type: 'date',
    isEditable: true,
  },
  /* {
    id: 'reserveState',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
    type: 'date',
    isEditable: false,
  },*/
];
const ReservesView = () => {
  const titles = ['Canceladas', 'Pedidos', 'Confirmadas'];
  const [confirm, setConfirm] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [actionTitle, setActionTitle] = useState('');
  const { user } = useAuth();
  const modalDataRef = useRef();
  const reservations = useReservations();
  const { mutate } = useSWRConfig();
  const [openAnswerReserveModal, setOpenAnswerReserveModal] = useState(false);
  const [sourceInd, setSourceInd] = useState('');
  const [destinationInd, setDestinationInd] = useState(-1);
  const [actualSource, setActualSource] = useState('');
  const [actualDestination, setActualDestination] = useState('');

  //inicio do drag and drop code

  // @ts-ignore-start
  const reorder = list => {
    const result = Array.from(list);

    // @ts-ignore
    result.sort((a: any, b: any) => a.date > b.date);
    return result;
  };
  // @ts-ignore-start
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    // @ts-ignore-start
    result[droppableSource.droppableId] = sourceClone;
    // @ts-ignore-start
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const grid = 8;
  // @ts-ignore-start

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  // @ts-ignore-start

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 300,
  });

  useEffect(() => {
    if (reservations.reservations) {
      const filteredConfirm = reservations.reservations.filter(
        // @ts-ignore-start
        r => r.status === 'confirmed',
      );
      const filteredInReview = reservations.reservations.filter(
        // @ts-ignore-start
        r => r.status === 'inReview',
      );
      // @ts-ignore-start
      const filteredCanceled = reservations.reservations.filter(
        // @ts-ignore-start
        r => r.status === 'canceled',
      );
      // @ts-ignore-start

      setConfirm([...filteredConfirm]);

      // @ts-ignore-start
      setInReview([...filteredInReview]);
      // @ts-ignore-start

      setCanceled([...filteredCanceled]);
    }
  }, [reservations.reservations]);

  const onSubmit = async (formControl: any, time?: any, date?: any) => {
    console.log(user); // user always undefined dont know why
    const achievement = await api.post('/user/reservations', {
      type: formControl['type'],
      status: formControl['status'],
      date: date && format(date, 'P'),
      time: time && format(time, 'hh:mm'),
      adults: formControl['adults'],
      kids: formControl['kids'],
      babies: formControl['babies'],
      // restaurantId: user.restaurantId,
    });

    if (achievement.status === 200) {
      mutate('/restaurants/reservations');
      return true;
    } else {
      return false;
    }
  };

  const onUpdate = async (
    reservationId: any,
    status: any,
    adminNotes?: string,
  ) => {
    console.log('reservation', reservationId);
    const achievement = await api.put(
      '/restaurants/reservations/' + reservationId.id,
      {
        status: status,
        adminNotes: adminNotes,
      },
    );

    if (achievement.status === 200) {
      mutate('/restaurants/reservations');
      return true;
    } else {
      return false;
    }
  };

  const onUpdateToCancel = async (
    reservation: any,
    status: string,
    changedData: any,
  ) => {
    console.log('changedData', changedData);
    const achievement = await api.put(
      '/restaurants/reservations/' + reservation.id,
      {
        time: changedData.time,
        date: changedData.date,
        status: status,
        adminNotes: changedData.message,
      },
    );

    if (achievement.status === 200) {
      mutate('/restaurants/reservations');
      return true;
    } else {
      return false;
    }
  };

  const handleModal = (title?: string, data?: any) => {
    //useRef para transportar dados se existirem para dentro dos fields do modal
    if (data) {
      modalDataRef.current = data;
    }
    setActionTitle(title ? title : '');

    //If will add something, here we clean the ref for be sure the inputs will be clean
    if (!openModal && title === 'Adicionar') {
      if (modalDataRef) {
        // @ts-ignore
        modalDataRef.current = {};
      }
    }

    setOpenModal(!openModal);
  };

  const handleAnswerReserveModal = (data?: any) => {
    if (data) {
      modalDataRef.current = data;
    }
    setOpenAnswerReserveModal(!openAnswerReserveModal);
  };

  const destinationIdToState = (id: number) => {
    switch (id) {
      case 0:
        return canceled;
      case 1:
        return inReview;
      case 2:
        return confirm;
      default:
        return [];
    }
  };

  const auxDrop = async (dInd: number, moveResult: [any]) => {
    if (dInd === 0) {
      // @ts-ignore
      setCanceled([...moveResult[dInd]]);
    } else if (dInd === 1) {
      // @ts-ignore
      setInReview([...moveResult[dInd]]);
    } else {
      // @ts-ignore
      setConfirm([...moveResult[dInd]]);
    }
  };

  const destinationToStatus = (destinationId: number) => {
    switch (destinationId) {
      case 0:
        return 'canceled';
      case 1:
        return 'inReview';
      case 2:
        return 'confirmed';
    }
  };

  // @ts-ignore-start
  function onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      if (sInd === 0) {
        const items = reorder(canceled);
        // @ts-ignore-start
        setCanceled([...items]);
      } else if (sInd === 1) {
        const items = reorder(inReview);
        // @ts-ignore-start
        setInReview([...items]);
      } else {
        const items = reorder(confirm);
        // @ts-ignore-start
        setConfirm([...items]);
      }
    } else {
      if (sInd === 0) {
        const result = move(
          canceled,
          destinationIdToState(dInd),
          source,
          destination,
        );
        // @ts-ignore-start

        setCanceled([...result[sInd]]);
        // @ts-ignore-start
        auxDrop(dInd, result);
        onUpdate(canceled[source.index], destinationToStatus(dInd));
      } else if (sInd === 1) {
        if (destinationToStatus(dInd) === 'canceled') {
          modalDataRef.current = inReview[source.index];
          setActualSource(source);
          setActualDestination(destination);
          setSourceInd('inReview');
          setDestinationInd(dInd);
          setOpenAnswerReserveModal(true);
        } else {
          const result = move(
            inReview,
            destinationIdToState(dInd),
            source,
            destination,
          );
          // @ts-ignore-start

          setInReview([...result[sInd]]);
          // @ts-ignore-start
          auxDrop(dInd, result);
          onUpdate(inReview[source.index], destinationToStatus(dInd));
        }
      } else {
        if (destinationToStatus(dInd) === 'canceled') {
          modalDataRef.current = inReview[source.index];
          setActualSource(source);
          setActualDestination(destination);
          setSourceInd('confirmed');
          setDestinationInd(dInd);
          setOpenAnswerReserveModal(true);
        } else {
          const result = move(
            confirm,
            destinationIdToState(dInd),
            source,
            destination,
          );
          // @ts-ignore-start

          setConfirm([...result[sInd]]);
          // @ts-ignore-start
          auxDrop(dInd, result);
          onUpdate(confirm[source.index], destinationToStatus(dInd));
        }
      }
    }
  }

  //Fim do drag and drop code

  const renderReserve = (item: any) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <span>Nome: {item.firstName}</span>
          <span>Tipo: {item.type}</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '10px',
            marginBottom: '10px',
          }}>
          <span>Adultos: {item.adults}</span>
          <span>Crianças: {item.kids}</span>
          <span>Bebés: {item.babies}</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <span>
            Horas: {`${item.time.split(':')[0]}:${item.time.split(':')[1]}`}
          </span>
          <span>Data: {item.date.split('T')[0]}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {openModal && (
        <CreateUpdateModal
          open={openModal}
          handleCloseModal={handleModal}
          fields={headCells}
          title={'Reserva'}
          dataRef={modalDataRef}
          actionTitle={actionTitle}
          onSubmit={onSubmit}
          reserve={true}
        />
      )}
      {openAnswerReserveModal && (
        <AnswerReserveModal
          handleCloseModal={() => handleAnswerReserveModal()}
          dataRef={modalDataRef}
          onUpdate={onUpdateToCancel}
          move={move}
          auxDrop={auxDrop}
          sourceIndex={sourceInd}
          destinationIndex={destinationInd}
          inReview={inReview}
          confirmed={confirm}
          setInReview={setInReview}
          setConfirmed={setConfirm}
          actualSource={actualSource}
          actualDestination={actualDestination}
          destinationToStatus={destinationToStatus}
          destinationIdToState={destinationIdToState}
        />
      )}
      <ResponsiveDrawer>
        {reservations.reservations ? (
          <div
            style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <Box display="flex" mb={3} mt={3} justifyContent="space-between">
              <Typography variant="h6">
                {translations[location.pathname.substring(1)]}
              </Typography>

              <Button
                style={{
                  background: Palette.primaryBackgroundColor,
                  color: Palette.primaryTextColor,
                  boxShadow: 'none',
                }}
                variant="contained"
                onClick={() => handleModal('Adicionar')}>
                Adicionar Reserva
              </Button>
            </Box>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <h2>{titles[0]}</h2>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Droppable droppableId={`${0}`}>
                      {
                        // @ts-ignore-start
                        (provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}>
                            {canceled.map((item: any, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id + ''}
                                index={index}>
                                {
                                  // @ts-ignore-start
                                  (provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style,
                                      )}>
                                      {
                                        //@ts-ignore
                                        renderReserve(item)
                                      }
                                    </div>
                                  )
                                }
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )
                      }
                    </Droppable>
                  </div>
                </div>

                <div style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <h2>{titles[1]}</h2>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Droppable droppableId={`${1}`}>
                      {
                        // @ts-ignore-start
                        (provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}>
                            {inReview.map((item: any, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id + ''}
                                index={index}>
                                {
                                  // @ts-ignore-start
                                  (provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style,
                                      )}>
                                      {
                                        //@ts-ignore
                                        renderReserve(item)
                                      }
                                    </div>
                                  )
                                }
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )
                      }
                    </Droppable>
                  </div>
                </div>

                <div style={{ width: '100%' }}>
                  <div
                    style={{
                      width: '100%',
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <h2>{titles[2]}</h2>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Droppable droppableId={`${2}`}>
                      {
                        // @ts-ignore-start
                        (provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}>
                            {confirm.map((item: any, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id + ''}
                                index={index}>
                                {
                                  // @ts-ignore-start
                                  (provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style,
                                      )}>
                                      {
                                        //@ts-ignore
                                        renderReserve(item)
                                      }
                                    </div>
                                  )
                                }
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )
                      }
                    </Droppable>
                  </div>
                </div>
              </DragDropContext>
            </div>
          </div>
        ) : (
          <></>
        )}
      </ResponsiveDrawer>
    </>
  );
};

export default ReservesView;
/*  <ResponsiveTable
          data={reservations.reservations}
          fields={headCells}
          actions={true}
          title={'Reserva'}
          reserve={true}
          onSubmit={onSubmit}
          onUpdate={onUpdate}
      />*/
