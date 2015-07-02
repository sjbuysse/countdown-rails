class HappeningsController < ApplicationController
    def index
        setTimeZone
        @happenings = Happening.all
    end

    #This method calculated the difference in between the Happening date and the current date
    #It will return a string that either says the difference in between those dates or "completed" 
    def getTimeDifference(date2)

    end

    #Use Javascript on the front end to figure out the correct time to display, based on the user's browser
    def setTimeZone
        @localTime = params[:time]
    end
end
