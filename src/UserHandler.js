const destinations = [
  { label: "Pariz", value: "PA", price: 40 },
  { label: "Dunaj", value: "DU", price: 30 },
  { label: "Rim", value: "RM", price: 40 },
  { label: "Madrid", value: "MR", price: 60 },
  { label: "Helsinki", value: "HL", price: 70 },
  { label: "Los Angeles", value: "LA", price: 230 },
  { label: "Washington", value: "WA", price: 150 },
  { label: "Seattle", value: "ST", price: 260 },
  { label: "Rio de Janeiro", value: "RJ", price: 180 },
  { label: "Lima", value: "LI", price: 200 },
];

export default function handleUser(
  destination,
  firstName,
  lastName,
  price,
  leaveDay,
  leaveMonth,
  leaveYear,
  leaveFlightClass,
  returnDay,
  returnMonth,
  returnYear,
  returnFlightClass
) {
  leaveFlightClass = getFLightCLass(leaveFlightClass);
  returnFlightClass = getFLightCLass(returnFlightClass);
  return {
    destination: destinations.find((item) => item.value === destination).label,
    leaveFlightClass: leaveFlightClass,
    returnFlightClass: returnFlightClass,
    leaveDate: makeDate(leaveDay, leaveMonth, leaveYear),
    returnDate: makeDate(returnDay, returnMonth, returnYear),
    name: firstName,
    surname: lastName,
    price: price,
    key: Math.floor(Math.random() * 1000000000),
  };
}

function getFLightCLass(flightClass) {
  switch (flightClass) {
    case "1":
      return "prvi";
    case "2":
      return "poslovni";
    case "3":
      return "ekonomski";
    default:
      return null;
  }
}

function makeDate(day, month, year) {
  if (day === null || month === null || year === null) {
    return null;
  }
  return `${day}.${month}.${year}`;
}

export function calculatePrice(
  age,
  destination,
  leaveFlightClass,
  returnFlightClass,
  twoWayFlight
) {
  if (age < 2 || leaveFlightClass === null) {
    return 0;
  }
  let fligtPrice = destinations.find(
    (item) => item.value === destination
  ).price;
  let price = fligtPrice * (4 - leaveFlightClass);
  if (twoWayFlight && returnFlightClass !== null) {
    price = price + fligtPrice * (4 - returnFlightClass);
  }
  console.log(returnFlightClass);
  if (age < 12) {
    return price / 2;
  }
  return price;
}
