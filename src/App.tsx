import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./features/user/User";
import RentsPage from "./features/rents/Rents";
import Cars from "./features/cars/Cars";
import CarDetails from "./features/carDetails/CarDetails";
import Signin from "./features/auth/signin/Signin";
import Signup from "./features/auth/signup/Signup";
import HomePage from "./features/homepage/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={() => <HomePage />} />
        <Route path="/cars" Component={() => <Cars />} />
        <Route path="/cars/:carId" Component={() => <CarDetails />} />
        <Route path="/rents" Component={() => <RentsPage />} />
        <Route path="/user" Component={() => <UserPage />} />
        <Route path="/auth/signin" Component={() => <Signin />} />
        <Route path="/auth/signup" Component={() => <Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
