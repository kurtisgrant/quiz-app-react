
$(() => {
  const titleHTML = `
  <div class="field">
    <label class="label">Title</label>
    <div class="control">
      <input class="input" type="text" placeholder="Quiz Title">
    </div>
  </div>
  `;
  const newQuestion = `
    <div class="card q-card my-4">
      <div class="card-header">
        <h3 class="card-header-title">Question</h3>
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
          <button class="delete mx-3 is-invisible"></button>
        </div>
        <div class="q-option incorrect-option my-3">
          <input class="input is-info" type="text" placeholder="Incorrect Answer">
          <button class="delete mx-3 is-invisible"></button>
        </div>

      </div>

      <button class="add-option button is-primary has-text-weight-bold">Add Option</button>

    </div>
  </div>
    `;
  const newOption = `
  <div class="q-option incorrect-option my-3">
    <input class="input is-info" type="text" placeholder="Incorrect Answer">
    <button class="delete mx-3"></button>
  </div>
  `;

  const $createQuizContainer = $('#create-quiz');
  $createQuizContainer.append(titleHTML);
  $createQuizContainer.append(newQuestion);
  $createQuizContainer.on('click', (e) => {
    if ($(e.target).hasClass('add-option')) {
      const $qOptionsContainer = $(e.target).prev();
      $qOptionsContainer.append(newOption);
    };
  });




});
