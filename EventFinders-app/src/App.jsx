import './App.css'
import SignIn from './components/base-components/signIn.jsx';
import Register from './components/base-components/register.jsx';
import EventsPage from './components/base-components/eventsPage.jsx';
import DailyCalender from './components/base-components/dailyCalender.jsx';
import MonthlyCalender from './components/base-components/monthlyCalender.jsx';
import Docmuentation from './components/base-components/documentation.jsx';
import MainContent from './components/wrapper-components/mainContentWrapper';
import PreLogin from './components/wrapper-components/preLoginWrapper';
import Profile from './components/base-components/profileComponent.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingComponent from './components/base-components/landingComponent.jsx';
import LandingPage from './components/wrapper-components/landingWrapper.jsx';

/*
  Might wanna change the events route to something else isn't really that clear. 
*/

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*Routes for the MainContent - Add here if it's after login if it's before login it's should be in the PreLogin*/}
          <Route
            path="/events"
            element={
              <MainContent>
                <EventsPage />
              </MainContent>
            }
          />
          <Route
            path="/events/docs"
            element={
              <MainContent>
                <Docmuentation />
              </MainContent>
            }
          />
          <Route
            path="/events/daily-calender"
            element={
              <MainContent>
                <DailyCalender />
              </MainContent>
            }
          />
          <Route
            path="/events/monthly-calender"
            element={
              <MainContent>
                <MonthlyCalender />
              </MainContent>
            }
          />
          <Route
            path="/events/profile"
            element={
              <MainContent>
                <Profile />
              </MainContent>
            }
          />
          {/*PreLogin - Add a landing page here.*/}
          <Route
            path="/"
            element={
              <LandingPage>
                <LandingComponent/>
              </LandingPage>
            }
          />
          <Route
            path="/signin"
            element={
              <PreLogin>
                <SignIn/>
              </PreLogin>
            }
          />
          <Route
            path="/register"
            element={
              <PreLogin>
                <Register/>
              </PreLogin>
            }
          />        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
