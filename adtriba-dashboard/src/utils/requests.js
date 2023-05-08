const fetch = require("node-fetch");

async function getData(url) {
  let response = await fetch(url, {
    headers: {
      "x-api-key": "woope1Pei5zieg",
    },
  });

  if (response.ok) {
    let json = await response.json();
    console.log(json);
    return json;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

async function getPartitions(url) {
  let response = await fetch(url, {
    headers: {
      "x-api-key": "woope1Pei5zieg",
    },
  });

  if (response.ok) {
    let json = await response.json();
    console.log(json);
    return json;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

exports.getData = getData;
exports.getPartitions = getPartitions;
