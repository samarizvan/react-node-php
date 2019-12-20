import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import InTheDraw from "./components/InTheDraw/InTheDraw";
import DisplayDraw from "./components/DisplayDraw/DisplayDraw";
import InTheDrawTest from "./components/InTheDraw/inTheDrawTest";
import DrawWinner from "./components/DrawWinner/DrawWinner";
import OutOfDraw from "./components/OutOfDraw/OutOfDraw";
import SubNav from "./components/SubNav/SubNav";
import DrawMain from "./components/DrawMain/DrawMain";
import Clock from "./components/Clock/Clock";
import TotalTicket from "./components/TotalTicket/TotalTicket";
import TestDraw from "./components/TestDraw/TestDraw";
import NewTestDraw from "./components/NewTestDraw/NewTestDraw";
import DrawSetting from "./components/DrawSetting/DrawSetting";
import SponsorsLogo from "./components/SponsorsLogo/SponsorsLogo";
import BuildDraw from "./components/admin/buildDraw";
import importData from "./components/admin/importData";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/DrawMain" component={DrawMain} />
      <Route exact path="/InTheDraw" component={InTheDraw} />
      <Route exact path="/DisplayDraw" component={DisplayDraw} />
      <Route exact path="/InTheDrawTest" component={InTheDrawTest} />
      <Route exact path="/DrawWinner" component={DrawWinner} />
      <Route exact path="/outofdraw" component={OutOfDraw} />
      <Route exact path="/sponsorslogo" component={SponsorsLogo} />
      <Route exact path="/testdraw" component={TestDraw} />
      <Route exact path="/newtestdraw" component={NewTestDraw} />
      <Route exact path="/drawsetting" component={DrawSetting} />
      <Route exact path="/admin/builddraw" component={BuildDraw} />
      <Route exact path="/admin/importdata" component={importData} />
      <Route exact path="/SubNav" component={SubNav} />
      <Route path="/clock" component={Clock} />
      <Route path="/TotalTicket" component={TotalTicket} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
