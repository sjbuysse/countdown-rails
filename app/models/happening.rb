class Happening < ActiveRecord::Base
    validates :name, presence:true, uniqueness:true
    validates :date, presence:true

    def secondsFromNow
        self.date.to_time - DateTime.now().to_time
    end

end
