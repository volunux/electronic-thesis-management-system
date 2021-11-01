export const payment_method : string = 

`
DROP TABLE IF EXISTS USER_ADDRESS;
CREATE TABLE IF NOT EXISTS USER_ADDRESS (

user_address_id SERIAL NOT NULL,
state VARCHAR(30) NOT NULL,
city VARCHAR(30) NOT NULL,
contact_address VARCHAR(300) NOT NULL,
phone_number VARCHAR(15) NOT NULL,
zip VARCHAR(10) NOT NULL,

created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
user_address_no INT UNIQUE NOT NULL ,
slug VARCHAR(40) UNIQUE NOT NULL,

user_id INT NOT NULL,
status_id INT NOT NULL,	

CONSTRAINT USER_ADDRESS_PKEY PRIMARY KEY(user_address_id)

)

`;