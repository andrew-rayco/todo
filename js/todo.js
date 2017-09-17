$(function() {

  var $newItemForm = $('#newItemForm');
  var $textInput = $('input:text');
  var $form = $('form');
  var emptyItemText = '<p class="error">Heyyyy! No empty items on the list please.</p>';
  var fiveItemsText = '<p class="error">Ooooo. That\'s five items. Niiice.</p>';
  var $fiveMsg = $($.parseHTML(fiveItemsText));
  var $errorMsg = $($.parseHTML(emptyItemText));
  var $listItems = $('li');
  var $listItemText = $('li a').text;
  var database = firebase.database();

  console.log(database)

  function addItemToDb() {
    // var newPostKey = database.ref().child('list').push().key;
    // database.ref('list' + newPostKey).set({
    //   item: 'Shoe shine from firebase'
    // })
    database.ref('list-KuDgnRz_PqLHBS9lSDC').remove()
  }
  addItemToDb()

  database.ref('list').on('value', function(snapshot) {
    console.log(snapshot.val())
  })



  // Check for existing JSON list data
  // var xhr = new XMLHttpRequest();
  //
  // xhr.onload = function() {
  //   if (xhr.status === 200) {
  //
  //     // parse JSON object into JavaScript object
  //     responseObject = JSON.parse(xhr.responseText);
  //
  //     // loop through list items and add to list
  //     for (var i=0; i < responseObject.list.length; i++) {
  //
  //       // If list is currently empty, add JSON items immediately
  //       if ($listItems.length < 1) {
  //         $('ul').append('<li class="todo-item"><a href="#">x</a> ' + responseObject.list[i].item + '</li>');
  //       } else {
  //         for (var j=0; j < $listItems.length; j++) {
  //           // Get list item string and remove the first character (the close x)
  //           var $listItemNoX = $listItems.eq(j).text().slice(1);
  //           if (responseObject.list[i].item !== $listItemNoX) {
  //             $('ul').append('<li class="todo-item"><a href="#">x</a> ' + responseObject.list[i].item + '</li>');
  //           } else {
  //             $form.prepend('<p class="error">Item already exists</p>');
  //             $('form p').delay(1000).fadeOut(300);
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     // Show error message and code if XMLHttpRequest fails
  //     var $jsonFailMsg = '<p class="error">Failed to find list. Error ' + xhr.status + '</p>';
  //     $form.prepend($jsonFailMsg);
  //   }
  // };
  //
  // xhr.open('GET', 'json/list.json', 'true');
  // xhr.send(null);

  function addItem() {
    // Add new item to list
    $newItemForm.on('submit', function(e) {
      e.preventDefault();
      if ($textInput.val() !== '') {

        // Add item to list if not empty string
        var newText = $textInput.val();
        $('ul').append('<li class="todo-item"><a href="#">x</a> ' + newText + '</li>');
        $textInput.val('');

        // Add item to JSON file ================== Trying to...
        // var listLength = responseObject;
        // console.log($listItemText);
        // responseObject.list[1].item = newText;
        // xhr.open('POST', 'json/list.json', 'true');
        // xhr.send(null);

      } else {
        var $newMsg = $($errorMsg).hide().fadeIn(1000);
        $form.prepend($newMsg);
      };

      // Surprise five list items message
      if ($('li').length == 5) {
        $form.prepend($fiveMsg.hide().fadeIn(800).delay(1000).fadeOut(500));
      }

      if ($('li').length >= 1) {
          $('ul').css("margin-bottom", "5%");
      }
    });

    // Make 'x's remove list item when clicked
    $('ul').on('click', '.todo-item>a', function(e) {
      e.preventDefault();
      $(this).parent().fadeOut(400);
    });

  };
  addItem();

  // Sort items using jQuery UI
  $( function() {
    $( "ul" ).sortable();
    $( "ul" ).disableSelection();
  });

});
