class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.references :user
      t.string :city
      t.string :state
      t.integer :age
      t.string :gender
      t.string :race
      t.string :ethnicity
      t.timestamps
    end
  end
end
