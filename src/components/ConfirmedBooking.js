import {useNavigate} from "react-router-dom";
const ConfirmedBooking =()=>{
    const navigate = useNavigate();
    function onConfirmed(){
        navigate("/reservations",{state:"yes"});
    }
    return(
        <>
            <p>Are You Sure you Want to confirm your booking</p>
        <button onClick={onConfirmed}>Confirmed Booking</button>
            <button onClick={onConfirmed}>Cancel</button>
        </>
    );
};
export default ConfirmedBooking;