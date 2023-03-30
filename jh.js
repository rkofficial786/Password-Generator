const symbolString="~!@#$%^&*()_?{}[]><" ;
function getRandInt(min,max){
    return Math.floor(Math.random()*(max-min)) +min ;
}


function getSymbol(symbolString){
    let random =  getRandInt(1,19);
    
    return symbolString.charAt(random) ;
  }


 console.log(getSymbol(symbolString));  ;