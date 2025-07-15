//lets imagine a scenario where you are buying a course from udemy.
// you want to enroll - > payment system-> progress of the course system -> certificate system
// before seeing the progress -> you have to wait for the payment to be successful-> if successful then you can see the progress of the course 
                                                                            //    -> else you will not be able to see the progress 
// let implement: 



const paymentSuccess = true; 
const marks = 80 ; 
function enroll(callback){
    console.log("Enrollment on progress..."); 

    setTimeout(function(){

        if(paymentSuccess){
            callback();
        } else {
            console.log("Payment failed!") ;  
        }

    }, 2000) ; 
}

function progress(callback){
    console.log("Progress ongoing..."); 
    setTimeout(function(){

        if(marks>= 80 ){
            callback();
        } else {
            console.log("you have not obtained necessary marks to pass") ; 
        }

    }, 3000) ; 
}

function getCertificate(){
    console.log("Giving certification to the participant...") ; 

    setTimeout(function(){
        console.log("Congrats! you got the certificate") ; 
    }, 1000) ; 
}



enroll(()=> {
    progress(()=>{
        getCertificate(); 
    })
}) ; 


// now , there's problems with callback functions . that is why we use promise or asynce/await , which is discussed in the 03. asyncrhonous behaviour.js




