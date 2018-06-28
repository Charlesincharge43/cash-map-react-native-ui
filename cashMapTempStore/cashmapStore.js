export const allCreditCards = {
  "DISCOVER_IT_CASH_BACK": {
    "restaurant": 5, "default": 1
  },
  "CHASE_FREEDOM": {
    //pharmacy => only walgreens..
    "gas_station": 5, "pharmacy": 5, "default": 1
  },
  "BANK_OF_AMERICA_CASH_REWARDS": {
    //department_store: need to get to wholesale...
    "gas_station": 3, "supermarket": 2, "department_store": 2, "default": 1
  },
  "CITI_DOUBLE_CASH_CARD": {
    "default": 2
  },
  "BARCLAY_UBER_VISA_CARD": {
    "restaurant": 4, "lodging": 3, "default": 1
  },
  "US_BANK_CASH_PLUS": {
    //list of all.. user preference saves exact choices
    "clothing_store": 5, "electronics_store": 5, "car_rental": 5, "gym": 5, "furniture_store": 5, "movie_theater": 5, "department_store": 5, "gas_station": 2, "restaurant": 2, "supermarket": 2, "default": 1
  },
  "AMERICAN_EXPRESS_BLUE_CASH_PREFERRED": {
    "supermarket": 6, "gas_station": 3, "department_store": 3, "default": 1
  }
};

// // The function `invertCCHash` below inverts the ccHash into a category hash.. like so:
// const exampleCategoryHash = {
//   restaurant: {
//     DISCOVER_IT_CASH_BACK: 5,
//     BARCLAY_UBER_VISA_CARD: 1,
//     cardsSorted: [
//       {
//         card: 'DISCOVER_IT_CASH_BACK',
//         reward: 5
//       },
//       {
//         card: 'BARCLAY_UBER_VISA_CARD',
//         reward: 1
//       }],
//   },
//   lodging: {
//     US_BANK_CASH_PLUS: 3,
//     DISCOVER_IT_CASH_BACK: 4,
//     cardsSorted: [
//       {
//         card: 'DISCOVER_IT_CASH_BACK',
//         reward: 4
//       },
//       {
//         card: 'US_BANK_CASH_PLUS',
//         reward: 3
//       }],
//   },
// }

export const invertCCHash = (ccHash) => {
  const newCategoriesHash = Object.keys(ccHash)
    .reduce((newCategoriesHash, currCCKey) => {
      const currCCObj = ccHash[currCCKey];
      // console.log('current cc : ', currCCObj)
      const ccSpecificCategories = Object.keys(currCCObj);
      // console.log('ccSpecificCategories', ccSpecificCategories)
      ccSpecificCategories.forEach(category => {
        const rewardValue = currCCObj[category];
        // console.log('currCCObj: ', currCCObj)
        // console.log('category: ', category)
        // console.log('rewardValue : ', rewardValue)
        if (!newCategoriesHash[category]) {
          newCategoriesHash[category] = { [currCCKey]: rewardValue };
        } else {
          newCategoriesHash[category][currCCKey] = rewardValue
        }
        const newCardsArrayElement = {
          card: currCCKey,
          reward: rewardValue
        };
        newCategoriesHash[category].cards = !newCategoriesHash[category].cards ? [newCardsArrayElement] : newCategoriesHash[category].cards.concat(newCardsArrayElement);
      })
      return newCategoriesHash;
    }, {})
  Object.keys(newCategoriesHash).forEach(newCategoryKey => {
    newCategoriesHash[newCategoryKey].cards.sort((a, b) => (b.reward - a.reward))
  })
  return newCategoriesHash;
}

invertCCHash(allCreditCards)