'use strict'
window.addEventListener('load',() => {
  const showRank = document.querySelector(".show_rank");
  const rankList = document.querySelector(".rank");
  const modeToggler = document.querySelector(".toggle_mode");
  const body = document.querySelector("body");
  const container = document.querySelector(".container");
  let clicks = 0;
  let darkMode = false;

      //Get info about visitor
      fetch("https://ipinfo.io/json?token=c3376073e3f554").then(
        (response) => response.json()
      ).then(
        (jsonResponse) => {
          sessionStorage.setItem("ip", jsonResponse.ip);
          sessionStorage.setItem("country", jsonResponse.country);
          sessionStorage.setItem("city", 0);
          sessionStorage.setItem("clicks", 0);
        } 
      );

      setInterval(() => {
        //Get info about visitor Country and statistics
      let GetCountryAPI = 'https://thepraise.herokuapp.com/api/country/' + sessionStorage.getItem('country'); 
      fetch(GetCountryAPI)
      .then((response) => response.json())
      .then((data) => {
          document.querySelector('.country').innerText = data.name;
          document.getElementById('country_clicks').innerText = data.clicks;
      })
    //Get info about Total
    let GetAllAPI = 'https://thepraise.herokuapp.com/api/all'; 
    fetch(GetAllAPI)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('TotalClicks').innerText = data.clicks;
    })
    //Get info about all Country and statistics
    let GetAll = 'https://thepraise.herokuapp.com/api/top'; 
    fetch(GetAll)
    .then((response) => response.json())
    .then((data) => {
        let top = data.sort((a,b) => {
            return b.country_clicks - a.country_clicks;
        });
        
        let ul = document.querySelector('.top_list');
        while(ul.firstChild){
          ul.firstChild.remove();
        }

        top.forEach(item => {
          if (item.country_name != undefined || item.country_name != null) {
            let li = document.createElement('li');
            li.id = item.country_code;
            li.innerHTML = item.country_name + '  : ' + item.country_clicks;
            li.className = " list-item";
            ul.appendChild(li);
          }
        });

      });
    //Get info about city and statistics
/*     if (cityHasBeenSelected) {
      let citySelected = selectCities.options[selectCities.selectedIndex].id;
      let GetCityAPI = 'https://thepraise.herokuapp.com/api/visitorCity/' + citySelected; 
      fetch(GetCityAPI)
      .then((response) => response.json())
      .then((data) => {
          document.getElementById('state').innerText = data.city_clicks + " : " + data.city_name;
      })


      let GetAllAPI = 'https://thepraise.herokuapp.com/api/country-cities/' + sessionStorage.getItem('country'); 
      fetch(GetAllAPI)
      .then((response) => response.json())
      .then((data) => {
        let top = data.sort((a,b) => {
          return b.city_clicks - a.city_clicks;
      });
      
      let ul = document.getElementById('mobile-ul-cities');
      while(ul.firstChild){
        ul.firstChild.remove();
      }
      for (let index = 0; index < 3; index++) {
        let li = document.createElement('li');
        li.id = top[index].city_clicks;
        if (index === 0) {
          li.innerHTML = top[index].city_name + '  : ' + top[index].city_clicks + '  <i class="fas fa-crown gold"></i>' ;
          }          
          if (index === 1) {
            li.innerHTML = top[index].city_name + '  : ' + top[index].city_clicks  + '  <i class="fas fa-crown silver"></i>';
            }          
            if (index === 2) {
              li.innerHTML = top[index].city_name + '  : ' + top[index].city_clicks  + '  <i class="fas fa-crown bronze"></i>';
              }
        li.className = " list-item";
        ul.appendChild(li);
      }
      for (let index = 3; index < 20; index++) {
        if (top[index].city_name !== null) {
          let li = document.createElement('li');
          li.id = top[index]._id;
          li.innerHTML = top[index].city_name + '  : ' + top[index].city_clicks;
          li.className = " list-item";
          ul.appendChild(li);
        }
      }
      });
   
    } */
      }, 1000);


  //Start for new visitor
  let StartAPI = 'https://thepraise.herokuapp.com/api/start';
  fetch(StartAPI,
      {
          method: "POST",
          body: JSON.stringify({
                  "ip": sessionStorage.getItem('ip'),
                  "country": sessionStorage.getItem('country'),
                  "city": sessionStorage.getItem('city'),
                  "clicks": 0
                }),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
      .then(((response) => response.json()))
      .then((data) => {
        document.querySelector('.counter').innerText = 0;
    })

    
      //Add one Click evry time visitor clicks
      document.getElementById('click').addEventListener('click', () => {
      clicks++;
      let before = sessionStorage.getItem('clicks');
      let after = parseInt(before) + 1;
      sessionStorage.setItem('clicks', after);
      document.getElementById('clicks').innerText = after;
        
      let clickBtn =  document.getElementById("click");
      clickBtn.disabled = true;
      clickBtn.style.backgroundColor = "#b5b3b3";
      clickBtn.style.cursor = "not-allowed";

      setTimeout(function(){
        clickBtn.disabled = false;
        clickBtn.style.cursor = "pointer";
        if (darkMode) {
          clickBtn.style.backgroundColor = "rgba(14, 14, 14, 0.7)";
        }else{
          clickBtn.style.backgroundColor = "#2d4a3f";
        }
    },500);
        
      });


    setInterval(() => {
      let ClickAPI = 'https://thepraise.herokuapp.com/api/click';

      async function postData() {
        // Default options are marked with *
        const response = await fetch(ClickAPI, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://thepraise.herokuapp.com'
          },
          body: JSON.stringify({
            "ip": sessionStorage.getItem('ip'),
            "country": sessionStorage.getItem('country'),
            "city": sessionStorage.getItem('city'),
            "clicks": clicks
          }), // body data type must match "Content-Type" header
        });
      }

      postData();
      clicks = 0;
    }, 5000);


  
  
  showRank.addEventListener("click", () => {
    rankList.classList.toggle("show");
  });

  modeToggler.addEventListener("click", () => {
    body.classList.toggle("dark");
    container.classList.toggle("cover");
    if (modeToggler.innerHTML != `<i class="fas fa-toggle-on fa-lg"></i>`) {
      modeToggler.innerHTML = `<i class="fas fa-toggle-on fa-lg"></i>`;
      darkMode = true;
    } else {
      modeToggler.innerHTML = `<i class="fas fa-toggle-off fa-lg"></i>`;
      darkMode = false;
    }
  });

});
