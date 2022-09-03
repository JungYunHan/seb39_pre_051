import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faCode,
  faFileCode,
  faHeading,
  faImage,
  faItalic,
  faLink,
  faList,
  faListNumeric,
  faQuoteRight,
  faRedo,
  faSquarePollHorizontal,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {readQuestion,createAnswer} from '../redux/slice/questionSlice'


const AddAnswer = ({questionId}) => {
  const textAreaInput = useRef();
  const themeState = useSelector((state) => state.themeSlice).theme;
  const userState = useSelector((state) => state.userInfoSlice)
  const dispatch = useDispatch();

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const enteredAnswer = textAreaInput.current.value;
    dispatch(createAnswer({questionId, answer : {
      answerWriterId : 1,
      answerContent : enteredAnswer,
    }}))
    dispatch(readQuestion(questionId))
    textAreaInput.current.value = ' '
  };
  return (
    <AddAnswerLayout>
      <HeadLine themeState={themeState}>Your Answer</HeadLine>
      <QuestionForm themeState={themeState} onSubmit={(e)=>handleAnswerSubmit(e)}>
        <QuestionBodyContainer>
          <QuestionBodyButton>
            <FontAwesomeIcon className='md-button' icon={faBold} />
            <FontAwesomeIcon className='md-button md-space' icon={faItalic} />
            <FontAwesomeIcon className='md-button' icon={faLink} />
            <FontAwesomeIcon className='md-button' icon={faQuoteRight} />
            <FontAwesomeIcon className='md-button' icon={faCode} />
            <FontAwesomeIcon className='md-button' icon={faImage} />
            <FontAwesomeIcon className='md-button md-space' icon={faFileCode} />
            <FontAwesomeIcon className='md-button' icon={faListNumeric} />
            <FontAwesomeIcon className='md-button' icon={faList} />
            <FontAwesomeIcon className='md-button' icon={faHeading} />
            <FontAwesomeIcon
              className='md-button md-space'
              icon={faSquarePollHorizontal}
            />
            <FontAwesomeIcon className='md-button' icon={faUndo} />
            <FontAwesomeIcon className='md-button' icon={faRedo} />
            <QuestionFormattingTipsButton>
              Hide formatting tips
            </QuestionFormattingTipsButton>
          </QuestionBodyButton>
          <QuestionBodyDiv themeState={themeState}>
              <QuestionBodyTextArea
                type='text'
                ref={textAreaInput}
                themeState={themeState}
              />
              <QuestionBodyResize themeState={themeState}></QuestionBodyResize>
              <button>Post Your Answer</button>
          </QuestionBodyDiv>
        </QuestionBodyContainer>
      </QuestionForm>
    </AddAnswerLayout>
  );
};

const AddAnswerLayout = styled.div`
  margin-left: 1rem;
`;

const HeadLine = styled.div`
  width: 88rem;
  height: 8rem;
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  margin-left: 1.7rem;
  color : ${(props)=>props.themeState === 'light' ? '#0c0d0e' : '#F2F2F3' };
`;

const QuestionForm = styled.form`
  width: 88rem;
  padding: 1.6rem;
  background-color: ${(props)=>props.themeState === 'light' ? '#FFFFFF' : '#2D2D2D' };
`;

const QuestionBodyContainer = styled.div`
  margin-bottom: 1.6rem;
`;

const QuestionBodyButton = styled.div`
  width: 100%;
  min-height: 4.4rem;
  border: 1px solid #babfc4;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  color: #494a4a;

  .md-button {
    max-width: 2.8rem;
    height: 1.5rem;
    flex: 10 0 2.3rem;
    margin-right: 0.5rem;
    padding: 1.2rem 0 0 1.2rem;
    cursor: pointer;
  }

  .md-space {
    margin-right: 3.3rem;
  }
`;

const QuestionFormattingTipsButton = styled.div`
  display: inline-block;
  position: relative;
  left: 21.8rem;
  bottom: 0.1rem;
  padding: 0.8rem 1.04rem;
  font-size: 1.3rem;
  line-height: 1.5;
  border: 0.1rem solid transparent;
  border-radius: 0.3rem;
  color: #3b4045;
  background-color: #e3e6e8;
  text-decoration: none;
  cursor: pointer;
`;

const QuestionBodyDiv = styled.div`
  position: relative;
  button {
    cursor: pointer;
    background-color: ${(props) => props.themeState==='light' ? '#0a95ff' : '#0C63A9'};
    color: #ffffff;
    border: ${(props)=>props.themeState ==='light' ? '1px solid #ffffff': 'none'};
    border-radius: 0.3rem;
    width: 12.9rem;
    height: 3.78rem;
    text-align: center;
    font-size: 1.3rem;
    line-height: 1.5rem;
    padding: 1rem;
    text-decoration: none;
    margin-top: 4rem;
    :hover {
      background-color: #0074cc;
    }
  }
`;

const QuestionBodyTextArea = styled.textarea`
    padding: 1rem;
    margin: -0.1rem 0 0;
    height: 20rem;
    border: 1px solid #babfc4;
    line-height: 1.3;
    width: 100%;
    font-size: 1.6rem;
    resize: none;
    background-color:${(props)=>props.themeState ==='light' ? '#FFFFFF' : '#2D2D2D'};
    color: ${(props)=>props.themeState ==='light' ? "#0C0D0E" : "#F2F2F3"};
`;

const QuestionBodyResize = styled.div`
  width: 100%;
  height: 1.1rem;
  border: 1px solid #babfc4;
  border-width: 0 1px 1px;
  margin: -0.3rem 0 0;
  cursor: s-resize;
  overflow: hidden;
  background-color: ${(props)=> props.themeState ==='light' ? '#f1f2f3' : '#3D3D3C'};
`;


export default AddAnswer;
