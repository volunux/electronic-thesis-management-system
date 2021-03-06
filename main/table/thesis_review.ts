export const thesisReview : string =

`
DROP TABLE IF EXISTS THESIS_REVIEW;
CREATE TABLE IF NOT EXISTS THESIS_REVIEW (

thesis_review_id SERIAL NOT NULL,
text VARCHAR(500) NOT NULL,


created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
thesis_review_no INT UNIQUE NOT NULL,
slug VARCHAR(40) UNIQUE NOT NULL,


entry_id INT NOT NULL,
user_id INT NOT NULL,

status_id INT NOT NULL,


CONSTRAINT THESIS_REVIEW_PKEY PRIMARY KEY(thesis_review_id)	

)	

`;