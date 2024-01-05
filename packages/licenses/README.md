<img width="165" height="45" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Vodafone_2017_logo.svg/1280px-Vodafone_2017_logo.svg.png" alt="Vodafone">

# Licenses generator

The licenses generator will generate licenses for a given package/repository based on package dependencies specified in package.json

Dev dependencies are excluded.

It will only scan for licenses at the first level - it will not go through all dependent packages of the given package.

---

## How it works

1. Read package.json

2. Get all dependencies from the package.json file

3. Iterate through all dependencies and try to find `**/**/{LICENSE,LICENCE,COPYING}` ignoring node_modules

4. Parse and save output

---

## How to run it

```
node node_modules/@vodafoneuk/licenses-generator/index.js get --root packages/packageA
```

```
node node_modules/@vodafoneuk/licenses-generator/index.js get --root [path_to_package_json]
```

or

```
node node_modules/@vodafoneuk/licenses-generator/index.cjs get --root [path_to_package_json]
```

---

## Contents

- [Licenses generator](#licenses-generator)
  - [Contents](#contents)
  - [How it works](#how-it-works)
  - [Contributing](#contributing)
  - [Releases](#releases)
  - [People](#people)
  - [License](#license)

---

## Contributing

- Fork the repository.
- Make your changes.
- Send a pull request, ensuring that the application still runs and tests are passing.
- A member of our team will review and discuss your changes.

---

## Releases

- Create a PR.
- Make your changes.
- Manually prepare the release and release notes.
- Bump versions of the modified packages.
- Send a pull request, ensuring that the application still runs and tests are passing.
- Once merged, new release will be created automatically through `publish` action.

---

## People

Author: Vodafone UK

Current lead maintainer: [Radek Swiat](https://github.com/radswiat)

See all contributors [here](https://github.com/Vodafone/aim-mocking/graphs/contributors)

---

## License

[MIT License](https://github.com/Vodafone/aim-mocking/blob/main/packages/licenses/LICENSE)

[NOTICE](https://github.com/Vodafone/aim-mocking/blob/main/packages/licenses/NOTICE)
