# Text Savvy Web Application

## Quick Start

1. Make sure `node` and `npm` are installed. To check:
    ```
    $ node -v
    $ npm -v
    ```
    - Go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) to download the installer.
2. Install dependencies.
    ```
    $ npm install
    ```
    - Update `npm` if necessary.
3. Run the server.
    ```
    $ npm start
    ```
4. Visit [localhost:3000](http://localhost:3000) in Chrome.


### Recommendations:
1. Install ESLint extension (`dbaeumer.vscode-eslint`) in VSCode.
    - See [here](https://developer.ibm.com/articles/auto-fix-and-format-your-javascript-with-eslint/) for extensions for other editors.

2. Enable linting on save:
    - `CTRL` + `SHIFT` + `P`
    - Type "Open Settings (JSON)"
    - Add this to your `settings.json`:
        ```
        {
            ...

            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true
            },
            
            "eslint.validate": ["javascript"]

            ...
        }
        ```

3. To test is it is working, mess up the format of any `.js` files, then save. It should reformat itself.