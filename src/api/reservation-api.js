import axios from 'axios'
import toastr from 'toastr'
import { show, destroy } from 'redux-modal'
import { toggleLoaded, saveCards, selectCard, clearState } from '../actions/booking-actions'
import api_endpoints from '../../config/apis'
import moment from 'moment'


export const bookWithoutPayment = (duration, date) => {
  return (dispatch, getState) => {
    const state = getState();
    const { activeSlot } = state.booking;
    const { selectedCourts } = state.booking;
    const bookings = selectedCourts.map(court => {
      const start_time = moment(date, 'DD/MM/YYYY').add(activeSlot, 'minutes');
      return ({ id: court.id, price: court.price, start_time, duration })
    });
    return axios.post(`${api_endpoints.playven}/reservations`, {
      duration,
      date,
      bookings: JSON.stringify(bookings),
    })
    .then(resp => {
      dispatch(destroy('payment'));
      dispatch(show('success'));
      dispatch(clearState());
    })
    .catch(error =>  toastr.error("Booking failed! something went wrong."))
  }
}

export const pay = (duration, date) => {
  return (dispatch, getState) => {
    const state = getState();
    const card = state.booking.selectedCard;
    const { activeSlot } = state.booking;
    if (!card) {
      toastr.error('Please select a card to pay');
      return false;
    }
    const { selectedCourts } = state.booking;
    const bookings = selectedCourts.map(court => {
      const start_time = moment(date, 'DD/MM/YYYY').add(activeSlot, 'minutes');
      return ({ id: court.id, price: court.price, start_time, duration })
    });
    dispatch(toggleLoaded());
    return axios.post(`${api_endpoints.playven}/reservations`, {
      duration,
      date,
      bookings: JSON.stringify(bookings),
      card,
      pay: true,
    })
    .then(resp => {
      dispatch(toggleLoaded());
      dispatch(destroy('payment'));
      dispatch(show('success'));
      dispatch(clearState());
    })
    .catch(error =>  {
      dispatch(toggleLoaded());
      toastr.error("Booking failed! something went wrong.")
    })
  }
}

export const getCards = () => {
  return dispatch => {
    dispatch(toggleLoaded());
    return axios.get(`${api_endpoints.playven}/cards.json`)
    .then(resp => {
      dispatch(toggleLoaded());
      resp.data.cards !== null && dispatch(saveCards(resp.data.cards.data));
      resp.data.default_card !== null && dispatch(selectCard(resp.data.default_card))
    })
    .catch(error =>  {
      console.log(error)
      dispatch(toggleLoaded());
    })
  }
}

export const addCard = token => {
  return (dispatch) => {
    dispatch(toggleLoaded());
    return axios.post(`${api_endpoints.playven}/cards`, {
      token: token.id
    })
    .then(resp => {
      console.log(resp);
      dispatch(toggleLoaded());
      dispatch(saveCards(resp.data.cards.data));
      resp.data.default_card !== null && dispatch(selectCard(resp.data.default_card));
    })
    .catch(error =>  {
      console.log(error)
      dispatch(toggleLoaded());
      toastr.error("Card could not be added!");
    })
  }
}