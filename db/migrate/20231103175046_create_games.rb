class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :publisher
      t.string :game_img
      t.integer :release_year

      t.timestamps
    end
  end
end
