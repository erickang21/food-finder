function getAllFilters() {
  fetch("http://localhost:3000/reviews", {
    method: "GET"
  })
    .then((res) => {
      res = res.json()
        .then((data) => {
          const filters = [];
          for (const review of data) {
            for (const tag of review.tags) {
              if (!filters.includes(tag)) filters.push(tag);
            }
          }
          return filters;
        })

    })
}

function getReviewsHTML() {
  console.log("triggered")
  fetch("http://localhost:3000/reviews", {
    method: "GET"
  })
    .then((res) => {
      res = res.json()
        .then((reviews) => {
          for (const review of reviews) {
            document.getElementById("homepage-reviews-section-list").innerHTML += `
      <li class="card">
        <h3>${review.name}</h3>
        <h6><b>Location:</b> ${review.city}</h6>
        <h6><b>Rating:</b> ${review.overallRating}</h6>
        <h6><b>Tags:</b> ${review.tags.join(", ")}</h6>
      </li>
      `
          }
        })
    })
}