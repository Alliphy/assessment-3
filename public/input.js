function submitInput(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get a reference to the comment input element
  const thoughtInput = document.body.querySelectorAll(".thought-input");
  const thoughtData = [];

  // Loop through each input and collect data

  thoughtData.push(thoughtInput[0].value);

  console.log("thought data: ", thoughtData);

  const outputContainer = document.createElement("div");
  outputContainer.classList.add("user-input");

  // Loop through form data and create display elements
  thoughtData.forEach((thought) => {
    console.log("looping through the thoughts: ", thought);
    const outputElement = document.createElement("p");
    outputElement.textContent = thought;
    outputContainer.appendChild(outputElement);
  });

  const outputArea = document.querySelector(".output-area");
  outputArea.appendChild(outputContainer);
  // Append the output container to a specific location on the page

  console.log("Submitted form data:", thoughtData);

  // Clear the form after submission
}

// Attach the submitComment function to the form's submit event
const commentForm = document.querySelector("form");
commentForm.addEventListener("submit", submitInput);
