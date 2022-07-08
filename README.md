<p align="center">
<img alt="logo" width="360" src="https://user-images.githubusercontent.com/12123721/175907234-1fa6974c-33e7-4b64-a931-1bcbff0c9c63.png#gh-dark-mode-only" />
<img alt="logo" width="360" src="https://user-images.githubusercontent.com/12123721/175907812-a401f5a3-4c27-4a0b-bc5e-62ae46f223f5.png#gh-light-mode-only" />
</p>

---

**cloud.sh** is a lightweight self-hosted cloud for your home lab.

## Screenshot

<img width="990" alt="image" src="https://user-images.githubusercontent.com/12123721/175908490-7008e118-26db-454a-b50d-b4d692e028c9.png">

## Start coding

```bash
git clone https://github.com/quentinguidee/sh-cloud-client.git
yarn install
yarn start
```

You also need to start a [sh-cloud-server](https://github.com/quentinguidee/sh-cloud-server) instance:

```bash
git clone https://github.com/quentinguidee/sh-cloud-server.git
```

On GitHub, create an oauth application (user settings > developer settings > OAuth Apps > New) with these settings:

* **Homepage URL**: http://localhost:3000
* **Authorization callback URL**: http://localhost:3000/login

In the server code, copy/paste the `.env.example` to `.env`, and put the Client ID and Client Secret given by GitHub.
Then:

```bash
go run .
```

## License

This project is released under the [MIT License](./LICENSE.md).
