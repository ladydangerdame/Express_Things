$(function() {
  console.log("I am sending the list");
  $.get('/snacks', appendToList);

  function appendToList(snacks) {
    var list = [];
    for (var i in snacks) {
      snack = snacks[i];
      content = '<a class=""waves-effect waves-red btn-flat"" href="#" data-snack="' + snack + '"><i class="tiny material-icons">clear</i></a>' + ' <a href="/snacks/' + snack + '">' + snack + '</a> ';
      list.push($('<li>', {
        html: content
      }));
    }
    $('.snack-list').append(list);
  }
  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    //Serialize transforms data to URL-encoded notation so we can then parse it back to Javascript
    var snackData = form.serialize();

    $.ajax({
      type: 'POST',
      url: '/snacks',
      data: snackData
    }).done(function(snackName) {
      appendToList([snackName]);
      form.trigger('reset');

      $('.snack-list').on('click', 'a[data-snack]', function(event) {
        if (!confirm('Are you sure ?')) {
          return false;
        }
        var target = $(event.currentTarget);

        $.ajax({
            type: 'DELETE',
            url: '/snacks/' + target.data('snack')
          })
          .done(function() {
            target.parents('li').remove();
            console.log(target.data);
          });
      });

    });
  });
});
