class Event < ActiveRecord::Base
    validates :name, presence: true, uniqueness: true
    validates :datetime, presence: true
end
