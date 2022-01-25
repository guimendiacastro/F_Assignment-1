const express = require('express');
const app = express();
const fs = require('fs');
const data = fs.readFileSync('games-timetable1.json');
const games = JSON.parse(data);

const data2 = fs.readFileSync('games-timetable-div1.json');
const games2 = JSON.parse(data2);

app.use(express.urlencoded());
app.use(express.static('client'));
app.use(express.json());

const testing = require('./games-timetable1.json');
const div2 = require('./games-timetable-div1.json');
const instruments = ['piano', 'concertina', 'double bas'];

app.get('/list', function (req, resp) {
  resp.send(instruments);
});

app.get('/bball/question', function (req, resp) {
  const q = req.query.bball_timetable;
  const div = req.query.div;
  const answers = [];
  if (div !== 'div2') {
    for (const bball of testing) {
      if (bball.team1.includes(q)) {
        answers.push(bball);
      } else {
        if (bball.team2.includes(q)) {
          answers.push(bball);
        }
      }
    }
  }
  if (div !== 'div1') {
    for (const bball_div2 of div2) {
      if (bball_div2.team1.includes(q)) {
        answers.push(bball_div2);
      } else {
        if (bball_div2.team2.includes(q)) {
          answers.push(bball_div2);
        }
      }
    }
  }
  resp.json(answers); // resp.send would also send as JSON
});

app.get('/bball/question_date', function (req, resp) {
  const d = req.query.bball_timetable_date;
  const answers_date = [];
  const div_date = req.query.div_date;
  if (div_date !== 'div2') {
    for (const bball_date of testing) {
      if (bball_date.date.includes(d)) {
        answers_date.push(bball_date);
      }
    }
  }
  if (div_date !== 'div1') {
    for (const bball_div2_date of div2) {
      if (bball_div2_date.date.includes(d)) {
        answers_date.push(bball_div2_date);
      }
    }
  }
  resp.json(answers_date); // resp.send would also send as JSON
});

app.get('/bball/question_time', function (req, resp) {
  const t = req.query.bball_timetable_time;
  const answers_time = [];
  const div_time = req.query.div_time;
  if (div_time !== 'div2') {
    for (const bball_time of testing) {
      if (bball_time.time.includes(t)) {
        answers_time.push(bball_time);
      }
    }
  }
  if (div_time !== 'div1') {
    for (const bball_div2_time of div2) {
      if (bball_div2_time.time.includes(t)) {
        answers_time.push(bball_div2_time);
      }
    }
  }
  resp.json(answers_time); // resp.send would also send as JSON
});

app.post('/timetable/new', function (req, resp) {
  console.log(req.body);
  const new_game = req.body;
  if (new_game.div === 'div2') {
    games2.push(new_game);
    const data2 = JSON.stringify(games2, null, 2);
    console.log(data2);
    fs.writeFile('games-timetable-div1.json', data2, finished2);
    function finished2 (err) {
      console.log('All set ');
      resp.send(new_game);
      if (err) {
        console.log('Failed');
      }
    }
  }
  if (new_game.div === 'div1') {
    games.push(new_game);
    const data = JSON.stringify(games, null, 2);
    console.log(data);
    fs.writeFile('games-timetable1.json', data, finished);
    function finished (err) {
      console.log('All set ');
      resp.send(new_game);
      if (err) {
        console.log('Failed');
      }
    }
  }
});

module.exports = app;
app.listen(8090);
