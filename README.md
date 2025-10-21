# Visual Diagram Builder

<!-- <a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a> -->

Simple visual diagram builder built with React Flow.

## Features

- Login with email
- Signup with email
- Create visual diagrams
  - Change node labels
  - Drag edge from end of node to create new nodes
- Share diagrams
- Dark/Light mode toggle

## Screenshots

#### Login and Signup
<img width="1247" height="747" alt="image" src="https://github.com/user-attachments/assets/cfe59e47-a621-4e10-a287-0fa400c82dcf" />
<img width="1245" height="747" alt="image" src="https://github.com/user-attachments/assets/71a91270-4b56-433a-817e-4e5324bf53fe" />

#### Dashboard (with user menu (Profile view) opened) 
<img width="1245" height="747" alt="image" src="https://github.com/user-attachments/assets/0ac70318-7bce-4ac3-8643-c41c06f271d0" />

#### Create diagram (with editable text in Node)
<img width="1245" height="747" alt="image" src="https://github.com/user-attachments/assets/72617aed-d2ec-46c3-9051-fcddf6b9843b" />

#### Opened a created diagram (with Share and Menu cta)
<img width="1245" height="747" alt="image" src="https://github.com/user-attachments/assets/f97a098e-0e19-4510-b0fa-c952c2ddf5e0" />

#### Share diagram view (with autocomplete list)
<img width="1245" height="747" alt="image" src="https://github.com/user-attachments/assets/36eb8cb2-1f39-491c-85d7-9ef40895ef3b" />

#### Dark mode On
<img width="1245" height="747" alt="image" src="https://github.com/user-attachments/assets/a4c5ed79-37d9-4093-9b2b-2c5c1218cf03" />


## Architecture

### Thinking

Main thinking behind this project is scallability and modularity. The application use a monorepo approach. In this way, the nodes can be created separately with separete package.json files and their own code for third-party integrations (email etc) and integrated into the React Flow canvas.

### Why NX?

- NX makes it easier to modularise the application with apps and libraries.
- CLI support.
- Graph to see how everything is connected.

### Structure

Application has main two parts. `apps` and `libs`. Apps contains all the core buildable applictions which then can be loaded on a browser. Libs contains all the libraries that area shared between apps and each other.

- apps/main - main react application that runs built with libs
- libs/shared/auth - contains all the auth related code
- libs/shared/ui - contains all the reusable components and theme
- libs/shared/canvas - contains react flow related code
- libs/shared/nodes - contains nodes used to created react flow diagrams

Each module in `app` or `lib` contain their own package.json files with packages used only in that module (eg: MUI packages are only in libs/shared/ui)

## TODOs and Improvements

Can be check via `//TODO` comments in the code.

- Currently the `new-diagram` and `diagram` components has simillar structure and code for handling canvas module (React Flow). This can be centralised (move to the canvas lib or else) and shared between the two views.
- Types can be moved to a new lib.
- Dark mode should be improved.
- Unit test coverage should be improved (currently only added for libs/shared/ui/src/components/Table.tsx).
- Can look into incorporating React 18+ features more.

## Run tasks

To run the dev server for your app,

Make sure the correct variables are setup in the `.env` file in `apps/main`

...then use:

```sh
npx nx serve main
```

To run tests, run:

```sh
npx nx test ui
```

To create a production bundle:

```sh
npx nx build main
```

To see all available targets to run for a project, run:

```sh
npx nx show project main
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin.
