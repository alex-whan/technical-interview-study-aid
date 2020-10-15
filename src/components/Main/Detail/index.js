// Detail View - Modal

// View should display the question in full, as well as:
//    -Answers (hidden/toggle option to display)
//    -Notes *if user is logged in* (hidden/toggle option to display)
//      - Notes should be an editable field and include a save/update button to update persistent data
//      - Cancel button should revert to last save upon closing (disregarding any edits).

import React, { Children, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { closeQuestion } from '../../../store/questions';
import Notes from '../Notes';
import './detail.scss';


function parseQuestion(data) {
  let target = data.questionAnswer;
  let parsedData = JSON.parse(target);
  // console.log('Parsed Data:', parsedData);
  return parsedData;
}

// questionObject = activeQuestion
// will need activeQuestion.id to get the appropriate Notes
// activeQuestion.notes - assuming they match with the user?
// Do a check for the notes to see if they exist, and check the user?

const Detail = ({ showModal, questionObject, closeQuestion, isLoggedIn }) => {
  const showHideClassName = showModal
    ? 'modal display-block'
    : 'modal display-none';

  const [hideAnswer, setHideAnswer] = useState(true);
  const [hideNotes, setHideNotes] = useState(true);

  function toggleAnswer() {
    setHideAnswer(!hideAnswer);
  }

  function toggleNotes() {
    setHideNotes(!hideNotes);
  }

  function closeAndReset() {
    closeQuestion();
    setHideAnswer(true);
    setHideNotes(true);
  }

  const id = questionObject.id;
  const category = questionObject.category;
  const question = questionObject ? parseQuestion(questionObject).question : '';
  const answer = questionObject ? parseQuestion(questionObject).answer : '';

  if (isLoggedIn) {
    return (
      <Modal
        show={showModal}
        onHide={closeAndReset}
        className={showHideClassName}
      >
        <Modal.Header>
          <Modal.Title
          className="m_title"
          >{question}</Modal.Title>
        </Modal.Header>
        <section className="modal-main">
          <Button 
          onClick={toggleAnswer}
          className="m_a_button"
          variant='outline-secondary'
          >
            {!hideAnswer ? 'Hide Answer' : 'View Answer'}
          </Button>
          <br />
          <p
          className='answer'
          >
          {!hideAnswer && answer}
          </p>
          <br />
          <Button 
          onClick={toggleNotes}
          className="m_n_button"
          variant='outline-info'
          >
            {!hideNotes ? 'Hide Notes' : 'View Notes'}
          </Button>
          <br />
          <p
          className="notes"
          >
          {!hideNotes && <Notes />}
          </p>
          <br />
          {/* <button onClick={closeAndReset}>Close</button> */}
        </section>
      </Modal>
    );
  } else {
    return (
      <Modal
        show={showModal}
        onHide={closeAndReset}
        className={showHideClassName}
      >
        <Modal.Header>
          <Modal.Title
          className="m_title"
          >{question}</Modal.Title>
        </Modal.Header>
        <section className="modal-main">
          <Button 
          onClick={toggleAnswer}
          variant='outline-secondary'
          className="m_a_button"
          >
          {!hideAnswer ? 'Hide Answer' : 'View Answer'}
          </Button>
          <br />
          <p
          className='answer'
          >
          {!hideAnswer && answer}
          </p>
          <br />
          {/* <button onClick={closeAndReset}>Close</button> */}
        </section>
      </Modal>
    );
  }
};

const mapStateToProps = state => {
  return {
    questionObject: state.questions.activeQuestion,
    showModal: state.questions.showModal,
    isLoggedIn: state.user.loggedIn,
  };
};

const mapDispatchToProps = { closeQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
