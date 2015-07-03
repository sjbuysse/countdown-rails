class HappeningsController < ApplicationController
    def index
        happenings = Happening.all
        #Make an array filled with the hashes of happening names,there dates and the time differences
        #This hash will be used to make our view
        @completed, @incomplete = getCounterArrays(happenings)
    end

    def getCounterArrays(happenings)
        completedHappenings = [] 
        incompleteHappenings = []
        happenings.each do |happening|
            #getTimeDifference returns a string that either says "completed" or the countdown
            timeDifference = getTimeDifference(happening.date)
            if timeDifference == "completed"
                completedHappenings << {name: happening.name, date: happening.date, difference: timeDifference}
            else
                incompleteHappenings << {name: happening.name, date: happening.date, difference: timeDifference}
            end
        end

        return completedHappenings, incompleteHappenings
    end

    ##Use Javascript on the front end to figure out the correct time to display, based on the user's browser
    def setTimeZone
        @localTime = params[:time]
    end

    #Save the happening data in the database
    def save
        flash[:notice] = "saved"
        flash.keep
        @name = params[:happening_name]
        @time = params[:happening_time].to_datetime
        Happening.create(name: @name, date: @time)
        redirect_to root_path
    end

    ##This method calculated the difference in between the Happening date and the current date
    ##It will return a string that either says the difference in between those dates or "completed" 
    def getTimeDifference(date)
        now = DateTime.now()
        differenceInSeconds = date.to_time - now.to_time
        if differenceInSeconds > 0
            seconds = (differenceInSeconds % 60).floor
            differenceInMinutes = differenceInSeconds/60
            minutes = (differenceInMinutes % 60).floor
            differenceInHours = differenceInMinutes/60
            hours = (differenceInHours % 24).floor
            days = (differenceInHours/24).floor
            countdownString = makeCountdownString(days, hours, minutes)
        else
            countdownString = "completed"
        end
        return countdownString
    end

    def makeCountdownString(days, hours, minutes)
        if days > 0
            return "#{days} d, #{hours} h, #{minutes} m"
        elsif hours > 0
            return "#{hours} h, #{minutes} m"
        elsif minutes > 0
            return "#{minutes} m"
        end 
    end
end
