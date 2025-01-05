let openning = [16.5, 16, 15.5, 15];
let morning = [18, 17];
let evenning = [21, 20];
let closing = [22];
let omec = [openning, morning, evenning, closing];


let shiftTime = [];

function pickShift() {
    let randomIndex = Math.floor(Math.random()*omec.length);
    shiftTime = omec[randomIndex];
    omec.splice(randomIndex, 1);
    return shiftTime;
}

function shiftTimeSpecifier() {
    
    pickShift();
    let specificShiftIndex = Math.floor(Math.random() * shiftTime.length);
    let specificShift = shiftTime[specificShiftIndex];
    return specificShift;
    
}

let month = [];
let e1 = [];
let e2 = [];
let e3 = [];
let e4 = [];
let friday = [16];
let saturday = [18, 20, 22];

function saturdaySpecifier(){
     specificShiftIndex = Math.floor(Math.random() * saturday.length);
     specificShift = saturday[specificShiftIndex];
      saturday.splice(specificShiftIndex, 1)
    return specificShift;
    
}
function assignSaturday(array){
    array.push(saturdaySpecifier(), 8);
    
}

function assignShift(array){
    array.push(shiftTimeSpecifier(), 6);
    }
    
    
    
    function createDaySchedule(){
let e1 = [];
let e2 = [];
let e3 = [];
let e4 = [];
let = saturday [12, 20, 22];
    
    if(parseInt((i+2)/7) == parseFloat((i+2)/7)){
        
        e1.push(16, 7);
        e2.push(0, 0);
        e3.push(0, 0);
        e4.push(0, 0);
    }
    else if(parseInt((i+1)/7) == parseFloat((i+1)/7)){
        e1.push(0, 0);
        assignSaturday(e2);
        assignSaturday(e3);
        assignSaturday(e4);
        
    }
    else{
        
        assignShift(e1);
        assignShift(e2);
        assignShift(e3);
        assignShift(e4);
    }
    return [e1, e2, e3, e4]
  }
  
  for (i=0; i<31; i++){
      saturday = [18, 20, 22];
      omec = [openning, morning, evenning, closing];
  month.push(createDaySchedule());
  }

  
  let currentHours = -31;
  let p = currentHours;
  let po = currentHours;
  let poi = currentHours;

  let newMonth = month.map(num => {if (num[1][1] == 6 && num[1][0] > 15.5 && p<0){
      let randomInt = Math.floor(Math.random()*2);
      num[1][1] = num[1][1] + randomInt;
      p = p + 1;
      
  }
  
  if(num[0][1] == 6 && num[0][0] > 15.5 && po<0) {
      let randomInt = Math.floor(Math.random()*3);
      num[0][1] = num[0][1] + randomInt;
      po = po + 1;
  }
  
  if(num[2][1] == 6 && num[2][0] > 15.5 && po<0) {
      let randomInt = Math.floor(Math.random()*2);
      num[2][1] = num[2][1] + randomInt;
      po = po + 1;
  }
  
  if (num[3][1] == 6 && num[3][0] > 15.5 && poi<0){
      let randomInt = Math.floor(Math.random()*2);
      num[3][1] = num[3][1] + randomInt;
      poi = poi + 1;
  }
      return [ num[1][1], num[2][1], num[3][1] ];
      
  } );
  
  console.log(month);
  
  let e1Hours = month.reduce((x, y) => {
      x+=y[0][1];
      return x;}
      ,0)
      
      let e2Hours = month.reduce((x, y) =>{
          x+=y[1][1];
          return x;}
          ,0)
          
          let e3Hours = month.reduce((x, y) =>{
          x+=y[2][1];
          return x;}
          ,0
          )
          
          let e4Hours = month.reduce((x, y) =>{
          x+=y[3][1];
          return x;}
          ,0
          )
        
      
  
 console.log(e1Hours);
  
  console.log(e2Hours);
  
  console.log(e3Hours);
  
  console.log(e4Hours);
  
  
   month.forEach(innerArray => {
      
      let firstIndex = innerArray[0][0];  
  let secondIndex = innerArray[0][1];
      
      innerArray[0][1]= innerArray[0][0];
      innerArray[0][0] = firstIndex - secondIndex;
      
      
});

month.forEach(innerArray => {
      
      let firstIndex = innerArray[1][0];  
  let secondIndex = innerArray[1][1];
      
      innerArray[1][1]= firstIndex;
      innerArray[1][0] = firstIndex - secondIndex;
});

month.forEach(innerArray => {
      
      let firstIndex = innerArray[2][0];  
  let secondIndex = innerArray[2][1];
      
      innerArray[2][1]= innerArray[2][0];
      innerArray[2][0] = firstIndex - secondIndex;
});

month.forEach(innerArray => {
      
      let firstIndex = innerArray[3][0];  
  let secondIndex = innerArray[3][1];
      
      innerArray[3][1]= innerArray[3][0];
      innerArray[3][0] = firstIndex - secondIndex;
});

console.log(month);