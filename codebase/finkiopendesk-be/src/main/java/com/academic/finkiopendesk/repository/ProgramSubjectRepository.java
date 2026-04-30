package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.ProgramSubject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramSubjectRepository extends JpaSpecificationRepository<ProgramSubject, String>{

    @Query("""
        SELECT ps
        FROM ProgramSubject ps
        JOIN FETCH ps.program
        JOIN FETCH ps.subject
        WHERE ps.program.programId IN :programIds
    """)
    List<ProgramSubject> findWithProgramIds(@Param("programIds") List<String> programIds);
}
