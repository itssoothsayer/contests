document.getElementById('searchInput').addEventListener('input', function() {
    filterData(this.value);
});


async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderTable(data);
        return data; 
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null; 
    }
}
function renderTable(data) {
    const tableBody = document.getElementById('cryptoTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 
    data.forEach(coin => {
        let row = tableBody.insertRow();
        let imgCell = row.insertCell(0);
        let img = document.createElement('img');
        img.src = coin.image;
        img.style.width = '50px';
        imgCell.appendChild(img);

        row.insertCell(1).textContent = coin.name;
        row.insertCell(2).textContent = coin.symbol.toUpperCase();
        row.insertCell(3).textContent = `$${coin.current_price}`;
        row.insertCell(4).textContent = coin.total_volume.toLocaleString();
        let changeCell = row.insertCell(5);
        changeCell.textContent = coin.price_change_percentage_24h + '%';
        if (coin.price_change_percentage_24h < 0) {
            changeCell.style.color = 'red';
        } else if (coin.price_change_percentage_24h > 0) {
            changeCell.style.color = 'green';
        } else {
            changeCell.style.color = 'white'; 
        }
        row.insertCell(6).textContent = `Mkt Cap: ${coin.market_cap}`;
        
       
    });
}

function filterData(searchTerm) {
    fetchData().then(data => {
        let filteredData;
        if (searchTerm.trim() === "") {
            filteredData = data;
            console.log("filtered", filterData)
        } else {
            filteredData = data.filter(coin => 
                coin.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        renderTable(filteredData);
    });
}


function sortMarketCap() {
    console.log("clicked");
    fetchData().then(data => {
        console.log("DATA IS AS FOLLOWING ...", data)
        if (data && Array.isArray(data)) {
            data.sort((a, b) => a.market_cap - b.market_cap);
            renderTable(data);
        } else {
            console.error('Data is not an array:', data);
        }
    }).catch(error => {
        console.error('Failed to fetch or sort data:', error);
    });
}

function sortPercentageChange() {
    fetchData().then(data => {
        data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        renderTable(data);
    });
}

fetchData();