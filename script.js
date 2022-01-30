
  document.getElementById("home_button").addEventListener("click", function () {
    window.location.href = "index.html";
  });
  var rate;
  document.getElementById("body").addEventListener("click", () => {
    document.getElementById("movies").style.display = "none";
  });
  document.getElementById("header").addEventListener("click", () => {
    document.getElementById("movies").style.display = "none";
  });
  //latest movies
  let url =
    "https://api.themoviedb.org/3/trending/all/day?api_key=0428f85dd67dc860d3482a85d609fda5";
  let data;

  async function getdata() {
    try {
      let res = await fetch(url);
      data = await res.json();
      console.log(data);
      displaydata(data);
    } catch (err) {
      console.log(err);
    }
  }
  getdata();
  let displaydata = (data) => {
    data.results.forEach((element) => {
      let div = document.createElement("div");
      let name = element.original_title || element.original_name;
      div.addEventListener("click", function () {
        single_movie(name);
      });
      let p = document.createElement("p");
      p.innerHTML = element.original_title || element.original_name;
      let img = document.createElement("img");
      img.style.width = "100%";
      img.src = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
      div.append(p, img);
      document.getElementById("body").append(div);
    });
  };
  let timerId;
  function get_movie() {
    document.getElementById("movies").style.display = "none";
    document.getElementById("trend_head").style.display = "none";

    document.getElementById("body").style.display = "grid";

    var search = document.getElementById("key_word").value;
    let url = `https://omdbapi.com/?s=${search}&apikey=8d18db36`;
    //async function
    async function getdata() {
      try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        displaymovie(data);
      } catch (err) {
        console.log(err);
      }
    }

    getdata();
  }
  function displaymovie(ele) {
    //second async function
    async function getdata2(url2) {
      try {
        let res1 = await fetch(url2);
        let data2 = await res1.json();
        if (data2.Response === "False") {
          return 0;
        }
        console.log("data2:", data2);
        r = displayrating(data2);
        return r;
      } catch (err) {
        console.log(err);
      }
    }
    if (ele.Response === "True") {
      document.getElementById("body").innerHTML = "";
      ele.Search.forEach((element) => {
        //url2 for second fetching
        let url2 = `https://omdbapi.com/?t=${element.Title}&apikey=8d18db36`;
        //diverted
        getdata2(url2).then(function (data) {
          let div1 = document.createElement("div");
          div1.setAttribute("class", "res_names");
          let div2 = document.createElement("div");
          div2.class = "box2";
          let title = document.createElement("p");
          title.innerHTML = `Title : ${element.Title}`;
          let rating = document.createElement("p");
          rating.innerHTML = `Rating: ${data}`;
          let most = "";
          if (data >= 8) {
            most = document.createElement("p");
            most.innerHTML = "Most Recommeded";
            most.style.color = "white";
            most.style.backgroundColor = "green";
          }

          let year = document.createElement("p");
          year.innerHTML = `Year : ${element.Year}`;

          div1.append(most, title, year, rating);
          let img = document.createElement("img");
          img.src = element.Poster;
          div2.append(img);
          let div3 = document.createElement("div");
          div3.addEventListener("click", () => {
            document.getElementById("trend_head").innerHTML = "";
            single_movie(element.Title);
          });
          div3.append(div1, div2);
          document.getElementById("body").append(div3);
          // console.log(data + "rating");
        });
      });
    }
    if (ele.Response === "False") {
      document.getElementById("body").innerHTML = "";
      let img = document.createElement("img");
      img.src =
        "https://www.vizion.com/wp-content/uploads/2018/09/shutterstock_479042983-636x344.jpg";
      document.getElementById("body").append(img);
    }
  }

  function displayrating(data2) {
    if (data2.Ratings.length > 0) {
      let rate = data2.Ratings[0].Value;
      rate = +rate.split("").slice(0, 3).join("");
      return rate;
    } else {
      return 0;
    }
  }

  //for search results
  async function get_movie2() {
    try {
      let movie = document.getElementById("key_word").value;
      if (movie.length < 2) {
        return false;
      }
      let res = await fetch(`https://omdbapi.com/?apikey=8d18db36&s=${movie}`);
      let data = await res.json();
      console.log(data);
      let movies = data.Search;
      appendmovie(movies);
    } catch (err) {
      console.log(err);
    }
  }
  function appendmovie(m) {
    document.getElementById("movies").innerHTML = null;
    if (m === undefined) {
      return false;
    } else {
      m.forEach(function (element) {
        let p = document.createElement("p");
        p.addEventListener("click", () => {
          document.getElementById("trend_head").innerHTML = "";
          single_movie(element.Title);
        });
        p.innerHTML = element.Title;
        document.getElementById("movies").append(p);
      });
    }
  }
  //appending single movie
  let single_movie = (name) => {
    document.getElementById("movies").style.display = "none";

    document.getElementById("body").innerHTML = "";

    let url2 = `https://omdbapi.com/?t=${name}&apikey=8d18db36`;
    async function getdata3() {
      try {
        let res = await fetch(url2);
        let data = await res.json();
        console.log(data);
        displaymovie2(data);
      } catch (err) {
        console.log(err);
      }
    }
    getdata3();
    let displaymovie2 = (data) => {
      document.getElementById("body").innerHTML = "";
      let div1 = document.createElement("div");
      div1.setAttribute("class", "deatil_box");
      let div2 = document.createElement("div");
      div2.class = "deatil_box";
      let title = document.createElement("p");
      title.innerHTML = `Title : ${data.Title}`;
      let actor = document.createElement("p");
      actor.innerHTML = `Starring : ${data.Actors}`;
      let director = document.createElement("p");
      director.innerHTML = `Director : ${data.Director}`;
      let certf = document.createElement("p");
      certf.innerHTML = `Rated : ${data.Rated}`;
      let date = document.createElement("p");
      date.innerHTML = `Released: ${data.Released}`;
      let runtime = document.createElement("p");
      runtime.innerHTML = `Runtime : ${data.Runtime}`;
      let rating = document.createElement("p");
      rating.innerHTML = `IMDB rating : ${data.imdbRating}`;

      let most = "";
      if (+data.imdbRating >= 8) {
        most = document.createElement("p");
        most.innerHTML = "Most Recommeded";
        most.style.color = "white";
        most.style.backgroundColor = "green";
      }

      div2.append(most, title, date, runtime, rating, certf, actor, director);
      let img = document.createElement("img");
      img.src = data.Poster;
      div1.append(img);

      document.getElementById("body").append(div1, div2);
      document.getElementById("body").style.display = "flex";
    };
  };
  //debounce function
  function debounce(fun) {
    if (timerId) {
      clearTimeout(timerId);
    }

    // Schedule a setTimeout after delay seconds

    timerId = setTimeout(function () {
      fun();
      document.getElementById("movies").style.display = "block";
    }, 1000);
  }