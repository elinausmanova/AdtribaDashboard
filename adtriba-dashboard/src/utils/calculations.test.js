var functions = require("./calculations");

const marketingData = [
  {
    date: "2022-06-07",
    source: "paidsearch_brand",
    attributed_conversions: 7.27575921075623,
    attributed_revenue: 801.696903584545,
    type: "baseline",
    spends: 714.92,
    partition_id: "932561105d21a54d3d1d2a941164ffec321cd76b",
    optimisation_target: "conversions",
  },
  {
    date: "2022-06-07",
    source: "paidsearch_dynamic_search_ads_prospecting",
    attributed_conversions: 2.45741217708547,
    attributed_revenue: 270.775829179152,
    type: "incrementality",
    spends: 112.07,
    partition_id: "932561105d21a54d3d1d2a941164ffec321cd76b",
    optimisation_target: "conversions",
  },
];

it("gets sum by parameter", () => {
  let sum = functions.totalPerParameter(
    ["paidsearch_brand", "paidsearch_dynamic_search_ads_prospecting"],
    "source",
    marketingData,
    "attributed_revenue"
  );
  expect(sum[0]).toBe(801.696903584545);
});
