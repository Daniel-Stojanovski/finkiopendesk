ALTER TABLE tag
    ADD COLUMN program VARCHAR(255),
    ADD COLUMN format VARCHAR(255),
    ADD COLUMN hardness VARCHAR(255),
    ADD COLUMN semester_type VARCHAR(255);

UPDATE tag SET
    program = split_part(name, '_', 1),
    format = substring(split_part(name, '_', 2) from 1 for 3),
    hardness = substring(split_part(name, '_', 2) from 4 for 2),
    semester_type = substring(split_part(name, '_', 2) from 6 for 1);

ALTER TABLE tag
    ALTER COLUMN program SET NOT NULL,
    ALTER COLUMN format SET NOT NULL,
    ALTER COLUMN hardness SET NOT NULL,
    ALTER COLUMN semester_type SET NOT NULL;