$(function() {

  var $newItemForm = $('#newItemForm');
  var $textInput = $('input:text');
  var $form = $('form');
  var emptyItemText = '<p class="error">Heyyyy! No empty items on the list please.</p>';
  var fiveItemsText = '<p class="error">Ooooo. That\'s five items. Niiice.</p>';
  var $fiveMsg = $($.parseHTML(fiveItemsText));
  var $errorMsg = $($.parseHTML(emptyItemText));

  function addItem() {
    // Add new item to list
    $newItemForm.on('submit', function(e) {
      e.preventDefault();
      if ($textInput.val() !== '') {
        var newText = $textInput.val();
        $('ul').append('<li class="todo-item"><a href="#">x</a> ' + newText + '</li>');
        $textInput.val('');
      } else {
        var $newMsg = $($errorMsg).hide().fadeIn(1000);
        $form.prepend($newMsg);
      };
      
      // Surprise five list items message
      if ($('li').length == 5) {
        var $niceMsg = 
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
