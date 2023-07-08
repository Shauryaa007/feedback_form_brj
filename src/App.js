import React from 'react';
import axios from 'axios';
import { FormControlLabel, Radio, RadioGroup, Button } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      choices: [],
    };
  }

  componentDidMount() {
    // Fetch the feedback questions and choices from the API
    axios
      .get('https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1')
      .then(response => {
        const questions = response.data.feedbackQuestions;
        //console.log(response.data.feedbackQuestions)
        const choices = Array(questions.length).fill('');
        this.setState({ questions, choices });
      })
      .catch(error => {
        console.error('Error fetching feedback questions:', error);
      });
  }

  handleChoiceChange = (index, choice) => {
    this.setState(prevState => {
      const choices = [...prevState.choices];
      choices[index] = choice;
      return { choices };
    });
  };

  handleSubmit = () => {
    // Prepare feedback data for submission
    const { questions, choices } = this.state;
    const feedback = { questions, choices };
    console.log(feedback); // Display feedback data in the console
  };

  render() {
    const { questions, choices } = this.state;

    return (
      <div>
        <h2>Feedback Form</h2>
        <form>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question}</p>
              <RadioGroup
                name={`question-${index}`}
                value={choices[index]}
                onChange={event => this.handleChoiceChange(index, event.target.value)}
              >
                <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
                <FormControlLabel value="Good" control={<Radio />} label="Good" />
                <FormControlLabel value="Average" control={<Radio />} label="Average" />
                <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
              </RadioGroup>
            </div>
          ))}
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default App;