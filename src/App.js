import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from '../src/Ui/signup/signup'
import Dashboard from '../src/Ui/dashboard/dashboard'
import Profile from '../src/Ui/profile/profile'
import Income from '../src/Ui/income/income'
import Course from '../src/Ui/Course/Course'
import Login from '../src/Ui/Admin/LoginAdmin'
import AdminDash from '../src/Ui/Admin/DashboardAdmin'
import AdminStore from '../src/Ui/Admin/StoreAdmin'
import CousreDetail from '../src/Ui/courseDetail/courseDetail'
import AdminEdu from '../src/Ui/Admin/EducationAdmin'
import Deposit from '../src/Ui/Admin/Deposit'
import Purchase from '../src/Ui/Admin/Purchase'
import Setting from '../src/Ui/Admin/Setting'
import Support from '../src/Ui/Admin/Support'
import CreateCode from '../src/Ui/Admin/CreateCode'
import AnswerToSser from '../src/Ui/Admin/AnswerToUser'
import Viner from '../src/Ui/viner/Viner'
import Success from "./Ui/StatusPay/Success";
import Failed from "./Ui/StatusPay/Failed";
class App extends Component{
  render(){
    return(
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route exact path='/' component={Signup} />
                    <Route exact path='/success' component={Success} />
                    <Route exact path='/failed' component={Failed} />
                     <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/dashboard/profile' component={Profile}></Route>
                    <Route exact path='/dashboard/income' component={Income}></Route>
                    <Route exact path='/dashboard/course' component={Course}></Route>
                    <Route exact path='/dashboard/course/detail' component={CousreDetail}></Route>
                    <Route exact path='/admin/login' component={Login}></Route>
                    <Route exact path='/admin/dashboard' component={AdminDash}></Route>
                    <Route exact path='/admin/store' component={AdminStore}></Route>
                    <Route exact path='/admin/education' component={AdminEdu}></Route>
                    <Route exact path='/admin/deposit' component={Deposit}></Route>
                    <Route exact path='/admin/setting' component={Setting}></Route>
                    <Route exact path='/admin/purchase' component={Purchase}></Route>
                    <Route exact path='/admin/support' component={Support}></Route>
                    <Route exact path='/admin/createcode' component={CreateCode}></Route>
                    <Route exact path='/admin/answertouser' component={AnswerToSser}></Route>
                    <Route exact path='/viner' component={Viner}></Route>
                </Suspense>
            </Router>
    )
}
}

export default App;