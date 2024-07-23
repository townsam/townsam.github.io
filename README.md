# waph-townsam

# WAPH-Web Application Programming and Hacking

## Instructor: Dr. Phu Phung

## Student

**Name**: Andrew Towns

**Email**: townsam@mail.uc.edu

![Andrew's headshot](images/headshot.jpg)

# Individual Project 1

## Front-end Web Development with a Professional Profile Website on github.io cloud service

## Overview and Requirements 

For this project we explored front-end web development and implementing API calls to display content to our page. We learned about concepts such as asynchronous requests, css formatting, and using open source frameworks to ease our coding experience.

Link to the website: [https://townsam.github.io/](https://townsam.github.io/)

A link to the repository for this project: [https://github.com/townsam/townsam.github.io](https://github.com/townsam/townsam.github.io)

### General requirements (30 pts): 

+ Create and deploy a personal website on GitHub cloud (github.io) as a professional profile with your resume, including your name, headshot, contact information, background, e.g., education, your experiences and skills (25 pts).
 ​

I deployed my personal website [townsam.github.io](townsam.github.io) which is formatted using a custom bootstrap theme and populated with information about me including my contact information, background, education, resume, and experiences and skills. The main page `index.html` has navigation features which allow for easy access to each particular section of my profile.

+ Create a link to a new HTML page to introduce this "Web Application Programming and Hacking" course and related hands-on projects (5 pts)
 ​

Additionally there is a link on the navbar `WAPH` that links to an overview page for our WAPH course and summary of the type of projects and learning outcomes the course has.


### Non-technical requirements (20 pts)​

+ Use an open-source CSS template or framework such as Bootstrap​

I downloaded a free bootstrap theme, [https://startbootstrap.com/theme/resume](https://startbootstrap.com/theme/resume), and used the bootstrap cdn link to fetch the scripts.

+ Include a page tracker

I chose to use the flag counter, which I placed at the top right of my webpage.

### Technical requirements (50 pts)​

#### Basic JavaScript code (20 pts)​

+ Use jQuery and one more open-source JavaScript framework/library​ to implement JavaScript code introduced in Lab 2, including a digital clock, an analog clock, show/hide your email, and one more functionality of your choice. **(5 pts each)**

I used jQuery to implement the clocks and email, and I used chessboard.js to display a chess board in my webpage.

+ Two public Web APIs integration (20 pts)

Using jQuery and AJAX requests I created a function that requests a joke every minute and formats it depending on whether the joke is a twopart joke or not. The code can be seen below.

```js
	function jokeApi() {
	    $.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit", function(result) {
	        //check for null
	        if(result.type.length == 0) {
	            return;
	        }
	        if(result.type == "twopart") {
	            $("#response").html("Random joke using jokeapi.dev: " + encodeInput(result.setup) + " \n " + encodeInput(result.delivery))
	        }
	        else {
	            $("#response").html("Random joke using jokeapi.dev: " + encodeInput(result.joke));
	        }
	    })
	}
	jokeApi();
	setInterval(jokeApi, 60000);
```

For my graphic API I wanted to include something chess related so I used the chessboardjs project on github and chess.com's public puzzle api to request a random puzzle and load it onto the page as a chessboard graphic. The graphic also has a details field below that will show the answer to the puzzle if expanded. 

```js 
	function chessApi() {
	    $.get("https://api.chess.com/pub/puzzle/random", function(result) {
	        if(result.length == 0) {
	            return;
	        }
	        //Chess board
	        var pgn = result.pgn.split(/\r?\n/);
	        var answer = pgn[pgn.length-2];
	        console.log(result.pgn);
	        var board2 = Chessboard('board2', {
	          draggable: false,
	          dropOffBoard: 'trash',
	          position: result.fen,
	          sparePieces: false
	        })
	        if((/w/).test(result.fen)) {
	            $("#chessapi").html("Using Chess.com puzzles API: " + "White to move")
	        }
	        else {
	            $("#chessapi").html("Using Chess.com puzzles API: " + "Black to move")
	        }
	        if(answer.length == 0){
	            $("#answer").html(encodeInput(result.pgn));
	        }
	        else {
	            $("#answer").html(encodeInput(answer));
	        }
	    })
	}
	chessApi();
```

```html
    <!--Chessboard-->
    <div id="chessapi"></div>
    <div id="board2" style="width: 400px"></div>
    <details>
        <summary>Answer</summary>
        <div id="answer"></div>
    </details>
```

+ Use JavaScript cookies

I added a JS cookie to display the last visit datetime as an alert before loading the page each time you visit. Cookie code below.

```js
	function setCookie(cname,cvalue,exdays) {
	    const d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    let expires = "expires=" + d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
	    let name = cname + "=";
	    let decodedCookie = decodeURIComponent(document.cookie);
	    let ca = decodedCookie.split(';');
	    for(let i = 0; i < ca.length; i++) {
	        let c = ca[i];
	        while (c.charAt(0) == ' ') {
	        c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	  return "";
	}
	function checkCookie() {
	    var lastvisit = getCookie("lastvisit");
	    if(lastvisit != "") {
	        alert("Welcome back! Last visit was: " + lastvisit);
	    }
	    else {
	        const d = new Date();
	        d.setTime(d.getTime());
	        setCookie("lastvisit", d.toUTCString(), 365);
	    }
	}
	checkCookie();
```