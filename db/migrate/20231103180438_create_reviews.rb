class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :content
      t.integer :rating
      t.belongs_to :game
      t.belongs_to :user

      t.timestamps
    end
  end
end
