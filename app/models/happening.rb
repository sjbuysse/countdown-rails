class Happening < ActiveRecord::Base
    validates :name, presence:true, uniqueness:true
    validates :date, presence:true

    default_scope {order("date ASC")}

    def get_countdown_string
        @differenceInSeconds = date.to_time - DateTime.now().to_time
        if @differenceInSeconds > 0
            if get_days > 0
                return "#{get_days} d, #{get_hours} h, #{get_minutes} m"
            elsif get_hours > 0
                return "#{get_hours} h, #{get_minutes} m"
            elsif get_minutes > 0
                return "#{get_minutes} m"
            end 
        else
            return "completed"
        end
    end

    def get_minutes
        differenceInMinutes = @differenceInSeconds/60
        return minutes = (differenceInMinutes % 60).floor
    end

    def get_hours
        differenceInHours = @differenceInSeconds/60/60
        return hours = (differenceInHours % 24).floor
    end

    def get_days
        differenceInHours = @differenceInSeconds/60/60
        return days = (differenceInHours / 24).floor
    end

    def get_html_date 
        date.frmt_YY_mm_dd_HH_MM('--T:', true)
    end

end
