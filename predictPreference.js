const { recommend } = require("./recommendation-model/recommend");

async function predict(preference, foodNumberList, userNumber) {
  try {
    let predicted_preference = await recommend(preference, userNumber);

    predicted_preference = predicted_preference.map((item, index) => ({
      food_no: foodNumberList[index],
      predicted_preference: item
    }));

    return predicted_preference;
  } catch (err) {
    console.error(err);
    // 에러 처리를 나중에 해야됩니다.
  }
}

async function predictAllFood(preference, userNumber) {
  let predicted_preference = await recommend(preference, userNumber);
  predicted_preference = predicted_preference.map((item, index) => ({
    food_no: index,
    predicted_preference: item,
  }));
  return predicted_preference;
}

module.exports.predictPreference = predict;
module.exports.predictAllFoodPreference = predictAllFood;
