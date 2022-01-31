class CreateArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :artworks do |t|
      t.string :identifier
      t.string :name
      t.references :discipline
      t.timestamps
    end
    add_column :reviews, :artwork_id, :integer
  end
end
