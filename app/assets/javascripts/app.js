$(document).ready(function(){
    function createListItem(eventName, dateString, countDown){
        var $li = $("<li></li>");
        var $eventLbl = $("<label class='eventLabel'></label>");
        var $input = $("<input class='eventInput' type='text'>");
        var $editBtn = $('<button class="editButton">Edit</button>');
        var $deleteBtn = $('<button class="deleteButton">Delete</button>');
        var $counterLbl = $('<label class="counterLabel"></label>');
        var $inputDate = $('<input type="datetime-local">');
        
        $eventLbl.append(eventName);
        $input.val(eventName);
        $inputDate.val(dateString);
        $counterLbl.html(countDown);
        $li.append($eventLbl).append($input).append($editBtn).append($deleteBtn).append($counterLbl).append($inputDate);
        return $li;
    }

    //when click on add
    $(".addButton").bind("click", function(event){
        event.preventDefault();
        //validate both the name and date field
        eventInput = $(this).siblings("input.eventInput")
        eventDate = $(this).siblings("#new-date")
        var checkName = checkEventInput(eventInput);
        var checkDate = checkEventInput(eventDate);
        if(checkName & checkDate){
            //do the default action
            $(this).unbind("click").click;
        }
    });
    
    //when click on save (update)
    $("input[value='Save']").bind("click", function(event){
        event.preventDefault();
        //validate both the name and date field
        eventInput = $(this).siblings("input.updateInput")
        eventDate = $(this).siblings("#happening_date")
        var checkName = checkEventInput(eventInput);
        var checkDate = checkEventInput(eventDate);
        if(checkName & checkDate){
            //do the default action
            $(this).unbind("click").click;
        }
    });


           	
    //When we correct an input, lose the red background color
    $(".container").on("focus", "input",(function(){loseRedBackground($(this))}));	

    //check if selector is red
        //if true, make background white.
    function loseRedBackground(selector){
        if(selector.css("background-color") == "tomato");
        {
            selector.css("background-color", "white");
        }
    }

    //Is the input filled in?
    function checkEventInput(eventInputSelector){
        if (eventInputSelector.val().length > 0)
        {
            return true;
        } else{
            eventInputSelector.css("background-color", "tomato");
            return false;
        }
    }

})

