function clearFields() {
  document.getElementById("upload-name").value = "";
  document.getElementById("upload-city").value = "";
  document.getElementById("upload-meal").value = "";
  document.getElementById("upload-type").value = "";
  document.getElementById("upload-price").value = "";
  document.getElementById("upload-tags").value = "";
  document.getElementById("upload-description").value = "";
  document.getElementById("upload-overall-rating").value = "";
  document.getElementById("upload-overall-rating-description").value = "";
  document.getElementById("upload-food-rating").value = "";
  document.getElementById("upload-food-rating-description").value = "";
  document.getElementById("upload-affordability-rating").value = "";
  document.getElementById("upload-affordability-rating-description").value = "";
  document.getElementById("upload-service-rating").value = "";
  document.getElementById("upload-service-rating-description").value = "";
  document.getElementById("upload-atmosphere-rating").value = "";
  document.getElementById("upload-atmosphere-rating-description").value = "";
}

function upload() {
  const newData = {
    name: document.getElementById("upload-name").value,
    address: document.getElementById("upload-address").value,
    mapsLink: document.getElementById("upload-maps-link").value,
    city: document.getElementById("upload-city").value,
    meal: document.getElementById("upload-meal").value,
    type: document.getElementById("upload-type").value,
    price: document.getElementById("upload-price").value,
    tags: document.getElementById("upload-tags").value,
    description: document.getElementById("upload-description").value,
    overallRating: document.getElementById("upload-overall-rating").value,
    overallRatingDescription: document.getElementById("upload-overall-rating-description").value,
    foodRating: document.getElementById("upload-food-rating").value,
    foodRatingDescription: document.getElementById("upload-food-rating-description").value,
    affordabilityRating: document.getElementById("upload-affordability-rating").value,
    affordabilityRatingDescription: document.getElementById("upload-affordability-rating-description").value,
    serviceRating: document.getElementById("upload-service-rating").value,
    serviceRatingDescription: document.getElementById("upload-service-rating-description").value,
    atmosphereRating: document.getElementById("upload-atmosphere-rating").value,
    atmosphereRatingDescription: document.getElementById("upload-atmosphere-rating-description").value,
    createdAt: Date.now()
  }

  fetch("http://localhost:3000/upload", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
    .then((res) => {
      if (res.status == 200) { // success, redirect to home page
        $("#myModal").modal("show");
        clearFields();
      } else { // failure, pop-up an error message

      }
    })
}

function cancel() {
  $("#confirmclose").modal("show");
}