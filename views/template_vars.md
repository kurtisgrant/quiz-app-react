
Homepage (GET "/"):
{ 
  user: { name }, 
  quizzes: [ 
    { 
      quiz_identifier(str), 
      title(str), 
      description(str), 
      questions(number), 
      avg_score(str, format: '60%') 
    } 
  ] 
}

Quiz Results (GET "/attempts"):
{ 
  user: { name }, 
  attempts: [ 
    { 
      id(number), 
      quiz_title(str), 
      time(str, eg: '5:35pm Nov 12, 2021'), 
      score(str, format: '60%') 
    } 
  ] 
}

My Quizzes (GET "/quizzes"):
{ 
  user: { name }, 
  quizzes: [ 
    { 
      quiz_identifier(str), 
      title(str), 
      description(str), 
      attempts(number), 
      avg_score(str, format: '60%') 
    } 
  ] 
}

Quiz (GET "/quizzes/:quiz_identifier"):
