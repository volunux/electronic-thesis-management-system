export const payment_detail : string = 

`
DROP TABLE IF EXISTS PAYMENT_DETAIL;
CREATE TABLE IF NOT EXISTS PAYMENT_DETAIL (

payment_detail_id SERIAL NOT NULL,
card_last_four_number VARCHAR(4) NOT NULL,
exp_month VARCHAR(10) NOT NULL,
exp_year VARCHAR(10) NOT NULL,
bank_name VARCHAR(45) NOT NULL,
card_type VARCHAR(20) NOT NULL,

order_id INT NOT NULL,

CONSTRAINT PAYMENT_DETAIL_PKEY PRIMARY KEY(payment_detail_id)

)

`;