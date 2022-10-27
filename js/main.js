
// Функция случайного числа

const getRandomDigit = (minValue, maxValue) => {

  if (minValue < 0 || maxValue < 0) {
    return -1;
  }

  let difference = maxValue - minValue;

  if (difference < 0) {
    difference *= -1;
    minValue = maxValue;
  }

  let randomForDifference = Math.ceil(Math.random() * (difference + 1)) - 1;

  return (minValue + randomForDifference);
}

getRandomDigit(1, 5);



// Функция проверки максимальной длины строки

const checkStringLength = (stringGiven, lengthGiven) => {
  return (stringGiven.length <= lengthGiven) ? true : false;
}

checkStringLength('Ура Ура Ура', 10);




