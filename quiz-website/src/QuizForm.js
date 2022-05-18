import React from "react"
import Question from "./Question";
import "./QuizForm.css"
import { nanoid } from 'nanoid'
export default function(){
    const [hasData,setData] = React.useState(false);
    const [quizInform,setQuiz] = React.useState([]);
    const [answear,setAnswear] = React.useState([]);
    const [isChecked,setCheck] = React.useState(false);
    const [answearChoice,setAnswearChoice] = React.useState([]);
    let questionList=[];
    React.useEffect(()=>{
        //calling API getting quiz inform
       fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        .then(res => res.json())
        .then(data =>{
            setQuiz(data.results)
            setData(true)
            //setting default answear (auto wrong answear)
            setAnswear(data.results.map(obj=>{
                    return obj.incorrect_answers[0];
            }))
            //setting out answear choice
            setAnswearChoice(data.results.map(obj=>{
                let arr = [...obj.incorrect_answers];
                arr.splice(Math.floor(Math.random()*arr.length+1),0, obj.correct_answer)
                return arr;
            }))
        })
    },[])
    function changeAnswear(questionNumber,answearNumber){
        if(!isChecked){
                console.log("Question change at "+questionNumber+" at answear "+answearNumber);
                setAnswear(prev=>prev.map((aw,index)=>{
                if(questionNumber!==index) return aw;
                else return answearChoice[questionNumber][answearNumber];
                    }    
                )
            )
        }
    }
    function Check(event){
        event.preventDefault();
        setCheck(true);
    }
    questionList = quizInform.map((obj,index)=>{
        return <Question index={index} question={obj.question} key={nanoid()} answears={answearChoice[index]} choose={answear[index]} funct={changeAnswear}/>
    })
    return(
        <div>
            {!hasData && <h1>Loading</h1>} 
            {hasData && <
                div>
                    {questionList}
                    <div>
                        {isChecked&&<h4 className="resultInform">You scored 10/10 correct answears</h4>}
                        <button  onClick={Check} className="checkButton">{(isChecked)? "Play again" : "Check"}</button>
                    </div>
                </div>
            }
        </div>
    )
}