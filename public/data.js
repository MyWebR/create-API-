document.addEventListener('DOMContentLoaded', () => {
     fetch('/api/all-data')
       .then(response => response.json())
       .then(data => {
         const dataList = document.getElementById('data-list');
   
         Object.keys(data).forEach(apiKey => {
           const listItem = document.createElement('li');
           listItem.textContent = `Data ${apiKey}`;
           listItem.onclick = () => {
             window.location.href = `/api/data/${apiKey}`;
           };
           dataList.appendChild(listItem);
         });
       })
       .catch(err => console.error('Gagal memuat data:', err));
   });
   