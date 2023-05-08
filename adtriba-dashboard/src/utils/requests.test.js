var functions = require("./requests");
// const fetch = require("node-fetch");

// jest.mock("fetch");

const partitionData = [
  {
    id: "932561105d21a54d3d1d2a941164ffec321cd76b",
    brand: "MyBrand",
    country: "DE",
  },
];

const marketingData = [
  {
    date: "2022-06-01",
    source: "Display Prospecting",
    attributed_conversions: "20.12",
    attributed_revenue: "410.24",
    type: "incrementality",
    spends: "68.25",
    partition_id: "932561105d21a54d3d1d2a941164ffec321cd76b",
    optimisation_target: "conversions",
  },
];

it("gets partition data", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: partitionData }),
    })
  );

  expect.assertions(1);
  const data = await functions.getPartitions(
    "https://demo-api.adtriba.app/v1/api/partitions"
  );
  expect(data[0].id).toBe("932561105d21a54d3d1d2a941164ffec321cd76b");
});

it("gets marketing data", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: marketingData }),
    })
  );

  expect.assertions(1);
  const data = await functions.getData(
    "https://demo-api.adtriba.app/v1/api/partitions/932561105d21a54d3d1d2a941164ffec321cd76b/data"
  );
  expect(data[0].date).toBe("2022-06-01");
});
