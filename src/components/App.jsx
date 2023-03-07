import { useState } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';
import css from './App.module.css';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickButton = type => {

    switch (type) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        throw new Error();
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedback = () => {
    const totalFeedback = countTotalFeedback();
    let result = 0;

    if (totalFeedback > 0) {
      result = Math.trunc((good / totalFeedback) * 100);
    }

    return `${result}%`;
  };

  return (
    <div className={css.container}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onLeaveFeedback={handleClickButton}
          />
        </Section>

        <Section title="Statistics">
          {countTotalFeedback() > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={countTotalFeedback()}
              positivePercentage={countPositiveFeedback()}
            />
          ) : (
            <Notification message="There is no feedback yet" />
          )}
        </Section>
    </div>
  );
}
