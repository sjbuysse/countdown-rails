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
    $(".addButton").click(function(){
        var newListItem = getNewListItem($(this));
        if(!newListItem){		
        }else if(newListItem.children('label.counterLabel').html() == "Completed"){				
            $("#completed-countdowns").append(newListItem);
            $("#new-counter").val("");
            $("#new-date").val("");
        }else {
            $("#running-countdowns").append(newListItem);
            $("#new-counter").val("");
            $("#new-date").val("");
        }
    });

    //When click on edit in running countdowns section
        //If the class is in editMode (do you want to save edits)
            //set the ListItem accordingly to the edits
            //change text of saveButton to 'edit'
        //if the class isn't in editMode (and you want to go to editMode)	
            //make the input text equal to the label text.
        //toggle the class editMode to show and hide wanted elements
    $("#running-countdowns").on("click", ".editButton", function(){
        var listItem = $(this).parent();
        var eventInput = listItem.children("input.eventInput");
        var eventLabel = listItem.children("label.eventLabel");
        var eventDate = listItem.children("input[type='datetime-local']")
        if(listItem.hasClass("editMode")){ //it was in editMode when button clicked
            var newListItem = getNewListItem($(this));
            if(!newListItem){			
            }else if (newListItem.children('label.counterLabel').html() == "Completed"){
                //add counter to completed countdowns list & remove it from the running countdowns list
                listItem.remove();
                $("#completed-countdowns").append(newListItem);
            }else { //(countDown != "Completed")
                //add counter to completed countdowns list & remove it from the running countdowns list
                listItem.remove();
                $("#running-countdowns").append(newListItem);			
            }			
        } else{ //it wasn't in editMode when button clicked
            eventInput.val(eventLabel.html());
            $(this).html("Save");		
            listItem.toggleClass("editMode");
        }	
    });

    //when clicking on edit button in the completed countdowns section
    $("#completed-countdowns").on("click", ".editButton", function(){
        var listItem = $(this).parent();
        var eventInput = listItem.children("input.eventInput");
        var eventLabel = listItem.children("label.eventLabel");
        var eventDate = listItem.children("input[type='datetime-local']")
        if(listItem.hasClass("editMode")){ //it was in editMode when button clicked
            var newListItem = getNewListItem($(this));
            if(!newListItem){			
            }else if (newListItem.children('label.counterLabel').html() != "Completed"){
                //add counter to completed countdowns list & remove it from the running countdowns list
                listItem.remove();
                $("#running-countdowns").append(newListItem);
            }else { //(countDown == "Completed")
                //add counter to completed countdowns list & remove it from the running countdowns list
                listItem.remove();
                $("#completed-countdowns").append(newListItem);			
            }			
        } else{ //it wasn't in editMode when button clicked
            eventInput.val(eventLabel.html());
            $(this).html("Save");		
            listItem.toggleClass("editMode");
        }	
    });

    //when click on deleteButton
    $(".container").on("click", ".deleteButton",function(){
        $(this).parent().remove();
    });

    //returns false if something is not filled in appropriately, returns listItem if all is good.
    function getNewListItem($caller){
        var callingListItem  = $caller.parent();
        var eventInput = callingListItem.children("input.eventInput");
        var eventDate = callingListItem.children("input[type='datetime-local']")
        //check if name and date are filled in and color red otherwise.
        var checkName = checkEventInput(eventInput);
        var checkDate = checkEventInput(eventDate);
        if(checkName && checkDate){
            var dateString = eventDate.val();
            var date2 = new Date(dateString);
            var countDown = getCountdown(date2);		
            var newListItem = createListItem(eventInput.val(), dateString, countDown);
            return newListItem;
        } else{
            console.log("false");
            return false;
        }
    }

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

    //Are event and date filled in?
    function checkEventInput(eventInputSelector){
        if (eventInputSelector.val().length > 0)
        {
            return true;
        } else{
            eventInputSelector.css("background-color", "tomato");
            return false;
        }
    }
        

    //calculate difference bettween given date and current date
    function getCountdown(date2) {
        var date1 = new Date();
      // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        if(difference_ms <= 0){
            return "Completed";
        }
        //take out milliseconds
        difference_ms = difference_ms/1000;
        var seconds = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60; 
        var minutes = Math.floor(difference_ms % 60);
        difference_ms = difference_ms/60; 
        var hours = Math.floor(difference_ms % 24);  
        var days = Math.floor(difference_ms/24);
        var countdownString = makeCounterString(days, hours, minutes);
        return countdownString;
    }

    function makeCounterString(days, hours, minutes){	
        if(days > 0){
            return days + 'd, ' + hours + 'h, ' + minutes + 'm';
        } else if(hours > 0){
            return  hours + 'h, ' + minutes + 'm';
        } else if(minutes > 0){
            return minutes + ' min';
        }
    }
})
