class HappeningsController < ApplicationController
    
    before_action :find_happenings, only: [:index, :edit]
    before_action :set_variables, only: [:create]
    before_action :find_happening, only: [:edit, :update, :destroy]
    
    def set_variables
        @name = params[:name]
        @time = params[:date].to_datetime
    end

    def find_happening
        @happening = Happening.find(params[:id])
    end
    
    def find_happenings
        @happenings = Happening.all
    end

    def index
        puts @happenings.first.get_html_date
    end

    ##Use Javascript on the front end to figure out the correct time to display, based on the user's browser
    def setTimeZone
        @localTime = params[:time]
    end

    #Save the happening data in the database
    def create
        Happening.create(name: @name, date: @time)
        redirect_to root_path
    end

    def edit
    end

    def update
        @happening.update_attributes(params.require(:happening).permit([:name, :date]))
        redirect_to root_path
    end

    def destroy
        @happening.delete
        redirect_to root_path
    end
end
