var slider = document.querySelector("[data-sliderinput]");
var slider_value = document.getElementById("slider-value");
var input = document.querySelector("#input");
var copy_msg = document.querySelector("#copy-msg");
var copy = document.querySelector("#copy");
var checkbox = document.querySelectorAll("input[type=checkbox]");
var glow_circle = document.querySelector("#indicator");
var btn = document.querySelector("#btn");
var uppercase = document.querySelector("#uppercase");
var lowercase = document.querySelector("#lowercase");
var numbers = document.querySelector("#numbers");
var symbols = document.querySelector("#symbols");

const symbolString="~!@#$%^&*()_?{}[]><" ;

let password="" ;

let password_length = 8 ;
let checkcount=0 ;

handle_slider()


function handle_slider(){
    slider.value = password_length
    slider_value.innerText=password_length
}

function setglow(color){
    glow_circle.style.backgroundColor=color

}

function getRandInt(min,max){
    return Math.floor(Math.random()*(max-min)) +min ;
}


function getRandomNumber(){
    return getRandInt(0,9)
}

function generateLowercase(){
    return String.fromCharCode(getRandInt(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRandInt(65,96));
}

function getSymbol(){
  let random =  getRandInt(1,symbolString.length-1);
  
  return symbolString.charAt(random) ;
}

function setStrength(){
    let hasUpper= false
    let hasLower= false
    let hasNumber= false
    let hasSymbol= false


    if(uppercase.checked) { hasUpper = true}
    if(lowercase.checked) {hasLower=true};
    if(numbers.checked) {hasNumber=true};
    if(symbols.checked) {hasSymbol=true};

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && password_length>=8){
       setglow("#7CFC00")
    }

    else if((hasUpper || hasLower || hasSymbol || hasNumber)  && (hasLower || hasNumber || hasSymbol || hasUpper) && password_length>=5 ){
        setglow("#E4D00A")
    }

    else{
        setglow("#DC143C")
    }
}




  async function copyContent(){

    try{
        navigator.clipboard.writeText(input.value);
        copy_msg.innerText = "copied"
    }
    catch(e){
        copy_msg.innerText="failed"
    }

       setTimeout(() => {
        copy_msg.style.display = "none"
       }, 1000);

  }


  slider.addEventListener('input' , (e)=>{
    password_length = e.target.value;
    handle_slider()
  })

  copy.addEventListener('click' , ()=>{
    if(input.value){
    copyContent()
    }
  })

  function handlecheckbox(){
    checkcount=0 ;
    checkbox.forEach((check)=>{
        if(check.checked){
            checkcount++ ;
        }
    })

    if(password_length<checkcount){
        password_length=checkcount ;
        handle_slider()
    }
  }



checkbox.forEach((check)=>{
    check.addEventListener('change' ,handlecheckbox)
})

btn.addEventListener('click' , ()=>{
    if(checkcount=0) return ;
  if(password_length<checkcount){
    password_length=checkcount
    handle_slider()
  }

  password="";
 
    // if(uppercase.checked){
    //     password=password+generateUppercase()
    //   }
    
    //   if(lowercase.checked){
    //     password=password+generateLowercase()
    //   }
    
    //   if(numbers.checked){
    //     password=password+getRandomNumber()
    //   }
    
    //   if(symbols.checked){
    //     password=password+getSymbol()
    //   }

    let funcArray =[];

    if(uppercase.checked){
        funcArray.push(generateUppercase);
    }

    if(lowercase.checked){
        funcArray.push(generateLowercase)
    }

    if(numbers.checked){
        funcArray.push(getRandomNumber)
    }

    if(symbols.checked){
        funcArray.push(getSymbol)
    }

    //cumpulsory addition

    for(let i=0 ; i <funcArray.length ; i++){
        password+=funcArray[i]()
    }

    //remaining addition

    for(let i= 0 ; i < password_length - funcArray.length ; i++){
        let randomeIndex=getRandInt(0,funcArray.length)
        password+=funcArray[randomeIndex]()
    }

   

    input.value = password ;

    setStrength()
  


})