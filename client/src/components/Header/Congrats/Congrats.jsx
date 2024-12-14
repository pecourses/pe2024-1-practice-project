import { subDays, addDays } from 'date-fns';

const isSameDay = (day1, day2) =>
  day1.getDate() === day2.getDate() && day1.getMonth() === day2.getMonth();

function Congrats ({ birthday: birthdaySating }) {
  if (!birthdaySating) {
    return;
  }

  const today = new Date();
  const yesterday = subDays(today, 1);
  const tomorrow = addDays(today, 1);
  const birthday = new Date(birthdaySating);

  const isBirthdayToday =
    isSameDay(yesterday, birthday) ||
    isSameDay(today, birthday) ||
    isSameDay(tomorrow, birthday);

  return <>{isBirthdayToday && <div>Happy birthday!</div>}</>;
}

export default Congrats;
