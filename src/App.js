import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LangingPage from './components/LandingPage';
import CreateActivity from './components/CreateActivity';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route exact path='/' element={< LangingPage />} />
        <Route path='/create-activity' element={<CreateActivity />} />
        <Route path='/detail/:code' element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
