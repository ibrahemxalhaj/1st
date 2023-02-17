$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0C0HBpt9pmg5zXfYCZ_rnt_w5m0B0lH",
    authDomain: "twitter-clone-5c206.firebaseapp.com",
    databaseURL: "https://twitter-clone-5c206-default-rtdb.firebaseio.com",
    projectId: "twitter-clone-5c206",
    storageBucket: "twitter-clone-5c206.appspot.com",
    messagingSenderId: "710722117652"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  // Prompt user for username and store it in localStorage
  const storedUsername = localStorage.getItem('username');
  if (!storedUsername) {
    const username = prompt('Please enter your username:');
    localStorage.setItem('username', username);
  }

  // Handle tweet form submission
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const tweetContent = $('#tweet-content').val();
    const username = localStorage.getItem('username');

    // Save the tweet and username to the database
    database.ref('tweets').push({
      content: tweetContent,
      username: username
    });

    // Clear the tweet input field
    $('#tweet-content').val('');
  });

  // Retrieve tweets from the database and display them
  database.ref('tweets').on('child_added', function(snapshot) {
    const tweet = snapshot.val();
    const tweetItem = $('<li>').text(`${tweet.username}: ${tweet.content}`);
    $('#tweet-list').prepend(tweetItem);
  });
});
