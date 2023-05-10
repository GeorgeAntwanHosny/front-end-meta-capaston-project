import "./App.css";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Menu from "./views/Menu";
import OrderOnline from "./views/OrderOnline";
import Reservations from "./views/Reservations";
import Header from "./components/Shared/Header";
import Main from "./components/Shared/Main";
import Footer from "./components/Shared/Footer";
import ConfirmedBooking from "./components/ConfirmedBooking";
//main color #EDEFEE.
function App() {
  return (
    <div className="App">
      <Header/>
     <Main>
         <Routes>
             <Route
                 exact
                 element={<Home/>}
                 path="/"

             />
             <Route
                 path="/about"
                 name="about"
                 element={<About />}
             />
             <Route
                 path="/login"
                 name="login"
                 element={<Login />}
             />
             <Route
                 path="/menu"
                 name="menu"
                 element={<Menu />}
             />
             <Route
                 path="/order-online"
                 name="orderOnline"
                 element={<OrderOnline />}
             />
             <Route
                 path="/reservations"
                 name="reservations"
                 element={<Reservations />}
             />
             <Route
                 path="/confirmed-booking"
                 name="confirmed-booking"
                 element={< ConfirmedBooking />}
             />
             <Route
                 path="*"
                 element={<NotFound />} />

         </Routes>
     </Main>
     <Footer/>

    </div>
  );
}

export default App;
