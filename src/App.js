import React, { Component, Suspense } from 'react'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
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
import AdminAuth from "./Ui/Admin/AdminAuth";
import DownloadApp from "./Ui/DownloadApp/DownloadApp";

const AuthAdmin = ({ component: Component, authAdmin,props,authUser, ...rest }) => {

    return(
        <Route
            {...rest}
            render={props =>
                authUser?(
                        authAdmin ? (
                            <Component {...props} />
                            // <Welcome {...props}  />
                        ) : (
                            <AdminAuth  />
                            // <Redirect
                            //     to={{
                            //         pathname: "/admin-auth",
                            //         state: { from: props.location }
                            //     }}
                            // />
                        )
                    ):(
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )



            }
        />

    )
};


class App extends Component{
  render(){
    return(
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route exact path='/' component={Signup} />
                     <Route exact path='/admin-auth' component={AdminAuth} />
                    <Route exact path='/dashboard/success' component={Success} />
                    <Route exact path='/dashboard/failed' component={Failed} />
                     <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/dashboard/profile' component={Profile}></Route>
                    <Route exact path='/dashboard/income' component={Income}></Route>
                    <Route exact path='/dashboard/course' component={Course}></Route>
                    <Route exact path='/dashboard/course/detail' component={CousreDetail}></Route>
                    <Route exact path='/admin/login' component={Login}></Route>
                    <Route exact path='/app' component={DownloadApp}></Route>
                    <AuthAdmin path="/admin/dashboard" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false} authUser={localStorage.getItem('username')} component={(props) => <AdminDash {...props}  />}  />
                    <AuthAdmin path="/admin/store" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}  authUser={localStorage.getItem('username')} component={(props) => <AdminStore {...props}  />}  />
                    <AuthAdmin path="/admin/education" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}  authUser={localStorage.getItem('username')} component={(props) => <AdminEdu {...props}  />}  />
                    <AuthAdmin path="/admin/deposit" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}  authUser={localStorage.getItem('username')} component={(props) => <Deposit {...props}  />}  />
                    <AuthAdmin path="/admin/setting" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}  authUser={localStorage.getItem('username')} component={(props) => <Setting {...props}  />}  />
                    <AuthAdmin path="/admin/purchase" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}  authUser={localStorage.getItem('username')} component={(props) => <Purchase {...props}  />}  />
                    <AuthAdmin path="/admin/support" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}  authUser={localStorage.getItem('username')} component={(props) => <Support {...props}  />}  />
                    <AuthAdmin path="/admin/createcode" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}  authUser={localStorage.getItem('username')}  component={(props) => <CreateCode {...props}  />}  />
                    <AuthAdmin path="/admin/answertouser" authAdmin={localStorage.getItem('adminAccess')?localStorage.getItem('adminAccess'):false}   authUser={localStorage.getItem('username')} component={(props) => <AnswerToSser {...props}  />}  />

                    {/*<Route exact path='/admin/dashboard' component={AdminDash}></Route>*/}
                    {/*<Route exact path='/admin/store' component={AdminStore}></Route>*/}
                    {/*<Route exact path='/admin/education' component={AdminEdu}></Route>*/}
                    {/*<Route exact path='/admin/deposit' component={Deposit}></Route>*/}
                    {/*<Route exact path='/admin/setting' component={Setting}></Route>*/}
                    {/*<Route exact path='/admin/purchase' component={Purchase}></Route>*/}
                    {/*<Route exact path='/admin/support' component={Support}></Route>*/}
                    {/*<Route exact path='/admin/createcode' component={CreateCode}></Route>*/}
                    {/*<Route exact path='/admin/answertouser' component={AnswerToSser}></Route>*/}
                    <Route exact path='/viner' component={Viner}></Route>
                </Suspense>
            </Router>
    )
}
}

export default App;