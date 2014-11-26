# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141126012433) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "images", force: true do |t|
    t.string   "url",          null: false
    t.string   "alt_tag"
    t.integer  "imageable_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "images", ["imageable_id"], name: "index_images_on_imageable_id", using: :btree

  create_table "lairs", force: true do |t|
    t.string   "title",          null: false
    t.text     "description",    null: false
    t.integer  "rate",           null: false
    t.integer  "owner_id",       null: false
    t.string   "lair_type",      null: false
    t.string   "room_type",      null: false
    t.string   "street_address", null: false
    t.string   "city",           null: false
    t.string   "state",          null: false
    t.string   "country",        null: false
    t.float    "latitude",       null: false
    t.float    "longitude",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "lairs", ["lair_type"], name: "index_lairs_on_lair_type", using: :btree
  add_index "lairs", ["latitude"], name: "index_lairs_on_latitude", using: :btree
  add_index "lairs", ["longitude"], name: "index_lairs_on_longitude", using: :btree
  add_index "lairs", ["owner_id"], name: "index_lairs_on_owner_id", using: :btree
  add_index "lairs", ["rate"], name: "index_lairs_on_rate", using: :btree
  add_index "lairs", ["room_type"], name: "index_lairs_on_room_type", using: :btree

  create_table "users", force: true do |t|
    t.string   "first_name",      null: false
    t.string   "last_name",       null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["password_digest"], name: "index_users_on_password_digest", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
