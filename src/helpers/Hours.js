export const secondsToHour = (seconds) => {
  let date = new Date(seconds * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Check whether AM or PM
  let newformat = hours >= 12 ? "p. m." : "a. m.";

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours} : ${minutes} ${newformat}`;
};
