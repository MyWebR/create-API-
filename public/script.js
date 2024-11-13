document.getElementById("dataForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Mengambil nilai dari input
  const nameInput = document.getElementById("nameInput").value;
  const addressInput = document.getElementById("addressInput").value;
  const ageInput = document.getElementById("ageInput").value;
  const heightInput = document.getElementById("heightInput").value;
  const weightInput = document.getElementById("weightInput").value;

  // Mengirim data ke server
  fetch("http://localhost:3000/api/submit", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          nama: nameInput,
          alamat: addressInput,
          umur: ageInput,
          tinggiBadan: heightInput,
          beratBadan: weightInput
      }),
  })
  .then((response) => response.json())
  .then((result) => {
      document.getElementById("output").innerHTML = `Data berhasil disimpan! </br> API Key: ${result.apiKey} <br> Link: <a href="${result.link}" target="_blank">${result.link}</a>`;
  })
  .catch((error) => {
      document.getElementById("output").innerHTML = "Terjadi kesalahan saat menyimpan data.";
      console.error("Error:", error);
  });
});