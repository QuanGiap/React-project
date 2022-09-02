export const stepsTurtorialData = [{
    target: "body",
    content:
      "Today, I will show you how to use task website. Click the next button to process or close button if you already know how to use it",
    placement: "center",
    title: "Welcome to the page",
  },
  {
    target: ".mainButton",
    content:
      "This button will load the page where you can do the tasks today!, which you can see right now",
    title: "Main page",
  },
  {
    target: ".editButton",
    content:
      "This button will load the page where you can edit your tasks like add, remove or move task to the other days!",
    title: "Edit page",
  },
  {
    target: ".tasksNote",
    content:
      "This is the first example tasks I just create for you. You can drag and drop task in any order of the tasks you want.",
    title: "The first example task",
  },
  {
    target: ".tasksNote",
    content: "But you only can drag it when timer is not running.",
  },
  {
    target: ".startButton",
    content: <div>Click here to start the timer</div>,
    spotlightClicks: true,
    title: "Start timer",
    hideFooter: true,
  },
  {
    target: ".startButton",
    content: <div>Click again to stop</div>,
    spotlightClicks: true,
    title: "Stop timer",
    hideFooter: true,
  },
  {
    target: ".descriptionMain",
    content: <div>The task just did will show here</div>,
    title: "The current task",
  },
  {
    target: ".descriptionMain",
    content:
      "Your progress will be saved everytime you stop the timer or go to the edit page. If you suddenly turn off the web, your progress won't be saved",
    title: "Important",
  },
  {
    target: ".resetButton",
    content: "Click here to reset the timer",
    spotlightClicks: true,
    title: "Reset timer",
  },
  {
    target: ".editButton",
    content:
      "Right now it only have 1 example task, click this button to go to the Edit page",
    spotlightClicks: true,
    hideFooter: true,
  },
  {
    target: ".inputNote",
    content: "This component right here will help you create task",
    title: "The note input",
  },
  {
    target: "#desciption",
    content: "You can type anything you want here",
  },
  {
    target: ".switchTime",
    content: "Flip the switch if you want to add the timer for the tasks",
  },
  {
    target: ".timerEdit",
    content:
      "Type number how long you want in these 3 box here. The task timer does not exceed 24 hours",
  },
  {
    target: ".addButton",
    content:
      "After you done creating a task, click this button to add the tasks. The task just created will be moved in the store",
  },
  {
    target: ".Day7",
    content: "This box will store the task just created",
    title: "The store box",
  },
  {
    target: ".Day0",
    content:
      "This box contain can contain tasks and it will show these in Sunday. There are 6 more boxes of this type represent the day of the week",
  },
  {
    target: ".Day" + new Date().getDay(),
    content: "Today, this gray box is showing the tasks",
  },
  {
    target: ".deleteIcon",
    content: "If you don't like the task you can click this to delete",
    title: "Delete button",
  },
  {
    target: ".editIcon",
    content:
      "Or you can edit this task, the edit box will show up. Click here to open up the edit box task",
    spotlightClicks: true,
    hideFooter: true,
    title: "Edit button",
  },
  {
    target: "#editNote",
    content: "You edit the task like the way you create the task",
  },
  {
    target: "#cancelEditButton",
    content: "Click here to cancel since we don't make any change here",
    spotlightClicks: true,
    hideFooter: true,
  },
  {
    target: ".tasksNote",
    content: "You can drag and drop task in any box you want.",
  },
  {
    target: "#saveButton",
    content:
      "After you done and satisfy with the task placement, you can click this save button to save the layout",
  },
  {
    target: "body",
    content: "that all of it enjoy the web",
    placement: "center",
  },]