const apiURI = 'http://localhost:8080';
let id; // clientId

async function clientTransformRoman(id, arabicNumeral) {
    if (id == null) return;

    return fetch(`${apiURI}/roman?id=${id}`, {
        method: 'POST',
        body: JSON.stringify({'arabicNumeral': arabicNumeral}),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json()).catch(function(error) {
        console.log('Error converting int to roman numeral:', error);
        return null;
    });
}

async function clientEventId() {
    return fetch(`${apiURI}/events/id`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json()).catch(function(error) {
        console.log('Error getting client eventId:', error);
        return null;
    });
}

function intToRoman() {
    new Promise(async (resolve,reject) => {
        if (id == null) {
            id = await clientEventId();

            if (id != null) {
                const events = new EventSource(`${apiURI}/events/subscribe?id=${id}`);

                events.onmessage = (event) => {
                    const romanNumeral = JSON.parse(event.data)?.result;
                    document.getElementById('romanNumeral').textContent = romanNumeral != null ? romanNumeral : '';
                }
            }
        }

        resolve(id);
    }).then((clientId) => {
        // Async encaspulation to have a client ID at first call
        const arabicNumeral = parseInt(document.getElementById('arabicNumeral').value,10);
        clientTransformRoman(clientId, arabicNumeral);
    });
};

