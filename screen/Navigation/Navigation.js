import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*Login Files */
import Login from '../Login/Login';
import Register from '../Login/Registration';
import ForgotPass from '../Login/forgotpsw';
import OTP from '../Login/otp';
import setnewpassword from '../Login/setnewpassword';
import home from '../Home/Home1';
import profile from '../Home/Profile1';
import changepassword from '../Login/changepsw';
import editprofile from '../Home/EditProfile';
import createnewreport from '../Home/createnewreport';
import reportdescription from '../Home/reportdescription';
import systeminformation from '../Home/SystemInfo';
import report from '../Home/report';
import reportdetails from '../Home/reportdetails';
import contactus from '../Home/contactus';
// import Second from './screen/SecondPage';
// import Profile from './screen/Profile1';
// import Editprofile from './screen/EditProfile';
// import setnewpassword from './screen/setnewpassword';
// import Registration from './screen/Registration';
// import Home1 from './screen/Home1';
// import forgotpsw from './screen/forgotpsw';
// import otp from './screen/otp';
// import changepsw from './screen/changepsw';
// import createnewreport from './screen/createnewreport';
// import reportdescription from './screen/reportdescription';
// import systeminfo from './screen/SystemInfo';

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
        }
    },
    ForgotPass : 
    {
        screen: ForgotPass,
        navigationOptions: {
            header: null,
        }
    },
    OTP : 
    {
        screen: OTP,
        navigationOptions: {
            header: null,
        }
    },
    setnewpassword :
    {
        screen: setnewpassword,
        navigationOptions:{
            header: null,
        }
    },
    home :
    {
        screen: home,
        navigationOptions:{
            header: null,
        }
    },
    profile :
    {
        screen: profile,
        navigationOptions:{
            header: null,
        }
    },
    changepassword :
    {
        screen: changepassword,
        navigationOptions:{
            header: null,
        }
    },
    editprofile :
    {
        screen: editprofile,
        navigationOptions:{
            header:null,
        }
    },
    createnewreport :
    {
        screen: createnewreport,
        navigationOptions:{
            header:null,
        }
    },
    reportdescription :
    {
        screen: reportdescription,
        navigationOptions:{
            header:null,
        }
    },
    systeminformation :
    {
        screen: systeminformation,
        navigationOptions:{
            header:null,
        }
    },
    report :
    {
        screen: report,
        navigationOptions:{
            header:null,
        }
    },
    reportdetails :
    {
        screen: reportdetails,
        navigationOptions:{
            header:null,
        }
    },
    contactus :
    {
        screen: contactus,
        navigationOptions:{
            header:null,
        }
    }
});

export default createAppContainer(AppNavigator);




// const AppNavigator = createStackNavigator({
//     Home: {
//       screen: HomeScreen,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     changepsw:{
//       screen: changepsw,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     systeminfo:{
//       screen: systeminfo,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     profile:{
//       screen: Profile,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     reportdescription:{
//       screen: reportdescription,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     createnewreport:{
//       screen: createnewreport,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     forgot:{
//       screen: forgotpsw,
//       navigationOptions: {
//         header: null,
//       }
//     },
//     OTP:{
//       screen: otp,
//       navigationOptions: {
//         header: null,
//     }
//     },
    
//     Home1:{
//       screen: Home1,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     Registration:{
//       screen: Registration,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     Editprofile:{
//       screen: Editprofile,
//       navigationOptions: {
//         header: null,
//     }
//     },
//     setnewpassword:{
//       screen: setnewpassword,
//       navigationOptions: {
//         header: null,
//     }
//     },
//   },
//   {
//     initialRouteName: 'Home',
//       /* The header config from HomeScreen is now here */
//       NavigationOptions: {
//         headerStyle: {
//           backgroundColor: '#f4511e',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       },
      
//   }
//   );
  
//   export default createAppContainer(AppNavigator);