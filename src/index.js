import express from "express";
const app = express();
import cors from "cors";

const port = 4000;

app.use(cors());


let openingHours = [
  {
    day: "MONDAY",
    hours: [
      { from: "8:30", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
  },
  {
    day: "TUESDAY",
    hours: [
      { from: "8:30", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
  },
  {
    day: "WEDNESDAY",
    hours: [{ from: "8:30", to: "12:00" }],
  },
  {
    day: "THURSDAY",
    hours: [
      { from: "8:30", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
  },
  {
    day: "FRIDAY",
    hours: [
      { from: "8:30", to: "12:00" },
      { from: "14:00", to: "17:00" },
    ],
  },
  {
    day: "SATURDAY",
    hours: [{ from: "8:30", to: "13:00" }],
  },
  {
    day: "SUNDAY",
    hours: [],
  },
 ];
  


// ################################################################ Exercice 1

const wait = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('le truck');
  }, 5000);
});

wait.then((value) => {
  console.log(value);
 
});


// ############################################################################## Exercice 2
 
app.get('/openingHoursWithDelay', function(req, res) {
 

  res.setTimeout(2000, function(){
    res.send(openingHours);
  });
});


// ############################################################################## Exercice 3 


const addHours = ({from, to, days}) => {

  const openingHours2 = openingHours.map(item => {
      if (days.includes(item.day)) {
          return {
            ...item,
            hours : [
                      ...item.hours,
                      {from, to}
            ]
          }
      }
      return item
  })
  openingHours = openingHours2
  return openingHours
}



app.get('/addHours2', function(req, res){

  let reponse = addHours(JSON.parse(req.query.param))

  res.setTimeout(2000, function(){
    res.send(reponse);
  });
  
  

})




// ############################################################################## Exercice 5

const deleteHours = ({from, to, day}) => {

  const openingHours2 = openingHours.map(item => {
      if(item.day == day) {
        const newHours = item.hours.filter(hour => {
          if(hour.from != from && hour.to != to) {
            return hour
          }
        })
        return {
          ...item,
          hours : newHours
        }
      }
      return item
  })
  openingHours = openingHours2
  return openingHours
}


app.get('/deleteHours', function(req, res){

  // console.log(req.query.param)
  let reponse = deleteHours(JSON.parse(req.query.param))

  res.setTimeout(2000, function(){
    res.send(reponse);
  });

})


// ##############################################################################

app.listen(port, () => {
 console.log(`api listening at http://localhost:${port}`);
});
