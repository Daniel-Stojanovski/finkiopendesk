INSERT INTO tag (name) VALUES
--     SIIS
    ('SIIS_F23L1W'),
    ('SIIS_F23L1S'),
--     ('SIIS3F23L1W'),
--     ('SIIS3F23L1S'),
--     ('SIIS4F23L1W'),
--     ('SIIS4F23L1S'),

    ('SIIS_F23L2W'),
    ('SIIS_F23L2S'),
--     ('SIIS3F23L2W'),
--     ('SIIS3F23L2S'),
--     ('SIIS4F23L2W'),
--     ('SIIS4F23L2S'),

    ('SIIS_F23L3W'),
    ('SIIS_F23L3S'),
--     ('SIIS3F23L3W'),
--     ('SIIS3F23L3S'),
--     ('SIIS4F23L3W'),
--     ('SIIS4F23L3S'),

--     SEIS
    ('SEIS_F23L1W'),
    ('SEIS_F23L1S'),
--     ('SEIS3F23L1W'),
--     ('SEIS3F23L1S'),
--     ('SEIS4F23L1W'),
--     ('SEIS4F23L1S'),

    ('SEIS_F23L2W'),
    ('SEIS_F23L2S'),
--     ('SEIS3F23L2W'),
--     ('SEIS3F23L2S'),
--     ('SEIS4F23L2W'),
--     ('SEIS4F23L2S'),

    ('SEIS_F23L3W'),
    ('SEIS_F23L3S'),
--     ('SEIS3F23L3W'),
--     ('SEIS3F23L3S'),
--     ('SEIS4F23L3W'),
--     ('SEIS4F23L3S'),

--     IMB
    ('IMB_F23L1W'),
    ('IMB_F23L1S'),
--     ('IMB3F23L1W'),
--     ('IMB3F23L1S'),
--     ('IMB4F23L1W'),
--     ('IMB4F23L1S'),

    ('IMB_F23L2W'),
    ('IMB_F23L2S'),
--     ('IMB3F23L2W'),
--     ('IMB3F23L2S'),
--     ('IMB4F23L2W'),
--     ('IMB4F23L2S'),

    ('IMB_F23L3W'),
    ('IMB_F23L3S'),
--     ('IMB3F23L3W'),
--     ('IMB3F23L3S'),
--     ('IMB4F23L3W'),
--     ('IMB4F23L3S'),

--     PIT
    ('PIT_F23L1W'),
    ('PIT_F23L1S'),
--     ('PIT3F23L1W'),
--     ('PIT3F23L1S'),
--     ('PIT4F23L1W'),
--     ('PIT4F23L1S'),

    ('PIT_F23L2W'),
    ('PIT_F23L2S'),
--     ('PIT3F23L2W'),
--     ('PIT3F23L2S'),
--     ('PIT4F23L2W'),
--     ('PIT4F23L2S'),

    ('PIT_F23L3W'),
    ('PIT_F23L3S'),
--     ('PIT3F23L3W'),
--     ('PIT3F23L3S'),
--     ('PIT4F23L3W'),
--     ('PIT4F23L3S'),

--     IE
    ('IE_F23L1W'),
    ('IE_F23L1S'),
--     ('IE3F23L1W'),
--     ('IE3F23L1S'),
--     ('IE4F23L1W'),
--     ('IE4F23L1S'),

    ('IE_F23L2W'),
    ('IE_F23L2S'),
--     ('IE3F23L2W'),
--     ('IE3F23L2S'),
--     ('IE4F23L2W'),
--     ('IE4F23L2S'),

    ('IE_F23L3W'),
    ('IE_F23L3S'),
--     ('IE3F23L3W'),
--     ('IE3F23L3S'),
--     ('IE4F23L3W'),
--     ('IE4F23L3S'),

--     KI
    ('KI_F23L1W'),
    ('KI_F23L1S'),
--     ('KI3F23L1W'),
--     ('KI3F23L1S'),
--     ('KI4F23L1W'),
--     ('KI4F23L1S'),

    ('KI_F23L2W'),
    ('KI_F23L2S'),
--     ('KI3F23L2W'),
--     ('KI3F23L2S'),
--     ('KI4F23L2W'),
--     ('KI4F23L2S'),

    ('KI_F23L3W'),
    ('KI_F23L3S'),
--     ('KI3F23L3W'),
--     ('KI3F23L3S'),
--     ('KI4F23L3W'),
--     ('KI4F23L3S'),

--     KN
    ('KN_F23L1W'),
    ('KN_F23L1S'),
--     ('KN3F23L1W'),
--     ('KN3F23L1S'),
--     ('KN4F23L1W'),
--     ('KN4F23L1S'),

    ('KN_F23L2W'),
    ('KN_F23L2S'),
--     ('KN3F23L2W'),
--     ('KN3F23L2S'),
--     ('KN4F23L2W'),
--     ('KN4F23L2S'),

    ('KN_F23L3W'),
    ('KN_F23L3S'),
--     ('KN3F23L3W'),
--     ('KN3F23L3S'),
--     ('KN4F23L3W'),
--     ('KN4F23L3S'),

--     SSP
    ('SSP_F23L1W'),
    ('SSP_F23L1S'),
--     ('SSP2F23L1W'),
--     ('SSP2F23L1S'),
--     ('SSP3F23L1W'),
--     ('SSP3F23L1S'),

    ('SSP_F23L2W'),
    ('SSP_F23L2S'),
--     ('SSP2F23L2W'),
--     ('SSP2F23L2S'),
--     ('SSP3F23L2W'),
--     ('SSP3F23L2S'),

    ('SSP_F23L3W'),
    ('SSP_F23L3S');
--     ('SSP2F23L3W'),
--     ('SSP2F23L3S'),
--     ('SSP3F23L3W'),
--     ('SSP3F23L3S');


INSERT INTO profession_discussion (profession_discussion_id, name, description, profession_id)
SELECT
    gen_random_uuid()::text,
    name,
    'Discussion for ' || name,
    profession_id
FROM profession;


INSERT INTO subject_discussion (subject_discussion_id, name, description, subject_tag_id)
SELECT
    gen_random_uuid()::text,
    s.name,
    'Discussion for ' || s.name || ' - ' || t.name,
    st.subject_tag_id
FROM subject_tag st
     JOIN subject s ON s.subject_id = st.subject_subject_id
         JOIN tag t ON t.tag_id = st.tag_tag_id;


INSERT INTO subject_tag (subject_subject_id, tag_tag_id)
SELECT s.subject_id, t.tag_id
FROM subject s
         CROSS JOIN tag t
    ON CONFLICT DO NOTHING;