class CreateDisciplines < ActiveRecord::Migration[6.1]
  def change
    create_table :disciplines do |t|
      t.string :name
      t.timestamps
    end
    remove_column :reviews, :identifier
    remove_column :reviews, :art_id
    remove_column :reviews, :subject
    remove_column :reviews, :reviews
    add_column :reviews, :review_text, :string
  end
end
