 https://youtu.be/ymb9gsl_x1U

CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  actual_name VARCHAR(255) ,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  email_verified BOOLEAN,
  date_created DATE,
  last_login DATE,
  is_owner BOOLEAN
)

-- location
-- rating
-- photos
-- equipment available
--availability 
--need to figure out how to get distance from user
CREATE TABLE gyms (
  gid SERIAL PRIMARY KEY,
  gymname VARCHAR(255),
  owner_id INT REFERENCES users(uid),
  owner_username VARCHAR REFERENCES users(username),
  body VARCHAR,
  rating REAL,
  membership_cost REAL,
  date_created TIMESTAMP
)

CREATE TABLE reviews (
  rid SERIAL PRIMARY KEY,
  comment VARCHAR(255) ,
  author VARCHAR REFERENCES users(username),
  gym_id INT REFERENCES gyms(gid),
  rating REAL,
  description VARCHAR,
  membership_cost REAL,
  date_created TIMESTAMP
)