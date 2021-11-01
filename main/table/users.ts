export const users : string = 

`
DROP TABLE IF EXISTS USERS;
CREATE TABLE IF NOT EXISTS USERS (

_id SERIAL NOT NULL,
first_name VARCHAR(20) NOT NULL,
last_name VARCHAR(20) NOT NULL,

email_address VARCHAR(50) UNIQUE NOT NULL,
username VARCHAR(20) UNIQUE NOT NULL,
about VARCHAR(300) DEFAULT 'Not Available',

matriculation_number VARCHAR(15) DEFAULT 'Not Available',


hash TEXT,
salt TEXT,
reset_password_token TEXT,
reset_password_expires TEXT,

department_id INT NOT NULL,
faculty_id INT NOT NULL,
level_id INT NOT NULL,
country_id INT NOT NULL,


last_logged_in_date DATE,
created_on DATE DEFAULT CURRENT_TIMESTAMP,
updated_on DATE DEFAULT CURRENT_TIMESTAMP,

slug VARCHAR(40) UNIQUE NOT NULL,


user_status_id INT NOT NULL,
user_profile_photo_id INT,
user_signature_id INT,

CONSTRAINT USERS_PKEY PRIMARY KEY(_id)

)

`;