export default function validate(
  destination,
  twoWayFlight,
  leaveFlightClass,
  returnFlightClass,
  leaveDay,
  leaveMonth,
  leaveYear,
  returnDay,
  returnMonth,
  returnYear,
  name,
  surname,
  age
) {
  if (destination === null) {
    return { valid: false, message: "Prosim izberi destinacijo" };
  }
  if (leaveFlightClass === null) {
    return { valid: false, message: "Prosimo izberite razred odhodnega leta" };
  }
  if (twoWayFlight && returnFlightClass === null) {
    return {
      valid: false,
      message: "Prosimo izberite razred vrnitvenega leta",
    };
  }
  let validDeparture = valiDate(leaveDay, leaveMonth, leaveYear);
  if (!validDeparture.valid) {
    validDeparture.message = validDeparture.message + " odhoda";
    return validDeparture;
  }
  if (twoWayFlight) {
    let validReturn = valiDate(returnDay, returnMonth, returnYear);
    if (!validReturn.valid) {
      validReturn.message = validReturn.message + " vrnitve";
      return validReturn;
    }
  }
  if (name === "") {
    return { valid: false, message: "Prosimo vnesite ime" };
  }
  if (surname === "") {
    return { valid: false, message: "Prosimo vnesite priimek" };
  }
  if (age == "") {
    return { valid: false, message: "Prosimo vnesite starost" };
  }
  return { valid: true };
}

export function valiDate(day, month, year) {
  if (day > 31 || day < 0 || day === null) {
    return { valid: false, message: "Nepravilen dan" };
  }
  if (month > 12 || month < 0 || month === null) {
    return { valid: false, message: "Nepravilen mesec" };
  }
  if (year < 2022 || year === null) {
    return { valid: false, message: "Nepravilno leto" };
  }
  return { valid: true };
}

export function validateCard(name, surname, cardNumber) {
  if (name === "") {
    return { valid: false, message: "Prosimo vnesite ime" };
  }
  if (surname === "") {
    return { valid: false, message: "Prosimo vnesite priimek" };
  }
  if (cardNumber.length < 16) {
    return { valid: false, message: "Nepravilna številka kartice" };
  }
  return { valid: true };
}
