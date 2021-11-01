export const order_item : string = 

`
DROP TABLE IF EXISTS ORDER_ITEM;
CREATE TABLE IF NOT EXISTS ORDER_ITEM (

item_id SERIAL NOT NULL ,
order_id SERIAL NOT NULL ,
quantity INT NOT NULL ,
amount INT NOT NULL ,
unit_price INT NOT NULL ,

CONSTRAINT ORDER_ITEM_PKEY PRIMARY KEY(item_id , order_id)

)

`;