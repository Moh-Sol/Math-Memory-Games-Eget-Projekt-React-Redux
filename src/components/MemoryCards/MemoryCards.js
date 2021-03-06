import styles from './memoryCard.module.scss'
import FormulasCards from '../FormulasCards/FormulasCards';
import Timer from '../Timer/Timer';
import ResultsCards from '../ResultsCards/ResultsCards';
import GameFinished from '../GameFinished/GameFinished';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { sameCards, gameFinished, differentCards } from '../../actions/action';
import { useHistory } from 'react-router';
import infoIcon from '../../businessman.svg'
import Info from '../Info/Info'
import audioClick from '../../sounds/click1.mp3'
import audioWin from '../../sounds/win1.mp3'
import audioRight from '../../sounds/right1.mp3'
import audioFlip from '../../sounds/flip1.wav'
import audioWrong from '../../sounds/wrong2.mp3'

function MemoryCards() {


  const history = useHistory();
  const dispatch = useDispatch()

  const [formulaOrResult, setFormulaOrResult] = useState('')
  const [toggleInfo, setToggleInfo] = useState('')
  const [textMessage, setTextMessage] = useState('')

  const stateFirstReducer = useSelector(state => {
    return state.firstReducer
  })

  const stateSecondReducer = useSelector(state => {
    return state.secondReducer
  })



  useEffect(() => {
    let firstClassFrontNum = (stateFirstReducer.choosedCardsId[0] * 2)
    let firstClassBacktNum = ((stateFirstReducer.choosedCardsId[0] * 2) + 1)
    let secondClassFronttNum = (stateFirstReducer.choosedCardsId[1] * 2)
    let secondClassBacktNum = ((stateFirstReducer.choosedCardsId[1] * 2) + 1)
    let allSpan = document.querySelectorAll('span')
    if (stateFirstReducer.choosedCardsValue[0] !== stateFirstReducer.choosedCardsValue[1] && stateFirstReducer.choosedCardsValue[1] !== undefined) {



      setFormulaOrResult('')

      setTimeout(() => {
        dispatch(differentCards())

        allSpan[firstClassFrontNum].className = `${styles.front} ${styles.flip}`;
        allSpan[firstClassBacktNum].className = `${styles.back}`;
        allSpan[secondClassFronttNum].className = `${styles.front} ${styles.flip}`;
        allSpan[secondClassBacktNum].className =
          `${styles.back}`;
        let audio = new Audio(audioFlip)
        audio.play();
        setTextMessage('Try again!')


      }, 1000);
    }
    else if (stateFirstReducer.choosedCardsValue[0] == stateFirstReducer.choosedCardsValue[1] && stateFirstReducer.choosedCardsValue[1] !== undefined) {
      let firstCardId = allSpan[firstClassFrontNum].parentElement;
      let secondCardId = allSpan[secondClassFronttNum].parentElement;

      firstCardId.style.pointerEvents = 'none'
      secondCardId.style.pointerEvents = 'none'

      allSpan[firstClassFrontNum].style.color = '#8ffd00';
      allSpan[secondClassFronttNum].style.color = '#8ffd00';
      setFormulaOrResult('')
      dispatch(sameCards(firstCardId.id, secondCardId.id))
      let audio = new Audio(audioRight)
      audio.play();
      setTextMessage('Yes! It is right')
    }

  })


  useEffect(() => {
    if ((stateFirstReducer.allSameCards.length === stateFirstReducer.allCards.length) && 
    (stateFirstReducer.allCards.length !== 0)) {
      let audio = new Audio(audioWin)
      audio.play();
      dispatch(gameFinished(true))
      setFormulaOrResult('')
      setTextMessage('You win!')
    } else if (stateFirstReducer.allCards.length == 0) {
      history.push('/multiplication')
    }


  })
  function toggleInfoFun() {
    let audio = new Audio(audioClick)
    audio.play();
    setToggleInfo(true)
  }

  let formularCartText = `? X  ${stateFirstReducer.MultiplicationNumber}`;

  return (
    <>
      {stateFirstReducer.gameFinished && stateSecondReducer.checkAccess ? <GameFinished textMessage={setTextMessage} /> :

        <div className={styles.allCardsContainer}>
          <header>
            <div onClick={toggleInfoFun}>
              <img src={infoIcon}></img>
            </div>
            <h1> Multiplication Memory Game For Kids</h1>
          </header>
          {toggleInfo ? <Info toggle={setToggleInfo} /> : ''}

          <main>
            <h3 className={styles.textMessage}> {textMessage} </h3>
            <div className={styles.memoryCardsContainer}>
              <section className={styles.memoryCards}>
                {stateFirstReducer.allCards.map((card, index) => {
                  if (index < 8) {
                    return (
                      <FormulasCards theCard={card} key={index} id={index} cartText={formularCartText}
                        setFormulaOrResult={setFormulaOrResult} formulaOrResult={formulaOrResult} textMessage={setTextMessage} />
                    )
                  }
                })}
              </section>
              <section className={styles.memoryCards}>
                {stateFirstReducer.allCards.map((card, index) => {
                  if (index > 7) {
                    return (
                      <ResultsCards theCard={card} key={index} id={index} cartText='=' setFormulaOrResult={setFormulaOrResult} formulaOrResult={formulaOrResult} textMessage={setTextMessage} />

                    )
                  }
                })}
              </section>


            </div>
            <div className={styles.timerWrap}>
              <Timer />
            </div>

            <div className={styles.buttonsWrapper}>

              <button onClick={() => {
                history.push('/start');
                dispatch(gameFinished(true));
                dispatch(gameFinished(false));
                setFormulaOrResult('');
                setTextMessage('');
                let audio = new Audio(audioWrong)
                audio.play();
              }

              }> Take me out the game </button>
            </div>

          </main>

        </div>
      }
    </>
  );
}

export default MemoryCards;
