# Contributing
Thank you for considering contributing to postori. We are happy to have you here! ❤️

> [!NOTE]
> We strongly recommend that you check for open issues and pull requests to see if
> someone else is working on something similar. Also check the roadmap before you start working on a feature.

You can contribute in the following ways:
- Finding and reporting bugs in the issues
- Contributing code to postori by fixing bugs or implementing features
- Improving the documentation

And if you like the project, but just don't have time to contribute, that's
fine. There are other easy ways to support the project and show your
appreciation, which we would also be very happy about:

- Star the project
- Tell others about it
- Mention this project in your project's readme
<!-- - Donate to us -->

## Structure
This repository is structured as follows:

| Directory        | Description                     |
| ---------------- | ------------------------------- |
| `apps        `   | Postori apps                    |
| `apps/client `   | Source for web mail client      |
| `apps/docs   `   | Postori user manual             |
| `apps/server `   | Source for postori server       |
| `apps/**/test`   | App specific test cases         |

> [!NOTE]
> Documentation is written using [MDX](https://mdxjs.com). The `docs` app
> uses the awesome documentation framework, [Fumadocs](https://fumadocs.dev/)
> by [Fuma Nama](https://github.com/fuma-nama).

## Development
### Fork this repo
You can fork this repo by clicking the fork button in the top right corner of this page.

> [!IMPORTANT]
> Uncheck **Copy the `main` branch only** option, as you'll need the `dev` branch also

### Clone on your local machine

```bash
git clone https://github.com/your-username/postori.git
```

### Navigate to project directory

```bash
cd postori
```

### Checkout the `dev` branch
We modify the source code on the `dev` branch, while `main` primarily serves as
the stable release branch. That's why you need to checkout the `dev` branch
to begin working on the latest changes.

```bash
git checkout dev
```

### Install dependencies

```bash
bun install
```

### Create a new branch

```bash
git checkout -b feat/new
```

### Running development servers
You may run one of the following depending on which app(s) you are trying to hack onto.

The following will start local development servers for all of the apps on their respective ports:

```bash
bun --filter * dev
```

While this one will start the development server for a specific `APP`:

```bash
bun --filter postori-<APP> dev
```

### Testing
Tests in postori are written using [Vitest](https://vitest.dev). You can run all the tests
from the root of the repository:

```bash
bun run test
```

Please include tests for your changes and ensure those tests are passing before submitting a pull request.

### Commit changes
Once you're done, commit your changes. Please follow the commit conventions described at the end of this document.

```bash
git add .
git commit -m "feat(docs): add missing whitespace"
```

### Create PR
Please use clean, concise titles for your pull requests.

Create a pull request against the `dev` branch of the `error-party/postori` repository from your
branch. Include a meaningful description that lists all the changes made, and assign a reviewer.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(client): add catppuccin theme`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/.


