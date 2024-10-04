function navigateToProfile(){

    document.querySelectorAll('.childCard').forEach((el,index,arr)=>{
        if(index==0){
            el.addEventListener("click",prakashLinkedIn)
        }
        else if(index==1){
            el.addEventListener("click",atulLinkedIn)
        }
        else if(index==2){
            el.addEventListener("click",ankurLinkedIn)
        }
        else if(index==3){
            el.addEventListener("click",shashankLinkedIn)
        }
        else if(index==4){
            el.addEventListener("click",nandhaKishoreLinkedIn)
        }  
        
    })
    
    function prakashLinkedIn() {
        window.location.href = "https://www.linkedin.com/in/prakash-paudel-226501251/"
    }

    function atulLinkedIn(){
        window.location.href = "https://www.linkedin.com/in/atul-raman-83b7291a3/"
    }

    function ankurLinkedIn(){
        window.location.href = "https://www.linkedin.com/in/ankur-sinha-a4449831a/"
    }

    function shashankLinkedIn(){
        window.location.href = "https://www.linkedin.com/in/shashanksinha4444/"
    }

    // function nandhaKishoreLinkedIn(){
    //     window.location.href = 
    // }

}

navigateToProfile()