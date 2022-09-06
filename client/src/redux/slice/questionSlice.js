import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let initialState = {
  status: null,
  error: null,
  questionId: null,
  questionWriterId: null,
  questionContent: null,
  questionLikesCount: null,
  questionCreatedAt: [],
  questionModifiedAt: [],
  questionTitle: null,
  questionQuestionComments: [],
  questionAnswers: [],
  questionWriter: {},
  questionBestAnswerId: null,
  likesPressedQuestionIdFromToken: 0,
  likesPressedAnswersIdFromToken: [],
  // questionTags: null
};

//질문 R
export const readQuestion = createAsyncThunk(
  'questions/readQuestion',
  async (questionInfo) => {
    if (questionInfo.userId) {
      console.log(questionInfo.userId, typeof questionInfo.userId);
      const response = await axios
        .get(`/questions/${questionInfo.questionId}/${questionInfo.userId}`)
        .catch((err) => console.log(err));
      const data = await response.data.data;
      console.log(data);
      return data;
    } else {
      console.log(questionInfo);
      const response = await axios
        .get(`/questions/${questionInfo.questionId}/0`)
        .catch((err) => console.log(err));
      const data = await response.data.data;
      console.log(data);
      return data;
    }
  }
);

//답변 C
export const createAnswer = createAsyncThunk(
  'questions/createAnswer',
  async (answerData) => {
    const response = await axios.post(
      `/answer/${answerData.questionId}`,
      answerData.answer,
      {
        headers: answerData.token,
      }
    );
    const data = await response.data;
    console.log(data);
    return data;
  }
);

export const addQuestionComment = createAsyncThunk(
  'questions/addQuestionComment',
  async (questionCommentData) => {
    console.log(questionCommentData.questionId, {
      questionCommentWriterId:
        questionCommentData.questionComment.questionCommentWriterId,
      questionCommentContent:
        questionCommentData.questionComment.questionCommentContent,
    });
    const response = await axios.post(
      `/questionComments/${questionCommentData.questionId}`,
      questionCommentData.questionComment
    );
    const data = await response.data;
    console.log(data);
    return data;
  }
);

export const addAnswerComment = createAsyncThunk(
  'questions/addAnswerComment',
  async (answerCommentData) => {
    console.log(answerCommentData);
    const response = await axios.post(
      `/answerComments/${answerCommentData.answerId}`,
      answerCommentData.answerComment
    );
    const data = await response.data;
    return data;
  }
);

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readQuestion.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(readQuestion.fulfilled, (state, action) => {
      state.questionId = action.payload.questionId;
      state.questionWriterId = action.payload.questionWriterId;
      state.questionContent = action.payload.questionContent;
      state.questionLikesCount = action.payload.questionLikesCount;
      state.questionCreatedAt = action.payload.questionCreatedAt;
      state.questionModifiedAt = action.payload.questionModifiedAt;
      state.questionTitle = action.payload.questionTitle;
      state.questionQuestionComments = action.payload.questionQuestionComments;
      if (action.payload.questionBestAnswerId === 0) {
        state.questionAnswers = action.payload.questionAnswers;
      } else {
        const origin = action.payload.questionAnswers;
        const sortedByLikesAnswer = origin.sort((a, b) =>
          a.answerLikes > b.answerLikes ? -1 : 1
        );
        const bestAnswerIndex = sortedByLikesAnswer.findIndex(
          (el) => el.answerId === action.payload.questionBestAnswerId
        );
        const sortedAnswer = [
          sortedByLikesAnswer[bestAnswerIndex],
          ...sortedByLikesAnswer.slice(0, bestAnswerIndex),
          ...sortedByLikesAnswer.slice(bestAnswerIndex + 1),
        ];
        state.questionAnswers = sortedAnswer;
      }
      state.questionBestAnswerId = action.payload.questionBestAnswerId;
      state.questionQuestionComments = action.payload.questionQuestionComments;
      state.questionWriter = action.payload.questionWriter;
      state.likesPressedQuestionIdFromToken =
        action.payload.likesPressedQuestionIdFromToken;
      state.likesPressedAnswersIdFromToken =
        action.payload.likesPressedAnswersIdFromToken;
      // state.questionTags = action.payload.questionTags
    });
    builder.addCase(readQuestion.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(createAnswer.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(createAnswer.fulfilled, (state, action) => {
      // state.answer.push(action.pay)
    });
  },
});

export default questionSlice.reducer;
