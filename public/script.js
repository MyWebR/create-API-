document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const dataInput = document.getElementById("dataInput").value;

    fetch("http://localhost:3000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataInput }),
    })
      .then((response) => response.json())
      .then((result) => {
        document.getElementById(
          "output"
        ).innerHTML = `Data berhasil disimpan! API Key: ${result.apiKey} <br> Link: <a href="${result.link}" target="_blank">${result.link}</a>`;
      })
      .catch((error) => {
        document.getElementById("output").innerHTML =
          "Terjadi kesalahan saat menyimpan data.";
        console.error("Error:", error);
      });
  });
