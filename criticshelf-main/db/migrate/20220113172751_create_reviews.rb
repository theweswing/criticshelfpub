class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :subject
      t.string :reviews
      t.float :rating
      t.references :user
      t.references :art
      t.timestamps
    end
  end
end
