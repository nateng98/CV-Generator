// jquery from repeater: use for repeatedly delete or add more input from users
// For those who do not understand this, I provide some explaination within lines of code

// depends on which version of jquery you are using, syntax can be slightly different
// $(document).ready(function() {   <-------for older version
$(function () {   // make sure that the page is fully loaded before executing any scripts
  $('.repeater').repeater({   // select all class repeater and apply repeater fuction to them
    initEmpty: false,
    defaultValues: {        // default input is empty string
      'text-input': ''
    },
    show: function () {        // when this is called ([+] button), the input element will drop down
      $(this).slideDown();// with slidedown animation
    },
    hide: function (deleteElement) {  // when this is called ([x] button), the input element will disappear
      $(this).slideUp(deleteElement); // with slideup animation
      setTimeout(() => {  // there will be delay of 500ms and call function generateCV()
        generateCV();
      }, 500);
    },
    isFirstItemUndeletable: true    // repeater plugin that says the first input element cannot be deleted
  })
})