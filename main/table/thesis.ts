export const thesis : string = 

`
DROP TABLE IF EXISTS THESIS;
CREATE TABLE IF NOT EXISTS THESIS (

_id SERIAL NOT NULL,

title VARCHAR(300) NOT NULL,
price VARCHAR(100) NOT NULL,
number_of_page VARCHAR(12) NOT NULL,
content VARCHAR(5000) NOT NULL DEFAULT 'Not Available',
grade_id INT NOT NULL,

department_id INT NOT NULL,
faculty_id INT NOT NULL,

publisher_id INT NOT NULL,
supervisor VARCHAR(100) NOT NULL DEFAULT 'Not Available',
publication_year VARCHAR(10) NOT NULL,

created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
slug VARCHAR(40) UNIQUE NOT NULL,


author_name VARCHAR(100) NOT NULL DEFAULT 'Not Available' ,
author_id INT NOT NULL,
user_id INT NOT NULL,

status_id INT NOT NULL,
cover_image_id INT NOT NULL,

CONSTRAINT THESIS_PKEY PRIMARY KEY(thesis_id)	

)	


`;