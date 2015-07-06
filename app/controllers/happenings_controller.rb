class HappeningsController < ApplicationController
    def index
        @happenings = Happening.all
    end

    ##Use Javascript on the front end to figure out the correct time to display, based on the user's browser
    def setTimeZone
        @localTime = params[:time]
    end

    #Save the happening data in the database
    def create
        flash[:notice] = "saved"
        flash.keep
        @name = params[:happening_name]
        @time = params[:happening_time].to_datetime
        Happening.create(name: @name, date: @time)
        redirect_to root_path
    end

    def edit

    end

    def update
        
    end

    end
