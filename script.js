var db = new PouchDB('shopping_list');

$(document).ready(function(){



retrieve();

//retrieve all items
function retrieve(){
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    
    var array = doc.rows; 
    $("#list").empty();
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      
    $('#list').append('<li class="w3-padding-16">'+ array[i].doc.item +'<span id="'+ array[i].doc._id +'" style="cursor:pointer;" class="w3-right click_remove w3-margin-right">×</span><li>')


      
    }

  });
}


//when add button is clicked
$('#addItem').click(function() {
  var item = $('#my_input').val();
  if (!$.trim(item).length) {
    $('#msg').fadeIn();
    $('#msg').text('Enter an item');
    
    $('#msg').fadeOut(5000);

  }else{
    create(item);
  $('#my_input').val('');
  retrieve();
}

});
function addItem(){
  console.log(item);
    
}



//create a new item
function create(item) {
  db.put({
      _id:  new Date().getTime() + '',
      item: item
  });

    $('#msg-sucess').fadeIn();

    $('#msg-sucess').text('succesfully added');

    $('#msg-sucess').fadeOut(5000);

}

// whene "x" is clicked
$('body').on('click', '.click_remove', function () {
  
  destroy(this.id)
});

// delete an item
function destroy(id) {
  
db.get(id).then(function (doc) {
  doc._deleted = true;
  db.put(doc);
    $('#msg-sucess').fadeIn();
    $('#msg-sucess').text('succesfully deleted');

    retrieve();
    $('#msg-sucess').fadeOut(5000);

});

}

});