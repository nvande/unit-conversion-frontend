export enum TemperatureUnit {
  Kelvin = "kelvin",
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
  Rankine = "rankine",
}

export enum VolumeUnit {
  Liters = "liters",
  Tablespoons = "tablespoons",
  CubicInches = "cubicInches",
  Cups = "cups",
  CubicFeet = "cubicFeet",
  Gallons = "gallons",
}

export type Unit = TemperatureUnit | VolumeUnit;
export type GradeStatus = "correct" | "incorrect" | "invalid" | "";
export type ResponseStatus = "success" | "error" | "";

export type Student = {
  name: string;
  rows: ConversionItem[];
};

export type ConversionItem = {
  inputValue: string;
  inputUnit: Unit;
  targetUnit: Unit;
  studentAnswer: string;
  correctAnswer: string;
  gradeStatus: GradeStatus;
  response: ResponseStatus;
};

export const unitOptions = {
  ...TemperatureUnit,
  ...VolumeUnit,
};
