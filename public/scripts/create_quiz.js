
$(() => {
  const newQuestion = `
    <div class="card q-card mt-6">
      <div class="card-header is-flex is-justify-content-space-betweeen is-align-items-center">
        <h3 class="card-header-title">Question</h3>
        <button class="delete delete-question mx-4 is-medium"></button>
      </div>
      <div class="card-content">
        <div class="field">
          <div class="control">
            <textarea name="question" class="textarea q-question" rows="2" placeholder="Question"></textarea>
          </div>
        </div>
        <div class="q-options container mr-6 mt-5 has-background-blue">
          <div class="q-option correct-option my-3">
            <input class="input is-primary" type="text" placeholder="Correct Answer">
            <button class="delete delete-option mx-3 is-invisible"></button>
          </div>
          <div class="q-option incorrect-option my-3">
            <input class="input is-info" type="text" placeholder="Incorrect Answer">
            <button class="delete delete-option mx-3 is-invisible"></button>
          </div>
        </div>
        <button class="add-option button" type="button">Add Option</button>
      </div>
    </div>
  `;
  const newOption = `
    <div class="q-option incorrect-option my-3">
      <input class="input is-info" type="text" placeholder="Incorrect Answer">
      <button class="delete delete-option mx-3"></button>
    </div>
  `;

  // Append first question card
  const $questionsContainer = $('#q-questions');
  $questionsContainer.append(newQuestion).find('.delete-question').addClass('is-invisible');

  // Handle add/remove option and remove question click events
  $questionsContainer.on('click', (e) => {
    const $target = $(e.target);
    if ($target.hasClass('add-option')) {
      const $qOptionsContainer = $(e.target).prev();
      $qOptionsContainer.append(newOption);
    } else if ($target.hasClass('delete-option')) {
      $target.closest('div').remove();
    } else if ($target.hasClass('delete-question')) {
      $target.closest('.q-card').remove();
    }
  });

  // Handle add question click event
  $('#add-question').on('click', () => {
    $questionsContainer.append(newQuestion);
  });

  // Handle submit quiz event
  $('#submit-quiz').on('click', (e) => {
    const data = {
      title: $('#q-title').val(),
      description: $('#q-description').val(),
      public: $('#q-public').prop('checked'),
      questions: []
    };
    const addQuestion = (questionObj) => data.questions.push(questionObj);

    // Loop through question cards
    $('.q-card').each((index, questionEl) => {
      const $question = $(questionEl);
      const question = {
        question: $($question).find('.q-question').val(),
        options: []
      };
      const addOption = (optionArr) => question.options.push(optionArr);

      // Loop through question options
      $question.find('.q-option').each((index, optionContainerEl) => {
        const $option = $(optionContainerEl).find('input');
        const optionArr = [$option.val(), index === 0];
        addOption(optionArr);
      });

      addQuestion(question);
    });

    console.log('About to attempt AJAX POST req to server with body data: ', data);
    $.ajax({
      url: '/quizzes',
      dataType: 'json',
      type: 'post',
      async: true,
      data: data,
      success: function() {
        console.log('posted. ');
      },
      error: function(request, status, error) {
        alert(request.responseText);
      }
    });

  });

});


/*
Submit quiz format

{
  "title": "Quiz Title",
  "description": "Quiz description",
  "public": true,
  "questions": [
      {
          "question": "What is the answer?",
          "options": [
              [ "First option", true ],
              [ "Second option", false ],
              [ "Third option", false ]
          ]
      },
      {
          "question": "What is the other answer?",
          "options": [
              [ "First option", true ],
              [ "Second option", false ],
              [ "Third option", false ]
          ]
      }
  ]
}

*/
