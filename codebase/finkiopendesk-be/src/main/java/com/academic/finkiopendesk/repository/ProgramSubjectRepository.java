package com.academic.finkiopendesk.repository;

import com.academic.finkiopendesk.model.ProgramSubject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramSubjectRepository extends JpaSpecificationRepository<ProgramSubject, String>{

    @Query("""
        SELECT DISTINCT ps
        FROM ProgramSubject ps
        JOIN FETCH ps.program
        JOIN FETCH ps.subject
            LEFT JOIN FETCH ps.dependencies d
            LEFT JOIN FETCH d.subject
        WHERE ps.program.programId IN :programIds
    """)
    List<ProgramSubject> findWithProgramIds(@Param("programIds") List<String> programIds);
}
