function totalPerParameter(parameter, parameterKey, data, key) {
  // filter by the parameter and then calculate sum
  let total = parameter.map((p) =>
    data
      .filter((a) => a[parameterKey] === p)
      .reduce((partialSum, a) => partialSum + a[key], 0)
  );
  return total;
}

function averagePerSource(sources, days, data, key) {
  let parameterArrayPerSource = sources.map((source) =>
    data.filter((a) => a.source === source)
  );
  console.log("parameterArrayPerSource is ", parameterArrayPerSource);
  let sum = parameterArrayPerSource.map((data) =>
    data.reduce((partialSum, a) => partialSum + a[key], 0)
  );
  console.log("this is sum from average ", sum);
  let average = sum.map((sumPerSource) => sumPerSource / days);
  return average;
}

function getVariantList(data, key) {
  // collect all dates and then use Set to make them unique
  let variants = [...new Set(data.map((a) => a[key]))];
  return variants;
}

function getVariantListByType(data, key) {
  // collect all dates and then use Set to make them unique
  let incrementalityTypeSourceList = [];
  let baselineTypeSourceList = [];
  data.forEach((a) => {
    if (
      !incrementalityTypeSourceList.includes(a[key]) &&
      !baselineTypeSourceList.includes(a[key])
    ) {
      a.type === "incrementality"
        ? incrementalityTypeSourceList.push(a[key])
        : baselineTypeSourceList.push(a[key]);
    }
  });
  console.log(incrementalityTypeSourceList);
  return {
    incrementality: incrementalityTypeSourceList,
    baseline: baselineTypeSourceList,
  };
}

exports.totalPerParameter = totalPerParameter;
exports.averagePerSource = averagePerSource;
exports.getVariantList = getVariantList;
exports.getVariantListByType = getVariantListByType;
