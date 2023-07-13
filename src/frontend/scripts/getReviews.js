
document.addEventListener('DOMContentLoaded', function () {
  fetch("http://localhost:3000/reviews", {
    method: "GET"
  })
    .then((res) => {
      res = res.json()
        .then((reviews) => {
          const filters = [];
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
          return filters;
        })
      
    })
});

