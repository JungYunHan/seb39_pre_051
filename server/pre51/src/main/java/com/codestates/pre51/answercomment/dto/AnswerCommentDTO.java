package com.codestates.pre51.answercomment.dto;

import com.codestates.pre51.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class AnswerCommentDTO {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        private long answerCommentWriterId;

        private String answerCommentContent;

        private Answer answer;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        private long answerCommentId;
        private String answerCommentContent;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{
        private long answerCommentId;
        private long answerCommentWriterId;
        private String answerCommentContent;
        private LocalDateTime answerCommentCreatedAt;
        private LocalDateTime answerCommentModifiedAt;
    }
}
