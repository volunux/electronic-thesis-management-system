export const order_status : string = 

`
DROP TABLE IF EXISTS ORDER_STATUS;
CREATE TABLE IF NOT EXISTS ORDER_STATUS (

order_status_id SERIAL NOT NULL ,
title VARCHAR(150) NOT NULL,
description VARCHAR(250) DEFAULT 'Not Available',

created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
order_status_no INT UNIQUE NOT NULL ,
slug VARCHAR(40) UNIQUE NOT NULL,

user_id INT NOT NULL,

CONSTRAINT ORDER_STATUS_PKEY PRIMARY KEY(order_status_id)

)

`;