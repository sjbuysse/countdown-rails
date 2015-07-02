class CreateHappenings < ActiveRecord::Migration
  def change
    create_table :happenings do |t|
      t.string :name
      t.datetime :date

      t.timestamps null: false
    end
  end
end
