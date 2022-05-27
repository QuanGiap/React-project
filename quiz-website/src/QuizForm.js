import React from "react"
import Question from "./Question";
import "./QuizForm.css"
import { nanoid } from 'nanoid'
// import { act } from "react-dom/test-utils";
export default function (){
    const [hasData,setData] = React.useState(false);
    const [quizInform,setQuiz] = React.useState([]);
    const [answear,setAnswear] = React.useState([]);
    const [isChecked,setCheck] = React.useState(false);
    const [count,setCount] = React.useState(0);
    const [answearChoice,setAnswearChoice] = React.useState([]);
    let questionList=[];
    function SetUpQuiz(){
        //calling API getting quiz inform
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        .then(res => res.json())
        .then(data =>{
            setQuiz(data.results)
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
            setData(true)
        })
    }
    React.useEffect(()=>{
       SetUpQuiz();
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
    function Check(){
        if(!isChecked){
            setCheck(true);
            //check the answear
            let c = 0;
            for(let i = 0;i<answear.length;i++){
                if(answear[i] === quizInform[i].correct_answer) c++;
            }
            setCount(c)
        }
        else{
            SetUpQuiz();
            setCheck(false);
            setData(false);
        }
    }
    questionList = quizInform.map((obj,index)=>{
        return <Question index={index} 
        question={obj.question} 
        key={nanoid()} 
        answears={answearChoice[index]} 
        choose={answear[index]} 
        funct={changeAnswear} 
        rightAnswer={(isChecked)? quizInform[index].correct_answer : ""}/>
    })
    return(
        <div className="quizBox">
            {!hasData && <h1 className="LoadingScreen">Loading...</h1>}
            {hasData && 
                <div>
                    {questionList}
                    <div>
                        {isChecked&&<h4 className="resultInform">You scored {count}/{quizInform.length} correct answears</h4>}
                        <button  onClick={Check} className="checkButton">{(isChecked)? "Play again" : "Check"}</button>
                    </div>
                </div>
            }
        </div>
    )
}