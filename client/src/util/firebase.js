import firebase from 'firebase'
 const config ={
//    apiKey: "AIzaSyBNx9pqjROU9nT-PZUf1FvJYo8mGHZA1NA",
//   authDomain: "fir-sendsms-react.firebaseapp.com",
//   projectId: "fir-sendsms-react",
//   storageBucket: "fir-sendsms-react.appspot.com",
//   messagingSenderId: "671774203380",
//   appId: "1:671774203380:web:ca40616ebad4caf3e8eda1"

// apiKey: "AIzaSyAUIOU1IIh_rCAXz0TUSzhvEFJOl0l0Nkg",
// authDomain: "chatapp-client-93d4d.firebaseapp.com",
// projectId: "chatapp-client-93d4d",
// storageBucket: "chatapp-client-93d4d.appspot.com",
// messagingSenderId: "293719551129",
// appId: "1:293719551129:web:b8c8761aff3b97698d5c08"

apiKey: "AIzaSyDnbS6nGFyUDe3N2mC7SqpNEtGW2o_sjgs",
authDomain: "test-3aebd.firebaseapp.com",
projectId: "test-3aebd",
storageBucket: "test-3aebd.appspot.com",
messagingSenderId: "83932440670",
appId: "1:83932440670:web:c9ce91706ea1d9669caccf"

    
 }

 firebase.initializeApp(config);
 const auth = firebase.auth();

 export  {firebase,auth}