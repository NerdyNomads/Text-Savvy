# Text Savvy

by [Nerdy Nomads](https://github.com/NerdyNomads)

A web application with a browser extension that allows users to save important blocks of text in a convenient spot where they can easily access, organize and share their saved text with other users!

https://user-images.githubusercontent.com/24909769/158043643-078718a1-54da-4fd8-8589-cc3f02cc9772.mp4

## Table of Contents

- [Objective](#objective)
- [Core Features in Progress](#core-features-in-progress)
- [Our Proposal](#our-proposal)
- [Developer's Notes](#developers-notes)
  - [Architecture](#architecture)
  - [Tools and Technologies](#tools-and-technologies)
  - [Installation](#installation)
  - [Branching Rules](#branching-rules)
- [Contributors](#contributors)

## Objective

Users will be able to save text located within another website, simply by highlighting the text and saving it through the browser extension. Along with the text, the extension will also save the source of the text (URL) so that users can easily revisit it. Workspaces can be created so that a user will be able to organize their collection of texts. These workspaces can also be shared between multiple users.

## Core Features in Progress

1. **Account Creation and Management** - Users will be able to create an account that their text will be linked to. This will allow users to visit their workspace with any device.

2. **Create a Workspace** - This will allow users to create different work spaces where different related blocks of text can be grouped together.

3. **Share Workspaces with Others** - This application will be able to share the workspaces with others for collaboration. This will include different levels of access (e.g. Read access only, Contributor).

4. **Highlight and Save Text** - Users will be able to highlight some text blocks on the screen, and right click to bring up a menu to save the text.

5. **Browser Extension** - This will include a simplified version of the key features from the web application (e.g., save texts, sign-in/log out, settings, create/select workspace, home button linked to web page).

6. **Non-functional Feature** - This application will respond to 1000 user requests across 100 different accounts per minute concurrently.

## Our Proposal

- See Project Proposal on our [wiki](https://github.com/NerdyNomads/COMP4350-Project/wiki/Project-Proposal).

## Developer's Notes

### Architecture

- The architecture diagram for the project can be found [here](https://github.com/NerdyNomads/COMP4350-Project/blob/develop/COMP_4350_Architecture.png).

### Tools and Technologies

- To see the tools and technologies we use, see our [wiki page](https://github.com/NerdyNomads/COMP4350-Project/wiki/Project-Proposal#technologies).

### Installation

- For tutorials on how to run the project locally, check out both `README.md` for [`backend/`](/back-end/README.md) and [`frontend/`](/front-end/README.md).

### Branching Rules

```
[name-inititials]/[issue-type]/[high-level-description-of-branch]
```

- eg. `AB/docs/edit-project-description`

| Name       | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| `feat`     | use this when changes are related to a development of a feature. |
| `bug`      | use this when fixing issues                                      |
| `docs`     | use this when changes are documentation related                  |
| `refactor` | use this when refactor the code base                             |

## Contributors

| Name             | GitHub Username                                        | Email                   |
| ---------------- | ------------------------------------------------------ | ----------------------- |
| Faith de Leon    | [@deleonkf](https://github.com/deleonkf)               | deleonkf@myumanitoba.ca |
| Reymel Eusebio   | [@r3ym3l](https://github.com/r3ym3l)                   | eusebior@myumanitoba.ca |
| Marielle Manlulu | [@mariellemanlulu](https://github.com/mariellemanlulu) | manlulum@myumanitoba.ca |
| Joshua Moreira   | [@OfficialArms](https://github.com/OfficialArms)       | moreiraj@myumanitoba.ca |
| Emmanuel Valete  | [@valetee](https://github.com/valetee)                 | valetee@myumanitoba.ca  |
