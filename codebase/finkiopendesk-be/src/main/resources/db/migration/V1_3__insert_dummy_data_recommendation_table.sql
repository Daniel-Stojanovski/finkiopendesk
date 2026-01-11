-- DUMMY INSERT --
WITH prof_row AS (
    SELECT profession_id, ROW_NUMBER() OVER (ORDER BY profession_id) AS rn
    FROM profession
),
     subj_row AS (
         SELECT subject_id, ROW_NUMBER() OVER (ORDER BY subject_id) AS rn
         FROM subject
     )

INSERT INTO profession_subject_recommendation (profession_profession_id, subject_subject_id)
SELECT p.profession_id, s.subject_id
FROM prof_row p
         JOIN subj_row s
              ON s.rn BETWEEN p.rn AND p.rn + 2;