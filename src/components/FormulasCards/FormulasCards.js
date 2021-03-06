import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { choosedFormulasCards } from '../../actions/action'
import styles from './formulasCards.module.scss'
import React from 'react'
import audioClick from '../../sounds/click1.mp3'

function FormulasCards(props) {
    const dispatch = useDispatch()
    const stateFirstReducer = useSelector(state => {
        return state.firstReducer;
    })


    async function handleClick() {
        let allSpan = document.querySelectorAll('span');

        if (props.formulaOrResult == props.cartText) {
            props.textMessage('Choose card from the other side!')
        }

        if (stateFirstReducer.choosedCardsId.indexOf(props.id) === -1) {
            if (stateFirstReducer.choosedCardsId.length < 2) {
                props.setFormulaOrResult(props.cartText);

                if (props.formulaOrResult !== props.cartText) {
                    allSpan[props.id * 2].className = `${styles.front} `;

                    allSpan[(props.id * 2) + 1].className = `${styles.back} ${styles.flip}`;
                    dispatch(choosedFormulasCards(props.id, props.theCard))

                    props.textMessage('')
                    let audio = new Audio(audioClick)

                    audio.play();

                } else props.textMessage('Choose card from the other side!')
            }
        }

    }




    return (
        <div className={styles.classFormulas}>
            <article className={styles.memoryCard} id={props.id} onClick={handleClick}>
                <span className={`${styles.front} ${styles.flip}`}> {props.theCard}</span>
                <span className={styles.back} >{props.cartText}</span>
            </article>

        </div>
    )
}

export default FormulasCards;
