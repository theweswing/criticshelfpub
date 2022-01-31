class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    # drop_table :recipes
    # drop_table :users
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.string :phone
      t.date :birthday
      t.timestamps
    end
  end
end
