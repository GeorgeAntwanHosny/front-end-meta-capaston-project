import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const BookingForm = (props) => {
    const navigate = useNavigate();
    const today = new Date();
    const isoDate = today.toISOString().substring(0, 10);
    const defaultTimeValues = Object.keys(props.founded).length !== 0 ?props.founded.availableTimes[0]:'';
    const initializeFormData = {date:'', numOfGuests:1, time:defaultTimeValues, occasion:'Birthday'};
    const [formData,setFormData] = useState(initializeFormData);
    useEffect(()=>{
                   setFormData({...formData, time: defaultTimeValues });

    },[props.founded.availableTimes]);
    function handelChange(e){
        e.preventDefault();
        if(e.target.name ==='date'){
            props.storeNewDate(e.target.value.toString())
            props.findDate(e.target.value.toString())

        }
            setFormData({...formData, [e.target.name]:e.target.value});

    }
    async function handelSubmit(e) {
        e.preventDefault();

        const bookingList = [...props.bookingList];
        let availableTime = true;
        const formDataFullDate = new Date(formData.date + ' ' + formData.time);
        if (formDataFullDate < new Date()) {
            availableTime = false;
        } else {
            bookingList.forEach(booking => {
                if ((booking.time === formData.time) && (booking.date === formData.date)) {
                    availableTime = false;
                    return;
                }
            });
        }
        if (availableTime && formData.time !== '' && formData.time !== undefined) {
            // await submitAPI(formData);
            // navigate("/confirmed-booking");
            props.addBookingList(formData);
            props.removeAvailableTime(formData.date, formData.time);
            setFormData({...formData, time: defaultTimeValues});
        } else {
            alert('this Date or time not available, please choose anther Date.')
        }
    }
    const style = {display: "grid", gridTemplateColumns: "140px 140px", maxWidth: "400px", gap: "10px", paddingBottom:"20px"};
    return (
        <>
            <p>Booking now</p>
            <form style={style} onSubmit={handelSubmit}>
                <label htmlFor="res-date">Choose date</label>
                <input type="date" id="res-date" name={"date"} value={formData.date} onChange={handelChange}/>
                <label htmlFor="res-time">Choose time</label>
                <select data-testid="res-times" name="select-time" value={ formData.time} onChange={handelChange}>

                {
                    Object.keys(props.founded).length!==0? props.founded?.availableTimes?.length>=0 ? props.founded?.availableTimes.map(time=>{
                                return <option  value={time} key={time}>{time}</option>
                                })
                                :<option></option>
                    :<option>

                    </option>
                }


                </select>
                    <label htmlFor="guests">Number of guests</label>
                    <input type="number" placeholder="1" min="1" max="10" id="guests" name="numOfGuests" onChange={handelChange} value={formData.numOfGuests}/>
                        <label htmlFor="occasion">Occasion</label>
                        <select id="occasion" name="occasion" value={formData.occasion} onChange={handelChange}>
                            <option>Birthday</option>
                            <option>Anniversary</option>
                        </select>
                        <input disabled={!formData.date} type="submit" value="Make Your reservation" />
            </form>
        </>
    );
};
export default BookingForm;