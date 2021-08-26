import React, { FC } from 'react'
import Enquiry from './components/enquiry';
import TransferData from './components/TransferData';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import { store } from "./Redux/store";
// import { Provider } from "react-redux";
import { StoreProvider } from 'easy-peasy'
import store from './Redux/store'




const App: FC = () => {
  return (
    <>
      <StoreProvider store={store}>
        <BrowserRouter basename="/userinfo-typescript/">
          <Switch>
            <Route exact path="/" component={Enquiry}></Route>
            <Route exact path="/information/:userId" component={TransferData} ></Route>
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    </>
  );
};

export default App;