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

const AppNavigator = createStackNavigator({
    home :
    {
        screen: home,
        navigationOptions:{
            header: null,
        }
    },
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