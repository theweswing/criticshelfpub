class AddCountryToProfileAndUniquesToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :country, :string
    add_column :reviews, :identifier, :string
  end
end
