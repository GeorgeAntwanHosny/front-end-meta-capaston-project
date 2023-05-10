import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import BookingForm from './components/BookingForm';
import Reservations from "./views/Reservations";


test('Renders the BookingForm heading', () => {
  render(<BookingForm founded={{}}/>);
  const headingElement = screen.getByText("Booking now");
  expect(headingElement).toBeInTheDocument();
})

test('Check called function correctly',()=>{
  const date = '2023-05-12';
  const storeNewDate = jest.fn();
  const findDate = jest.fn();
  render(
      <BookingForm
      founded={{date:'', availableTimes:[]}}
      storeNewDate={storeNewDate}
      findDate={findDate}
     />
  );
  const dateInput = screen.getByLabelText(/Choose date/);
  fireEvent.change(dateInput, { target: { value: date } });

  expect(storeNewDate).toHaveBeenCalledWith(date);
  expect(findDate).toHaveBeenCalledWith(date);

});

test('Check Available time in a list',()=>{

  const { getByTestId, getAllByRole } = render(
      <BookingForm
          founded={{date:'2023-5-12', availableTimes:['17:00','18:00', '19:00', '20:00', '21:00', '22:00']}}
      />
  );
  const selectDate = screen.getByTestId("res-times");
  const options = Array.from(selectDate.options).map(option => option.value);
  expect(options).toHaveLength(6);
  expect(options[0]).toEqual('17:00');
  expect(options[1]).toEqual('18:00');
  expect(options[2]).toEqual('19:00');
  expect(options[3]).toEqual('20:00');
  expect(options[4]).toEqual('21:00');
  expect(options[5]).toEqual('22:00');

});


test('test reducer functions',()=>{
  render(<Reservations/>);
  const date = '2023-05-12';
  const storeNewDate = jest.fn();
  const findDate = jest.fn();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  fireEvent.ap
  // fireEvent.apply(storeNewDate, date);
  // expect(
  // fireEvent.apply(findDate,date);

});