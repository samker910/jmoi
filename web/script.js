const apiURI = 'http://localhost:8080';

async function clientTransformRoman(arabicNumeral) {
    return fetch(`${apiURI}/roman`, {
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

function intToRoman() {
    const arabicNumeral = parseInt(document.getElementById('arabicNumeral').value,10);
    clientTransformRoman(arabicNumeral).then(romanNumeral => {
        document.getElementById('romanNumeral').textContent = romanNumeral != null ? romanNumeral : '';
    });
}

