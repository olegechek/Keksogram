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




// Функция создания массива случайных чисел - чтобы при этом они не повторялись в массиве

const getRandomDigitArray = (minNumber = 1, maxNumber = 100) => {
  const noRandomArray = [];
  const randomArray = [];
  const difference = maxNumber - minNumber;

  for (let i = 0; i < (difference + 1); i++) {
    noRandomArray.push(i + 1)
  }

  for (let j = 0; j < (difference + 1); j++) {
    let randomPosition = getRandomDigit(0, noRandomArray.length - 1);
    randomArray.push(noRandomArray[randomPosition]);
    noRandomArray.splice(randomPosition, 1);
  }

  return randomArray;
}



// Функция проверки максимальной длины строки

const checkStringLength = (stringGiven, lengthGiven) => {
  return (stringGiven.length <= lengthGiven) ? true : false;
}

checkStringLength('Ура Ура Ура', 10);


export {getRandomDigit, getRandomDigitArray}
