function showTime() {
  const today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const time = hours + ":" + minutes + ":" + seconds;
  document.getElementById('clock').innerText = time;
  setTimeout(showTime, 1000);
}

function login() {
  const username = document.getElementById('username').value;
  localStorage.setItem('user', username);
  // 로그인 처리
}

function addTodo() {
  const todoInput = document.getElementById('todoInput').value;
  if (todoInput === '') {
      return;
  }
  let todos = localStorage.getItem('todos');
  todos = todos ? JSON.parse(todos) : [];
  todos.push(todoInput);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

function loadTodos() {
  let todos = localStorage.getItem('todos');
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  if (todos) {
      todos = JSON.parse(todos);
      todos.forEach((todo, index) => {
          let li = document.createElement('li');
          li.innerText = todo;

          let editButton = document.createElement('button');
          editButton.innerText = '수정';
          editButton.onclick = function() { editTodo(index); };

          let deleteButton = document.createElement('button');
          deleteButton.innerText = '삭제';
          deleteButton.onclick = function() { deleteTodo(index); };

          li.appendChild(editButton);
          li.appendChild(deleteButton);
          todoList.appendChild(li);
      });
  }
}

function editTodo(index) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  let newTodo = prompt("할 일을 수정하세요", todos[index]);
  if (newTodo !== null && newTodo !== '') {
      todos[index] = newTodo;
      localStorage.setItem('todos', JSON.stringify(todos));
      loadTodos();
  }
}

function deleteTodo(index) {
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}


function changeBackgroundGradient() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F5', '#33FFF2', 
                  '#F5FF33', '#FF8333', '#837FFF', '#FF3380', '#33FF8D'];
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
  setTimeout(changeBackgroundGradient, 2000);
}


function getWeather(latitude, longitude) {
  const apiKey = '438ce3732975b8bc49697b07501492ce';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
      const country = data.sys.country; // 국가 코드
      const city = data.name; // 도시 이름
      const weather = data.weather[0].description; // 날씨 설명
      const temperature = data.main.temp; // 현재 온도

      // 위치 정보와 날씨 정보를 웹페이지에 표시
      document.getElementById('weather').innerText = `위치: ${city}, ${country} - 날씨: ${weather}, 온도: ${temperature}°C`;
  })
  .catch(error => {
      console.error('날씨 정보를 가져오는 데 실패했습니다:', error);
  });
}



function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
      });
  } else {
      document.getElementById('weather').innerText = "Geolocation is not supported by this browser.";
  }
}

function init() {
  showTime();
  loadTodos();
  changeBackgroundGradient();
  getLocation();
}

// 초기화 함수 호출
init();
