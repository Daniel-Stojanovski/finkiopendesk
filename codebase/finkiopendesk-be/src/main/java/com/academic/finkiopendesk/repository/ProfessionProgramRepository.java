package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.ProfessionProgram;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfessionProgramRepository extends JpaSpecificationRepository<ProfessionProgram, String> {

    @Query("""
        SELECT pp FROM ProfessionProgram pp
        JOIN FETCH pp.program
        WHERE pp.profession.professionId = :professionId
    """)
    List<ProfessionProgram> findByProfession(String professionId);

    @Query("""
        SELECT pp FROM ProfessionProgram pp
        JOIN FETCH pp.program
        WHERE pp.profession.professionId = :professionId
        AND pp.applicable = true
    """)
    List<ProfessionProgram> findApplicableProgramsInProfession(@Param("professionId") String professionId);


    @Query("""
        SELECT pp FROM ProfessionProgram pp
        JOIN FETCH pp.profession
        WHERE pp.program.programId = :programId
        AND pp.applicable = true
    """)
    List<ProfessionProgram> findCoveredProfessionsInProgram(@Param("programId") String programId);
}