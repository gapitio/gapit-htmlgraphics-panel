# Development guide

This plugin uses [@grafana/create-plugin](https://grafana.com/developers/plugin-tools/).

Below are just some very basic steps to get starting with the development environment, but there is a guide of how to setup the development environment from Grafana: <https://grafana.com/developers/plugin-tools/get-started/set-up-development-environment>.

1. Install dependencies

   ```BASH
   yarn install
   ```

2. Build plugin in development mode or run in watch mode

   ```BASH
   yarn dev
   ```

   or

   ```BASH
   yarn watch
   ```

3. Build plugin in production mode

   ```BASH
   yarn build
   ```

4. Start the dev server:

   ```BASH
   yarn server
   ```
