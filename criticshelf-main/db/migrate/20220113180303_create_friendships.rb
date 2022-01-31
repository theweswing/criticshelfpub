class CreateFriendships < ActiveRecord::Migration[6.1]
  def change
    create_table :friendships do |t|
      t.references :sender
      t.references :receiver
      t.boolean :accepted
      t.timestamps
    end
  end
end
