
$(() => {
  const $questions = $('.q-card');

  const $submit = $('#submit-quiz');
  $submit.on('click', (e) => {

    console.log('HEREEEE');
    e.preventDefault();
    const selections = [];
    $questions.each((index, questionEl) => {
      const $question = $(questionEl);
      const q_id = $question.attr('id');
      const checkedOptionId = $($question.find(`input.option-radio:checked`)).attr('id');
      selections.push([q_id, checkedOptionId]);
    });

    const data = {
      quiz_id: $('#quiz').attr('q-id'),
      selections: selections
    };


    $.ajax({
      url: '/attempts',
      dataType: 'json',
      type: 'post',
      async: true,
      data: data,
      success: function() {
        console.log('Ajax request successfully sent from submit_quiz.js');
        window.location.replace('/attempts');
      },
      error: function(request, status, error) {
        console.error(`Error: ${status, error, request.responseText}`);
      }
    });


  });


});
