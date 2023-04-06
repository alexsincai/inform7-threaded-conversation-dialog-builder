# Inform7 Dialog Builder

This is a visual(ish) editor for creating dialog quips, for use in [Inform7](http://inform7.com/) with the [Threaded Conversation extension](https://i7el.herokuapp.com/extensions/threaded-conversation-by-chris-conley).

The dialog editor allows the creation of quips, specifying what type of quip it is, the actor(s) to whom it is restricted, the scene during which it will appear, if any, and the nag, if any.

**Please be aware:** if the quip starts with "a" or "the", or if it contains the words "is" or "has", you **must** use the printed name.

It only allows a quip to follow a single other quip. Should you need it to follow several, you will need to edit it manually.

Adding a new quip will copy the current actor's name and the current scene to the new quip.

Should you add any actions to the Report input, a "continue the action" will be added automatically at the end.

The resulting quips will be displayed, nicely formatted, in the Results tab.

It was built by **Reason: Optional** in [React](https://reactjs.org/), with [Jotai](https://jotai.org/) for state management and [Bootstrap](https://getbootstrap.com/) for layout.

## Installation

1. Make sure you have [Node JS](https://nodejs.org/en) installed
2. Clone this repository
    `git clone https://github.com/alexsincai/inform7-threaded-conversation-dialog-builder`
3. Go into the folder
    `cd inform7-threaded-conversation-dialog-builder`
4. Run `npm install` to install the dependencies
5. Run `npm run dev` to start it
6. Navigate to [http://localhost:5173/](http://localhost:5173/) to use it

