import UserRoutes from "./UserRoutes";
import Navbar from "./modules/Navbar/Navbar";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <UserRoutes />
    </div>
  );
}

export default App;
