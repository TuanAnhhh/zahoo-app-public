const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "d7a9e0b8",
    apiSecret: "mbIF1UEFqTGSxgcl"
  })



  const sendSMS =(to,text)=>{
    vonage.message.sendSms("ZAHOO APP", to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
  }



  module.exports =  {sendSMS}