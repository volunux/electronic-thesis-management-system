export const country : string = 

`
DROP TABLE IF EXISTS COUNTRY;
CREATE TABLE IF NOT EXISTS COUNTRY (

_id SERIAL NOT NULL,
name VARCHAR(150) NOT NULL,
abbreviation VARCHAR(8) NOT NULL,
description VARCHAR(250) DEFAULT 'Not Available',

created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
slug VARCHAR(40) UNIQUE NOT NULL,

user_id INT NOT NULL,
status_id INT NOT NULL,	

CONSTRAINT COUNTRY_PKEY PRIMARY KEY(_id)

)

`;