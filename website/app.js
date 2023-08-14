const apiKey = '8711a73e0bd293375e081aa132e263e6';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('journalForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const zipCode = document.getElementById('zipCode').value;
  const feelings = document.getElementById('feelings').value;

  getWeatherData(apiUrl, zipCode, apiKey)
    .then((weatherData) => {
      const data = {
        date: new Date().toLocaleDateString(),
        temp: weatherData.main.temp,
        content: feelings,
      };

      postData('/add_data', data)
        .then(updateUI)
        .catch((error) => console.error('Error:', error));
    })
    .catch((error) => console.error('Error:', error));
});

const getWeatherData = async (url, zipCode, apiKey) => {
  const response = await fetch(`${url}?zip=${zipCode}&units=metric&appid=${apiKey}`);
  return response.json();
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

const updateUI = async () => {
  const response = await fetch('/get_data');
  const data = await response.json();
  document.getElementById('date').innerHTML = data.date;
  document.getElementById('temp').innerHTML = `Temperature: ${data.temp} &#8451;`;
  document.getElementById('content').innerHTML = `Feeling: ${data.content}`;
};
