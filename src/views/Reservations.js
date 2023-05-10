import BookingForm from "../components/BookingForm";
import {useReducer, useState} from "react";

const reducer = (state, action)=>{
      switch (action.type){
          case "UPDATE_TIME":
              return{
                  ...state,
                  availableTimes: state.availableTimes.filter(time=>time !==action.time)
              }
          case "STORE_NEW_DATE":// create new date and add default available time
          {
              let exists = false;
              [...state.storedFullDate].forEach(fullDate=>{
                  if(fullDate.date ===action.payload.date){
                      exists =true;
                      return;
                  }
              });

              if(!exists){
                  return {
                      ...state,
                      storedFullDate:[...state.storedFullDate,{date:action.payload.date, availableTimes:[...state.initializeAvailableTimes]}]
                  };
              }
              else{
                  return {
                      ...state
                  }
              }

          }
          case "REMOVE_AVAILABLE_TIME"://OKAY
          {
              return {
                  ...state,
                  storedFullDate:[...state.storedFullDate].map(fullDate=>{
                      if(action.payload.date ===fullDate.date){
                          fullDate.availableTimes = [...fullDate.availableTimes].filter(time=> {
                              return time !== action.payload.time;
                          })

                      }
                      return fullDate;
                  })
              };
          }
          case "FIND_BY_DATE":{//OKAY
                 let founded = [...state.storedFullDate].find(date=>date.date===action.payload.dateParam);
                  if(founded!== undefined){
                      founded.availableTimes = founded.availableTimes.filter(time=>new Date(founded.date +' '+time) > new Date());
                  }
                  return {
                      ...state,
                      founded:founded===undefined?{}:founded
                  };
          }
          default:{
              return state;
          }



      }
}

const Reservations = () => {
    const [bookingList,setBookingList] = useState([]);
    const [state, dispatch] = useReducer(reducer, {
        initializeAvailableTimes: ['17:00','18:00', '19:00', '20:00', '21:00', '22:00'],
        storedFullDate:[],
        founded:{}
    });


    const storeNewDate = (date) => {//okay

        dispatch({ type: "STORE_NEW_DATE",payload:{date} });
    };
    const removeAvailableTime = (date,time) => {//okay
        dispatch({ type: "REMOVE_AVAILABLE_TIME",payload:{date,time} });
    };
    const findDate = (dateParam) => {
       dispatch({type:"FIND_BY_DATE",payload:{dateParam}});
    };
    function addBookingList(booking){
        const newList = [...bookingList,booking];
        setBookingList(newList);
    }

    return (

    <>



      <BookingForm

          bookingList={bookingList}
          addBookingList={addBookingList}
          storeNewDate={storeNewDate}
          removeAvailableTime={removeAvailableTime}
          findDate={findDate}
          founded={state.founded}
      />
        {
            bookingList.length !==0?
                <table style={{border: "2px solid",borderRadius:"10px",borderCollapse: "collapse",maxWidth:"800px"}}>
                    <thead>
                <tr>
                    <th>#</th>
                    <th>time</th>
                    <th>date</th>
                    <th>occasion</th>
                    <th> number of guests</th>
                </tr>
                    </thead>
                    <tbody>
                {bookingList.map((booking,index)=> {

                    return (
                        <tr key={index}>
                            <td>{index +1}</td>
                            <td>{booking.time}</td>
                            <td>{booking.date}</td>
                            <td>{booking.occasion}</td>
                            <td>{booking.numOfGuests}</td>
                        </tr>
                    );
                })}
                    </tbody>
            </table>:<></>
        }

    </>
  );
};

export default Reservations;
