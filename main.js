// document.addEventListener("DOMContentLoaded", function () {
  
  // TMDB API로 영화 정보 가져와서 보여주기 --------------
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGNjMTllZDM3YmFkNmViYWQwYWVkOGJlZDhlNmIxMyIsInN1YiI6IjY0Nzg4ZmFjMGUyOWEyMDBmOTgwNjg4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vIOSlB_VDzqnPI6srMuAs8ua_E43mH0vLV5sJ2lt_Tw",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .then((data) => {
      // console.log(data);
      let result = data["results"];
      let row = document.querySelector(".row");

      result.forEach((a) => {
        let id = a["id"];
        let title = a["title"];
        let overview = a["overview"];
        let poster_path = "https://image.tmdb.org/t/p/w500" + a["poster_path"];
        let vote_average = a["vote_average"];

        row.innerHTML += `<div class="col" onclick="alert('movie id : '+${id})">

      <img src="${poster_path}" class="card-img" alt="..."/>
        <h4 class="card-title">${title}</h4>
        <p class="card-text">${overview}</p>
        <p class="card-rating">${vote_average}</p>
      </div>`;
      });
    });
  // .catch((err) => console.error(err));
// });


// 검색 기능 -----------------------------------

//  인풋에 값 넣고 엔터 치면 search() 실행
function enterkey() {
  if (event.keyCode == 13) {
    // 검색창 인풋에 엔터를 쳐야 아래 search() 함수가 실행되도록 함.
    search();
  }
}

// 검색 기능 실행하는 함수
function search() {
  // 인풋에 값이 없으면 알림창 보여줌.
  let input_val = document.querySelector(".search_text").value;
  if (input_val === "") {
    alert("한 글자 이상 입력해 주세요.");
  } else { // 값이 있으면 인풋값과 영화제목들의 포함여부 확인 후 인풋값 ⊂ 영화제목 이면 놔두고 아닐경우 안보이게 함.
      let rows = document.querySelector(".row");
      let divs = rows.getElementsByTagName("div");
      for (i = 0; i < divs.length; i++) {
        let searchtitle = divs[i].querySelector(".card-title").textContent.toUpperCase();
        let searchinput = input_val.toUpperCase();
        if (searchtitle.includes(searchinput) === false) {
          divs[i].style.display = "none";
        }
      };
  };
};

