/*globals $:false */

///// FUNCTIONS

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function NavChange(RHRwidth) {
    var pad = RHRwidth + $('#tab').width() + 10 
    $("#rail").width(RHRwidth);
    $("#main").css("paddingRight", pad );
}


///// Triggers

$('.icon').on( "click", function(){
    if($(this).hasClass('selected')){
        $(this).removeClass('selected')
        NavChange(0);
    }else{
        $('.icon').removeClass('selected')
        $(this).addClass('selected')
        NavChange(250);
    }
    
})

///// OLD

/*

var searchOpenable = true;
//on click open the search bar all the way
$('#search').on( "click", function(){
    if(searchOpenable){
        $('#search').animate({
            paddingLeft: '17px',
            left:'0px'
        }, 500, function() {
        searchOpenable = false;
       
      });
    }  //$('#searchIcon').css("fontSize","25px")
})

//on click close the search bar all the way
$('#searchCloseIcon').on( "click", function(){
    $('#search').animate({
        paddingLeft: '10px',
        left : ($('.containerz').width())-45+'px'
    }, 500, function() {
    searchOpenable = true;
  });
})

$('#search').on( "mouseenter", function(){
    $('#search').animate({
        left : ($('.containerz').width())-145+'px'
    }, 500, function() {
    searchOpenable = true;
  });
})

function hideTitle(){
    //removes the title if there isn't enough space for it
    if($('.nav').width()<260){
        $('#title').hide()
    }else{
        $('#title').show()
    }
}

function offscreen(){
    //makes the search bar offscreen
    var posVar = ($('.containerz').width())-45+'px';  
    $('#search').css('left',posVar);
}
    
$( window ).resize(function() {
    //hideTitle();
    offscreen();
});


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
$('#srch-term').on('keyup',function(e){
    var p = e.which;
    if(p==13){
        submitSearch();
    }else{
        if (!$('#srch-term').val()) {
            $('#options').hide();
        }else{
            searchQ();
        }
        
    }
 });


//delete option on click
function deleter(){
   $('.option').on("click", function(){
        console.log('delete mode')
        removeQ($(this).attr('value'))
    }) 
}



//action to take when wanting to submit a search
function submitSearch(){
    $('#answer').show();
    $('#options').hide();
    $('#answer').select();

    
}

$("#answer").on( 'keyup',function(e){
    var p = e.which;
     if(p==13){
        console.log('adding in data')
         submitAnswer();
     }
});

function searchQ(){
    console.log('requesting data')
     $.getJSON( '/tasks/list?term='+$('#srch-term').val(), function( data ) {
        console.log('recieved data')
        $('#questions').empty();
        var items = [];
        $.each( data, function( key, val ) {
            console.log(val)
            $('#questions').append( "<div class='option' value=" + val._id + "><div class='question'>" + val.question + "</div><div class='answer'>" +val.answer + "</div></div>" );
            console.log(items)
        });
        $(".option:first").addClass('selected');
        $(".option:last").addClass('last');
        $('#options').show();
        deleter();
    });
        
}

function submitAnswer(){
    var newTask = {
            'question': $('#srch-term').val(),
            'answer': $('#answer').val()
        };
    console.log(newTask);
     $.post('/tasks/add', newTask, function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                $('#srch-term').val('');
                $('#answer').val('');
                $('#options').val('');
                $('#answer').hide();
                $('#options').hide();
                $('#srch-term').select();

            }
            else {
                console.log(response)
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });   
}


function removeQ(ID){
    $.ajax({
        url: '/tasks/delete/' + ID,
        type: 'DELETE',
        success: function(result){
            console.log('deleted')
        }
    })
}

// Add User button click
//     $('#btnAddUser').on('click', addUser);

// DOM Ready =============================================================
$(document).ready(function() {
     // jQuery AJAX call for JSON
//    $.getJSON( '/tasks/list?query='+$('#srch-term').val(), function( data ) {
   //hideTitle();
   offscreen();

});

*/