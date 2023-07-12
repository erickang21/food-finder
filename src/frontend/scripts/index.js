function getAllFilters() {
  fetch("http://localhost:3000/reviews", {
    method: "GET"
  })
    .then((res) => {
      res = res.json();
    })
}

