# Development guide

This plugin uses [@grafana/create-plugin](https://grafana.com/developers/plugin-tools/).

Below are just some very basic steps to get starting with the development environment, but there is a guide of how to setup the development environment from Grafana: <https://grafana.com/developers/plugin-tools/get-started/set-up-development-environment>.

1. Install dependencies

   ```sh
   pnpm install
   ```

2. Build plugin in development mode or run in watch mode

   ```sh
   pnpm run dev
   ```

3. Start the Grafana dev server on <http://localhost:3000>:

   ```sh
   pnpm run server
   ```

   The base image and version can be configured with the `GRAFANA_IMAGE` and `GRAFANA_VERSION` environment variables:

   ```sh
   GRAFANA_IMAGE=grafana GRAFANA_VERSION=12.0.1 pnpm run server
   GRAFANA_IMAGE=grafana GRAFANA_VERSION=8.2.0 pnpm run server
   GRAFANA_IMAGE=grafana-enterprise GRAFANA_VERSION=11.5.3 pnpm run server
   ```
