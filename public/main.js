/*globals $:false */
$("#submitBtn").on( "click", function(){
    submitSearch();
});

$("#submitBtn").on( 'keypress',function(e){
     var p = e.which;
     if(p==13){
         submitSearch();
     }
});

//On enter open answer box 
$('#srch-term').on('keypress',function(e){
     var p = e.which;
     if(p==13){
         submitSearch();
     }
 });

function submitSearch(){
    $('#answer').show();
    $('#answer').select();
}

$("#answer").on( 'keypress',function(e){
    var p = e.which;
     if(p==13){
         submitAnswer();
     }
});

function submitAnswer(){
    var newTask = {
            'question': $('#srch-term').val(),
            'answer': $('#answer').val()
        };
    console.log(newTask);
     $.ajax({
            type: 'POST',
            data: newTask,
            url: '/tasks/add',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                $('#srch-term').val('');
                $('#answer').val('');
                $('#answer').hide();
                $('#srch-term').select();

            }
            else {
                console.log(response)
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });   
    

}

// Add User button click
//     $('#btnAddUser').on('click', addUser);

// DOM Ready =============================================================
$(document).ready(function() {

     // jQuery AJAX call for JSON
    $.getJSON( '/tasks/list', function( data ) {
        console.log(data)
        var items = [];
        $.each( data, function( key, val ) {
            console.log(val)
            $('#options').append( "<div class='option'>" + val.question + "</div>" );
            console.log(items)
        });
     
    });

});

