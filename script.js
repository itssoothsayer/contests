document.getElementById('lookupButton').addEventListener('click', lookupPincode);
document.getElementById('filterInput').addEventListener('input', filterResults);

function lookupPincode() {
  const pincode = document.getElementById('pincodeInput').value.trim();
  const resultContainer = document.getElementById('result');
  const errorContainer = document.getElementById('error');
  const loader = document.getElementById('loader');
  const filterContainer = document.getElementById('filterContainer');

  if (pincode.length !== 6) {
    errorContainer.textContent = 'Pincode must be 6 digits.';
    resultContainer.innerHTML = '';
    filterContainer.style.display = 'none';
    return;
  }

  loader.style.display = 'block';
  errorContainer.textContent = '';
  resultContainer.innerHTML = '';
  filterContainer.style.display = 'none';

  fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';
      if (data[0].Status === 'Error') {
        errorContainer.textContent = 'No data found for this pincode.';
        return;
      }
      displayResults(data[0].PostOffice);
      filterContainer.style.display = 'block';
    })
    .catch(() => {
      loader.style.display = 'none';
      errorContainer.textContent = 'Error fetching data.';
    });
}

function displayResults(postOffices) {
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = postOffices.map(postOffice => `
    <div class="result-item">
      <p><strong>Post Office Name:</strong> ${postOffice.Name}</p>
      <p><strong>Pincode:</strong> ${postOffice.Pincode}</p>
      <p><strong>District:</strong> ${postOffice.District}</p>
      <p><strong>State:</strong> ${postOffice.State}</p>
    </div>
  `).join('');
}

function filterResults() {
  const filter = document.getElementById('filterInput').value.toLowerCase();
  const resultItems = document.querySelectorAll('.result-item');

  resultItems.forEach(item => {
    const postOfficeName = item.querySelector('p').textContent.toLowerCase();
    if (postOfficeName.includes(filter)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });

  const visibleItems = Array.from(resultItems).filter(item => item.style.display !== 'none');
  if (visibleItems.length === 0) {
    document.getElementById('result').innerHTML = '<p>Couldn’t find the postal data you’re looking for...</p>';
  }
}
