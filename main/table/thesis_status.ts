export const status : string =

`
DROP TABLE IF EXISTS THESIS_STATUS;
CREATE TABLE IF NOT EXISTS THESIS_STATUS (

_id SERIAL NOT NULL,
name VARCHAR(150) NOT NULL,
word VARCHAR(20) NOT NULL,
description VARCHAR(250) DEFAULT 'Not Available',

created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
slug VARCHAR(40) UNIQUE NOT NULL,

user_id INT NOT NULL,

CONSTRAINT THESIS_STATUS_PKEY PRIMARY KEY(_id)	)	

`;