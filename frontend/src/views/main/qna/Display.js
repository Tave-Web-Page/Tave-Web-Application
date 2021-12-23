import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QnA from './QnA'
import { Link , useParams} from 'react-router-dom';



const DisplayAnswers=function(){
    let params=useParams();
    console.log(params);
    console.log(params.questionID);

    
    const [value, setValue] = useState([]);//�亯��

    useEffect(function(){
        Answers()
    },[])
       
    async function Answers(){
        const response=await axios.get("/api/answers")
        setValue(response.data.answers)
    }


    let selected_answer={
        content : "�亯�� ã�� ���� �����ϴ�"
    }
    for(let i=0; i<value.length; i++){
        if(value[i].question_id===Number(params.questionID)){
            selected_answer.content=value[i].content
            break;
        }
    }

    return(
    <div>
      <p>{selected_answer.content}</p>
      
    </div>
    )
}


export default DisplayAnswers;