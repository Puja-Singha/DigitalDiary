import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import { Footer } from './Components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './Components/Home';
import CreateEntry from './Components/CreateEntry';
import { EntryDetails } from './Components/EntryDetails';



function App () {
  return(
    <Router>
    <div> 
    <Navbar title="DigitalDiary" />
      <Routes>
      <Route exact path='/' element={< Home title="HOME" />}></Route> 
      <Route exact path='/about' element={< About title="ABOUT US" />}></Route>
      <Route exact path='/create-entry' element={<CreateEntry title="CreateEntry" />}></Route>
      <Route exact path='/entry/:id' element={<EntryDetails title="EntryDetails" />}></Route>
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}
export default App;