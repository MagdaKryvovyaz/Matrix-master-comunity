const cancelAddingQuestion = document.getElementById("cancelAddingQuestion");
const cancelEditingQuestion = document.getElementById("cancelEditingQuestion");




cancelAddingQuestion.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});

cancelEditingQuestion.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = `/question/${cancelAddingQuestion.dataset._id}`;
});

