const validateRules = {
  string: {
    required(errorMessage = "required field") {
      return (value: string) => {
        return !!value || errorMessage;
      };
    },
    min(minValue: number, errorMessage = `field must more then ${ minValue }`) {
      return (value: string) => {
        return value.length >= minValue || errorMessage;
      };
    },
    max(maxValue: number, errorMessage = `field must less then ${ maxValue }`) {
      return (value: string) => {
        return value.length <= maxValue || errorMessage;
      };
    }
  },
  number: {
    required(errorMessage = "required field") {
      return (value: string) => {
        return Number(value) !== 0 || errorMessage;
      };
    },
    min(minValue: number, errorMessage = `field must more then ${ minValue }`) {
      return (value: string) => {
        return Number(value) >= minValue || errorMessage;
      };
    },
    max(maxValue: number, errorMessage = `field must less then ${ maxValue }`) {
      return (value: string) => {
        return Number(value) <= maxValue || errorMessage;
      };
    },
    equal(equalValue: number, errorMessage = `field must equal ${ equalValue }`) {
      return (value: string) => {
        return Number(value) === equalValue || errorMessage;
      };
    }
  },
}



export default validateRules;
