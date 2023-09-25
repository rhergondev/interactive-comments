# Interactive Comments Section

This is a project built on [FrontEndMentor specifications](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9).

It was built using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [SCSS](https://sass-lang.com/)

## Table of Contents

- [Project Summary](#project-summary)
  - [Comment Structure](#comment-structure)
  - [Notes on functionality](#notes-on-functionality)
- [Structuring the App and an origin story](#structuring-the-app-and-an-origin-story)
  - [First thoughts and Dataflow](#first-thoughts-and-dataflow)
  - [The process and the learning experience](#the-process-and-the-learning-experience)
    - [Contexts and too much of them](#contexts-and-too-much-of-them)
    - [Backend and the lack of it](#backend-and-the-lack-of-it)
    - [TypeScript and why use it](#backend-and-the-lack-of-it)
    - [Adaptive Web and how mistakes were made](#adaptive-web-and-how-mistakes-were-made)
  - [Takeaways and considerations at the end](#takeaways-and-considerations-at-the-end)

## Project Summary

The specifications requested a comments section that allowed for addition of new comments, editing those comments, being able to delete comments and also replies.

### Comment structure

The comments are objects that have the following structure:

```
Comment {
   id: string;
   date: number;
   usrId: number;
   likeCount: number;
   text: string;
   replies: Comment[];
}
```

### Notes on functionality

As a personal preference, a reply to a reply will be attached as a reply of the original comment automatically adding an "@" to the user the reply is directed to. This is setup as a personal preference to avoid infinite nesting, following the consensus that the reply still belongs to the same conversation.

Edition is allowed to be done without any mouse input, ESC will exit edition and return the comment to its original state will Enter will submit the edition.

As per specifications comments are sorted by likes and replies by created date, thanks to React functionality the components automatically reorder themselves when the number of likes changes.

A user selector has been added to the top of the page to allow for a better testing experience. The page loads with a random user selected and this can be freely changed using the buttons on to header of the page, the selected user is highlighted. This functionality is provided since the App was not designed to add a user management system.

The page returns to its initial state on reload in order to not transfer data added by previous users to the new users, keeping in mind this is an App created as a learning experience you can read more about this decision in the next section.

## Structuring the App and an origin story

### First thoughts and Dataflow

The app was originally conceived as to allow the management of the comments, it includes a comment context with all the functionality needed and an import of the comment data. The Context takes care of sending the manipulation functions and the data to each comment as well as the containers. The thought process behind sending the functions was to keep the setters from being accessed by any individual component.

While the app does not currently write to a DB or a Json file to keep the state this could easily be achieved by modifying the different functions since the functionality is organized by needs (i.e. addComment, editComment, deleteComment, etc., look at the [commentContext.tsx file](https://github.com/rhergon/interactive-comments/blob/main/src/contexts/commentContext.tsx) for more info on this.)

### The process and the learning experience

Being a novice at React this App generated quite a few eye opening moments about React functionality and the way it is designed to function.

#### Contexts and too much of them

Looking back at the development process I feel I relied too much on Contexts, both the UserContext as well as the CommentContext, while keeping the functions on the Contexts still seems like a good method of approach I would by all accounts make a different decision when passing the user and the comment it self, using the Context to access the selected user and the comments seems like it goes against React way of working, while it definitely works looking back it would have made my life easier using Props instead.

#### Backend and the lack of it

While when I begun the project I was really considering using a Firebase DB for both users and comments I decided to opt out of it to keep better control of what it is shown when anyone accesses the page. Since this is a portfolio piece I have designed to require the least amount of maintenance posible. With this said, if I was using some sort of backend somethings will have been much easier and I would have made different decisions. For example, I would not have stored the replies withing the Comment Object, I would definitely used an ID system to assign replies to their parents, it would have allowed for a better App all around.

#### TypeScript and why use it

Even though at the beginning of this project I was quite not sure about TS, it is something that has allowed me to manage my errors much easier. Even though it has felt like a pain to learn and I am definitely not a TS guru yet, I feel that the transcompiler has its use.

#### Adaptive Web and how mistakes were made

I have no problem in creating adaptive designs, in fact I find it a standard requirement for modern web but oh boy was I set up for a learning experience. I didn't take into consideration adaptive design when setting up my React Component hierarchy which made it impossible to follow the design proposed without a full restructure of the App. While I could have gone and redesigned the App, that added with the overuse of Contexts yielded a long series of corrections that I would need to undergo, moving away from my 5 days deadline for this project. So sadly I decided to scrap adaptability for this project in particular an keep the deadline leaving with the lesson learned.

### Takeaways and considerations at the end

Overall this was a project where I decided to step up my very basic React and add TypeScript. Overall it took sometime to grasp all the new concepts and TypeScript was quite a headache at the beginning of the dev cycle, but overall I have come out the other side with a large understanding of TS and have internalized a lot of the core design ideas behind React which will largely reduce the number and impact of structural mistakes for the next project.
