import React, { useEffect, useRef, useState } from 'react';
import ResponsiveDrawer, { translations } from '../../components/Drawer';
import CreateUpdateModal from '../../components/CreateUpdateModal';
import AnswerReserveModal from '../ReservesView/components/AnswerReserveModal';
import { Box, Button, Typography } from '@material-ui/core';
import { Palette } from '../../utils/Palette';
import { useAuth } from '../../contexts/Auth';

import { useSWRConfig } from 'swr';
import api from '../../utils/Api';
import { format } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { usePurchases } from '../../api/usePurchases';

const RESERVE_STATE = {
  CONFIRMED: 'confirmada',
  PENDING: 'Pendente',
  REFUSED: 'Recusada',
};

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
    id: 'deliveryType',
    numeric: false,
    disablePadding: false,
    label: 'Tipo de Encomenda',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'Preço Final',
    type: 'number',
    isEditable: true,
  },
];

const ParcelsView = () => {
  const titles = ['Canceladas', 'Pedidos', 'Confirmadas'];
  const [confirm, setConfirm] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [actionTitle, setActionTitle] = useState('');
  const { user } = useAuth();
  const modalDataRef = useRef();
  const purchases = usePurchases();
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
    if (purchases.purchases) {
      const filteredConfirm = purchases.purchases.filter(
        // @ts-ignore-start
        r => r.status === 'confirmed',
      );
      const filteredInReview = purchases.purchases.filter(
        // @ts-ignore-start
        r => r.status === 'inReview',
      );
      // @ts-ignore-start
      const filteredCanceled = purchases.purchases.filter(
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
  }, [purchases.purchases]);

  const onSubmit = async (formControl: any, time?: any, date?: any) => {};

  const onUpdate = async () => {};

  const onUpdateToCancel = async (
    reservation: any,
    status: string,
    changedData: any,
  ) => {};

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
        //   onUpdate(canceled[source.index], destinationToStatus(dInd));
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
          //  onUpdate(inReview[source.index], destinationToStatus(dInd));
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
          //     onUpdate(confirm[source.index], destinationToStatus(dInd));
        }
      }
    }
  }

  // end of drag and drop code

  const renderParcel = (item: any) => {
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
          <span>UserId: {item.userId}</span>
          <span>Tipo: {item.deliveryType}</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '10px',
            marginBottom: '10px',
          }}>
          <span>Morada: {item.addressId}</span>

          <span>Total: {item.total}</span>
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

  console.log('purchases', purchases);

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
          //onSubmit={onSubmit}
          reserve={true}
        />
      )}
      {openAnswerReserveModal && (
        <AnswerReserveModal
          handleCloseModal={() => handleAnswerReserveModal()}
          dataRef={modalDataRef}
          //onUpdate={onUpdateToCancel}
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
        {purchases.purchases ? (
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
                                        renderParcel(item)
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
                                        renderParcel(item)
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
                                        renderParcel(item)
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
export default ParcelsView;
