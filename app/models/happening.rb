class Happening < ActiveRecord::Base
    validates :name, presence:true, uniqueness:true
    validates :date, presence:true
end
