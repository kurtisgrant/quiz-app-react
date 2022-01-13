
$(() => {
  const newQuestion = `
    <div class="card q-card my-6">
      <div class="card-header is-flex is-justify-content-space-betweeen is-align-items-center">
        <h3 class="card-header-title">Question</h3>
        <button class="delete delete-question mx-4 is-medium"></button>
      </div>
      <div class="card-content">
        <div class="field">
          <div class="control">
            <textarea name="question" class="textarea" id="q-1" rows="2" placeholder="Question"></textarea>
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
        <button class="add-option button is-primary has-text-weight-bold">Add Option</button>
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
  const $questionsContainer = $('#questions-container');
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

});
