import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Parent from './components/Parent';
import Form2 from './components/Form2';
import LifeCycle from './components/LifeCycle';
import API from './components/API';

import FinalForm from './Assignment2/index';
import APIS from './Assignment3';

import {BrowserRouter, Route, Link,Switch, Routes} from 'react-router-dom';
import HomePage from './HomePage';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Book from './Book';
// import UserTable from './Assignment4/UserTable';
import CustomForm from './Assignment4/CustomForm';
import index from './Assignment4';


function App() {
  return (
    // <Provider store={store}>
      <div >
      <BrowserRouter>
        <Routes>
        <Route exact path='/' Component={HomePage}></Route>
          <Route path='/assignment2' Component={FinalForm}></Route>
          <Route path='/assignment3' Component={APIS}></Route>
          {/* <Route path='/book' Component={Book}></Route> */}
          <Route path='/assignment4' Component={index}></Route>
          <Route path='/editUser' Component={CustomForm}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    // </Provider>
    //   <div >
    //   <BrowserRouter>
    //     <Routes>
    //     <Route exact path='/' Component={HomePage}></Route>
    //       <Route path='/assignment2' Component={FinalForm}></Route>
    //       <Route path='/assignment3' Component={APIS}></Route>
    //     </Routes>
    //   </BrowserRouter>


    //   {/* <Form></Form> */}
    //   {/* // <Form2></Form2> */}

    //   {/* <FinalForm></FinalForm> */}
    //   {/* <APIS></APIS> */}

    //   {/* <Parent></Parent> */}
    //   {/* <LifeCycle></LifeCycle> */}
    //   {/* <API></API> */}
    // </div>
  );
}

export default App;

// className="App"