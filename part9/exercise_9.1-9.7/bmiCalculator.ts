const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal range";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (!height || !weight) {
  console.error("Please provide valid height and weight as arguments.");
  process.exit(1);
}

console.log(calculateBmi(height, weight));
