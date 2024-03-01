import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Faq from '../components/Faq';
import Home from '../components/home';
import Login from '../components/login';
import About from '../components/about';
// import Register from '../components/register';
import SignUp from '../components/SignUpOld.js';
import Suscription from '../components/Subscription';
import Logo from '../images/KIDZCONNECT-1.png';
import StripePayment from '../components/PaymentGateway/StripePayment';
import ContactUs from '../components/ContactUs';
import SuggestFeatures from '../components/Dashboard/SuggestFeatures';
import DoneWithBook from '../components/Dashboard/DoneWithbook.js';
import GettingStartedQuiz from '../components/Dashboard/GettingStartedQuiz';
import Quiz from '../components/Dashboard/QuizQuestion';
import RecordedAnswer from '../components/Dashboard/RecordedAnswer';
import { Navigate } from 'react-router-dom';
import TC from '../components/T&C';
import Privacy_policy from '../components/Privacy_policy';
import ForgetPassword from '../components/ForgetPassword';
import ResetPassword from '../components/ResetPassword';
import SignUpNew from '../components/SignUpNew.js';
import SignUpregistration from '../components/SignUpregistration.js';
import SignUpmailverify from '../components/SignUpmailverify.js';
import WhoAreYou from '../components/Dashboard/WhoAreYou';
import AccountCreatedCodeSetup from '../components/Dashboard/AccountCreatedCodeSetup';
import CreateChildProfile from '../components/Dashboard/CreateChildProfile';
import DashboardAddprofile from '../components/Dashboard/AddProfile';
import ProfileInfo from '../components/Dashboard/profileInfo.js';
import Done from '../components/Dashboard/done.js';

// import KidsStory from '../components/Dashboard/KidzStory';
// import KidzOnGoingStory from '../components/Dashboard/KidzOnGoingStory';

function Guest() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/sign-up';
    const isSubscriptionPage = location.pathname === '/subscription';
    const isParentDashboard = location.pathname === '/parent-dashboard';
    const htmlTag = document.documentElement;
        if (htmlTag.classList.contains('menu_active')) {
          htmlTag.classList.remove('menu_active');
        }

    const toggleBodyClassOnClick = () => {
        const htmlTag = document.documentElement;
        if (htmlTag.classList.contains('menu_active')) {
          htmlTag.classList.remove('menu_active');
        } else {
          htmlTag.classList.add('menu_active');
        }
      };

      const isActiveLink = (path) => {
        return location.pathname === path;
    };
  
    return (
        <>
    
            <div className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/subscription" element={<Suscription />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/payment" element={<StripePayment />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/suggest-features" element={<SuggestFeatures />} />
                    <Route path="/donewithbook" element={<DoneWithBook />} />
                    <Route path="/gettingstartedquiz" element={<GettingStartedQuiz />} />
                    <Route path="/RecordedAnswer" element={<RecordedAnswer />} />
                    <Route path="/quiz-question" element={<Quiz />} />
                    <Route path="/logout" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/T&C" element={<TC />} />
                    <Route path="/Privacy_policy" element={<Privacy_policy />} />
                    <Route path="/ForgetPassword" element={<ForgetPassword />} />
                    <Route path="/ResetPassword" element={<ResetPassword />} />
                    <Route path="/SignUpNew" element={<SignUpNew />} />
                    <Route path="/SignUpregistration" element={<SignUpregistration />} />
                    <Route path="/mailverification" element={<SignUpmailverify />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/who-are-you" element={<WhoAreYou />} />
                    <Route path="/account-created" element={<AccountCreatedCodeSetup />} />
                    <Route path="/create-child-profile" element={<CreateChildProfile />} />
                    <Route path="/add-profile" element={<DashboardAddprofile />} />
                    <Route path="/profileinfo" element={<ProfileInfo />} />
                    <Route path="/done" element={<Done />} />
                </Routes>
            </div>
        </>
    );
}

export default Guest;
