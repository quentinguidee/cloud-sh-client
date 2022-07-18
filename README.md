<p align="center">
<img alt="logo" width="360" src="https://user-images.githubusercontent.com/12123721/175907234-1fa6974c-33e7-4b64-a931-1bcbff0c9c63.png#gh-dark-mode-only" />
<img alt="logo" width="360" src="https://user-images.githubusercontent.com/12123721/175907812-a401f5a3-4c27-4a0b-bc5e-62ae46f223f5.png#gh-light-mode-only" />
</p>

---

**DISCLAIMER**: cloud.sh is under development. We do not recommend you to use it in a production environment for now.
The storage could be corrupted when upgrading from one version to another and the security is not guaranteed.

---

**cloud.sh** is a lightweight self-hosted cloud for your home lab.

## Screenshot

<img width="1304" alt="screen" src="https://user-images.githubusercontent.com/12123721/179521827-fc21d6a4-61ff-4357-81d1-a1c14b74062e.png">

## Start coding

```bash
git clone https://github.com/quentinguidee/cloud-sh-client.git
yarn install
yarn start
```

You also need to start a [cloud-sh-server](https://github.com/quentinguidee/cloud-sh-server) instance:

```bash
git clone https://github.com/quentinguidee/cloud-sh-server.git
```

On GitHub, create an oauth application (user settings > developer settings > OAuth Apps > New) with these settings:

* **Homepage URL**: http://localhost:3000
* **Authorization callback URL**: http://localhost:3000/login

In the server code, copy/paste the `.env.example` to `.env`, and put the Client ID and Client Secret given by GitHub.
You also need to start a PostgreSQL instance (you can use the `docker-compose.yml` file on the server if you want).
Then:

```bash
go run .
```

## License

This project is released under the [MIT License](./LICENSE.md).
