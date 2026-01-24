INSERT INTO tag (name) VALUES
--     SIIS
    ('SIIS_F23L1W'),
    ('SIIS_F23L1S'),

    ('SIIS_F23L2W'),
    ('SIIS_F23L2S'),

    ('SIIS_F23L3W'),
    ('SIIS_F23L3S'),

--     SEIS
    ('SEIS_F23L1W'),
    ('SEIS_F23L1S'),

    ('SEIS_F23L2W'),
    ('SEIS_F23L2S'),

    ('SEIS_F23L3W'),
    ('SEIS_F23L3S'),

--     IMB
    ('IMB_F23L1W'),
    ('IMB_F23L1S'),

    ('IMB_F23L2W'),
    ('IMB_F23L2S'),

    ('IMB_F23L3W'),
    ('IMB_F23L3S'),

--     PIT
    ('PIT_F23L1W'),
    ('PIT_F23L1S'),

    ('PIT_F23L2W'),
    ('PIT_F23L2S'),

    ('PIT_F23L3W'),
    ('PIT_F23L3S'),

--     IE
    ('IE_F23L1W'),
    ('IE_F23L1S'),

    ('IE_F23L2W'),
    ('IE_F23L2S'),

    ('IE_F23L3W'),
    ('IE_F23L3S'),

--     KI
    ('KI_F23L1W'),
    ('KI_F23L1S'),

    ('KI_F23L2W'),
    ('KI_F23L2S'),

    ('KI_F23L3W'),
    ('KI_F23L3S'),

--     KN
    ('KN_F23L1W'),
    ('KN_F23L1S'),

    ('KN_F23L2W'),
    ('KN_F23L2S'),

    ('KN_F23L3W'),
    ('KN_F23L3S'),

--     SSP
    ('SSP_F23L1W'),
    ('SSP_F23L1S'),

    ('SSP_F23L2W'),
    ('SSP_F23L2S'),

    ('SSP_F23L3W'),
    ('SSP_F23L3S');


INSERT INTO profession_discussion (profession_discussion_id, name, description, profession_id)
SELECT
    gen_random_uuid()::text,
    name,
    'Discussion for ' || name,
    profession_id
FROM profession;


INSERT INTO subject_tag (subject_subject_id, tag_tag_id)
SELECT s.subject_id, t.tag_id
FROM subject s
    CROSS JOIN tag t
    ON CONFLICT DO NOTHING;
