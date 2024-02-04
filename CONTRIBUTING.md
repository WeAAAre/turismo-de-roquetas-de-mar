# Contributing

## Installing

This project uses pnpm.

To get started, run:

```sh
corepack enable
```

Then, run:

```sh
pnpm i
```

## Before creating a pull request

Before creating a pull request, please raise an issue.

### Milestones

The default branch for this repository is `develop`. Merging `develop` into `main` will trigger a
release.

## Commits and release versioning

This repository uses Changesets to manage releases. Changesets are a way to group commits together
and describe the changes in a human-readable way.

### Creating a changeset

To create a changeset, run:

```sh
pnpm changeset
```

This will prompt you to select which packages have changed, and then to enter a summary of the changes.

### Creating a commit

Commit messages should be in the format:

```
type(scope?): message

Resolves #1
```

The scope should be included most of the time, and all allowed types and scopes are documented here:

- https://github.com/gisei-studio/turismo-roquetas-de-mar/blob/main/.commitlintrc.js

### How commits affect versions

By default, commits with the `feat` type will cause a minor version bump, and
commits with the `fix` or `perf` type will cause a patch version bump.

If your commit is a breaking change, which will create new major release, you
should add a footer with `BREAKING CHANGE: [message]`

```
feat(eslint): migrate to ESLint 8

Resolves #1

BREAKING CHANGE: see the ESLint 8 release notes for all breaking changes
```

In this example, the release notes would look like this:

> # 1.0.0 (2021-01-01)
>
> ### Features
>
> - eslint: migrate to ESLint 8 ([commit-hash])
>
> ### BREAKING CHANGES
>
> - eslint: see the ESLint 8 release notes for all breaking changes

## Updating dependencies

To check for outdated dependencies, run:

```sh
npx npm-check-updates
```

This lists which dependencies have updates. Unlike `npm outdated`,
`npm-check-updates` has a `-u` flag which conveniently updates `package.json`.

When updating packages, it's important to read the release notes for every
updated package, including minor updates, as rules and extended configs may
have changed.
