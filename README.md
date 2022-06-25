# sh.Cloud

sh.Cloud (self-hosted cloud) is a lightweight self-hosted cloud for your home lab.

<img width="933" alt="image" src="https://user-images.githubusercontent.com/12123721/175771539-066aec89-69be-467c-9304-862dfe7157a1.png">

## Roadmap

- [ ] Storage
- [ ] Contacts
- [ ] Mails
- [ ] To-Do
- [ ] Settings
- [ ] ...

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
