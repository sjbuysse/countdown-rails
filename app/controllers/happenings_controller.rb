class HappeningsController < ApplicationController
    def index
        #setTimeZone
        @happenings = Happening.all
    end

    def test
        puts "hi there"
    end

    #This method calculated the difference in between the Happening date and the current date
    #It will return a string that either says the difference in between those dates or "completed" 
    def getTimeDifference(now, date)
        differenceInSeconds = date.to_time - now.to_time
        seconds = (differenceInSeconds % 60).floor
        differenceInMinutes = differenceInSeconds/60
        minutes = (differenceInMinutes % 60).floor
        differenceInHours = differenceInMinutes/60
        hours = (differenceInHours % 24).floor
        days = (differenceInHours/24).floor
        #countdownString = makeCountdownString(days, hours, minutes)
        #return countdownString
    end

    def makeCountdownString(days, hours, minutes)
        if days > 0
            return days + 'd, ' + hours + 'h, ' + minutes + 'm'
        else if hours > 0
            return  hours + 'h, ' + minutes + 'm'
        else if minutes > 0
            return minutes + ' min'
        end 
    end

    #Use Javascript on the front end to figure out the correct time to display, based on the user's browser
    def setTimeZone
        @localTime = params[:time]
    end

    #Save the happening data in the database
    def save
        flash[:notice] = "saved"
        flash.keep
        @name = params[:happening_name]
        @time = params[:happening_time].to_datetime
        #Happening.create(name: @name, date: @time)
        redirect_to root_path
    end
end
