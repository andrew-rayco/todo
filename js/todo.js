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
  var todosArray = []
  var database = firebase.database();

  database.ref('list').on('value', function(snapshot) {
    // snapshot.val() gives the current state of the db
    displayItems(snapshot.val())
  })

  function displayItems(allTodos) {
    // clear the ul of li's
    $('ul').empty()

    for (var key in allTodos) {
      $('ul').append('<li class="todo-item"><a id="' + allTodos[key].id + '" href="#">x</a> ' + allTodos[key].item + '</li>');
    }
  }

  function addItem() {
    // Add new item to list
    $newItemForm.on('submit', function(e) {
      e.preventDefault();
      if ($textInput.val() !== '') {

        // Add item to list if not empty string
        var newText = $textInput.val();
        todosArray.push(newText)

        // Clear text field
        $textInput.val('');

        addItemToDb(newText)
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
      database.ref('list/' + e.target.id).remove()
      console.log(e.target.id)
    });

  };
  addItem();

  function addItemToDb(newListItem) {
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var singleItem = {
      item: newListItem,
      id: newPostKey,
      order: todosArray.length
    };

    database.ref('list/' + newPostKey).set(singleItem)
  }

  // Sort items using jQuery UI
  $(function() {
    var sortEventHandler = function(event, ui) {
      console.log(event)
      console.log(ui)

      var arrayToBeSorted = $('a')
      var listValues = []

      for (var i=0; i<arrayToBeSorted.length; i++) {
        listValues.push(arrayToBeSorted[i].id)
        console.log(arrayToBeSorted[i].id)
      }
      console.log(listValues)
    }
    $("ul").sortable({
      change: sortEventHandler
    });
    $("ul").disableSelection();
  });

});
