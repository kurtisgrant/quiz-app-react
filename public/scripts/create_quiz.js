
$(() => {
  const titleHTML = `
  <div class="field">
    <label class="label">Title</label>
    <div class="control">
      <input class="input" type="text" placeholder="Quiz Title">
    </div>
  </div>
  `;

  const $createQuizContainer = $('#create-quiz');
  $createQuizContainer.append(titleHTML);



});
