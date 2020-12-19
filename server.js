const dbConfig = require('./config/db.config')


const db = require("./models");
const Flight = require('./models/flight.model');
const Terminal = require('./models/terminal.model')
const Airport = db.airport;

// db connection
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

const airport = new Airport({
	name: "First Airport",
	country: "US",
	opened: "2020-12-15"
})

airport.save()
console.log("Airport saved", airport)
// Lets Make and Save our first airport

// A flight from CDG France to JFK New-York, USA on American Airlines with no passengers. The name of the flight is "flight1"
const flight1 = new Flight({
  from: "CDG",
  to: "JFK",
  airline: "American Airlines"
})

flight1.save()
console.log("flight1 saved", flight1)

// A second flight from Heathrow UK to JFK New-York, USA on British Airways with no passengers. The name of the flight is "flight2"
const flight2 = new Flight({
  from: "LHR",
  to: "JFK",
  airline: "British Airways"
})

flight2.save()
console.log("flight2 saved", flight2)

// An airport called "JFK" in the USA opened on a random date in 1990.
const airportJFK = new Airport({
  name: "JFK",
  country: "USA",
  terminals: [],
  opened: "1990-07-01"
})

airportJFK.save()
console.log("JFK airport saved", airportJFK)

// A terminal called "Terminal 1" pushed to airport1 with a capacity of 234324 and two flights: flight1 and flight2
const terminal = new Terminal({
  name: "Terminal 1",
  flights: [flight1, flight2],
  capacity: 234324
})

terminal.save()
// pushing this terminal to airport 1
airport.terminals.push(terminal)
console.log("terminal 1 saved", terminal)

// testing to see if terminal 1 now shows up in the array in airport 1 -- it does!
console.log("airport 1 now shows the terminal 1:", airport)
