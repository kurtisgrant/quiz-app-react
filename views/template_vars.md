
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


