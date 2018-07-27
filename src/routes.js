import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from './Components/Signup/Signup';

const Routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/dashboard/services" component={Signup}/>
        </Switch>
    </BrowserRouter>
);  

export default Routes;