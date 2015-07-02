class HappeningsController < ApplicationController
    def index
        #setTimeZone
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

    #Save the happening data in the database
    def save
        flash[:notice] = "saved"
        @name = params[:happening_name]
        @time = params[:happening_time].to_datetime
        Happening.create(name: @name, date: @time)
        redirect_to root_path
    end
end
