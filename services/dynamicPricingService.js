
    import moment from 'moment';

    export const calculatePrice = (basePrice, demandFactor) => {
      const currentHour = moment().hour();
      let surgeMultiplier = 1;

      // Apply surge pricing during peak hours (e.g., 6 PM to 10 PM)
      if (currentHour >= 18 && currentHour <= 22) {
        surgeMultiplier = 1.5;
      }

      return basePrice * surgeMultiplier * demandFactor;
    };
    