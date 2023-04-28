export async function getData(url) {
    let response = await fetch(url, {
        headers: {
          'x-api-key': 'woope1Pei5zieg'
        }
        });

    if (response.ok) { 
        let json = await response.json();
        console.log(json);
        return json;
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

export async function getPartitions(url) {
    let response = await fetch(url, {
        headers: {
          'x-api-key': 'woope1Pei5zieg'
        }
        });

    if (response.ok) { 
        let json = await response.json();
        console.log(json);
        return json;
    } else {
        alert("HTTP-Error: " + response.status);
    }
}