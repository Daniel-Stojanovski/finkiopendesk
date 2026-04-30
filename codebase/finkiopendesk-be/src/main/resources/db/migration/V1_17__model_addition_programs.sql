CREATE TABLE program (
    program_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    alias_full_name_en VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,

    CONSTRAINT pk_program PRIMARY KEY (program_id)
);

CREATE TABLE profession_program (
    profession_program_id VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()::text,
    profession_id VARCHAR(255) NOT NULL,
    program_id VARCHAR(255) NOT NULL,
    applicable BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT pk_profession_program PRIMARY KEY (profession_program_id),

    CONSTRAINT fk_profession_program_profession_id
        FOREIGN KEY (profession_id) REFERENCES profession(profession_id),

    CONSTRAINT fk_profession_program_program_id
        FOREIGN KEY (program_id) REFERENCES program(program_id),

    CONSTRAINT uc_profession_program
        UNIQUE (profession_id, program_id)
);

INSERT INTO program (name, full_name, alias_full_name_en, description) VALUES
    ('SIIS', 'Софтверско Инженерство и Информациски Системи', 'SEIS / Software Engineering and Information Systems [mk]',
     'These studies aim to provide top-level engineering professionals to meet the growing demand for software engineers, especially programmers. Students in this program acquire knowledge that ensures high professional flexibility and a wide range of career opportunities wherever there is a need for analysis, specification, design, development, implementation, and programming, as well as project management and maintenance of software and information systems.
Graduates can build their careers in the software industry, the public and service sectors, and especially in software development companies, real-time information systems, mobile and hybrid applications, internet and cloud-based software, advanced user interfaces, and solutions related to the design and implementation of software systems.'
     ),
    ('SEIS', 'Software Engineering and Information Systems', 'SEIS / Software Engineering and Information Systems [en]',
     'English language teaching, these studies aim to provide top-level engineering professionals to meet the growing demand for software engineers, especially programmers. Students in this program acquire knowledge that ensures high professional flexibility and a wide range of career opportunities wherever there is a need for analysis, specification, design, development, implementation, and programming, as well as project management and maintenance of software and information systems.
Graduates can build their careers in the software industry, the public and service sectors, and especially in software development companies, real-time information systems, mobile and hybrid applications, internet and cloud-based software, advanced user interfaces, and solutions related to the design and implementation of software systems.'
     ),
    ('IMB', 'Интернет, Мрежи и Безбедност', 'INS / Internet, Network and Security',
     'Undergraduate studies in Internet, Networks and Security aim to provide top-level IT professionals to meet the growing demand for network engineers with practical knowledge in information security.
These studies will produce professionals primarily focused on the design and maintenance of information and communication infrastructure in the economy—especially in companies that rely on the Internet and other communication infrastructures.
In addition to basic infrastructure, a key focus is on deploying and maintaining higher-level services in network environments, as well as protecting systems and users from malicious attacks.'
     ),
    ('PIT', 'Примена на Информациски Технологии', 'AIT / Applied Information Technologies',
     'Undergraduate studies in Applied Information Technologies aim to provide top-level IT professionals who, in addition to technical knowledge, also possess business knowledge and an entrepreneurial mindset.
These studies produce professionals who understand tools and principles of project management involving significant use of IT, as well as the application of modern IT tools in managing projects or enterprises.
Graduates will be capable of supporting systems that use innovative technologies at the application level.'
     ),
    ('IE', 'Информатичка Едукација', 'ITE / Information Technology Education',
     'These studies are intended to create highly qualified professionals in the field of informatics education, primarily in secondary schools.
Such professionals are prepared to transfer the latest IT knowledge to students, enabling a higher level of IT literacy among high school students and improving the knowledge level of future university entrants in informatics-related programs.'
     ),
    ('KI', 'Компјутерско Инженерство', 'CE / Computer Engineering',
     'Undergraduate studies in this program aim to provide top-level engineering professionals to meet the growing demand for computer engineers.
Students acquire knowledge that ensures high professional flexibility and a wide range of career opportunities wherever there is a need for designing, implementing, and maintaining computer systems.
Graduates can build careers in industry, public and service sectors, especially in companies developing computer systems, real-time systems, telecommunications support systems, internet-based services, advanced user interfaces, and application solutions related to system design and implementation.'
     ),
    ('KN', 'Компјутерски Науки', 'CS / Computer Science',
     'Undergraduate studies in Computer Science aim to provide top-level professionals to meet the growing demand for engineers in informatics and computer engineering.
Students gain knowledge that enables strong problem-solving and critical thinking skills, which they can apply to solving complex computational problems.
Graduates can easily find employment in companies and research centers. In addition to being trained in developing, implementing, and maintaining various software applications, they also have the foundation to pursue postgraduate studies and participate in interdisciplinary projects in science and technology.'
     ),
    ('SSP', 'Стручни Студии за Програмирање', 'VSP / Vocational Studies in Programming',
     'The goal of this study program is to respond to industry demands by providing trained programmers ready to enter the job market.
The rapid development in the field requires continuous updates and modifications of higher education courses to include new advancements and align with industry needs.
The program includes practical courses designed to help students acquire the necessary skills for designing, developing, and testing software applications.
It provides education for programmers who can not only meet the needs of the rapidly growing software industry but also contribute to its further development.
The program also prepares students for lifelong learning, enabling them to keep up with changes in the software industry.
It is designed in a way that allows students who successfully complete it to continue their education in other programs at FINKI and obtain a higher level of education.'
     );

INSERT INTO profession_program (profession_id, program_id, applicable)
SELECT
    p.profession_id,
    pr.program_id,
    false
FROM profession p
    CROSS JOIN program pr
        ON CONFLICT (profession_id, program_id) DO NOTHING;

--DUMMY INSERT--
WITH prof AS (
    SELECT profession_id,
           ROW_NUMBER() OVER (ORDER BY profession_id) AS prn
    FROM profession
),
     prog AS (
         SELECT program_id,
                ROW_NUMBER() OVER (ORDER BY program_id) AS grn,
                 COUNT(*) OVER () AS total_programs
         FROM program
     ),
     pairs AS (
         SELECT
             p.profession_id,
             pr.program_id
         FROM prof p
                  JOIN prog pr ON pr.grn IN (
             ((p.prn - 1) % pr.total_programs) + 1,
    (p.prn % pr.total_programs) + 1
    )
    )
UPDATE profession_program pp
SET applicable = true
    FROM pairs x
WHERE pp.profession_id = x.profession_id
  AND pp.program_id = x.program_id;

ALTER TABLE users
    ADD COLUMN selected_program_id VARCHAR(255),

    ADD CONSTRAINT fk_user_selected_program
        FOREIGN KEY (selected_program_id)
            REFERENCES program(program_id);