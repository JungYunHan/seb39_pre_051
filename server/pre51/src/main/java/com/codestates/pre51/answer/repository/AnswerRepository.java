package com.codestates.pre51.answer.repository;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    //List<Answer> findByQuestion(@Param(value = "answerQuestions") Question question);
    //List<Answer> findByQuestion(@Param(value = "question_id") long question_id);
    List<Answer> findAllByAnswerQuestions(Question question);
}
