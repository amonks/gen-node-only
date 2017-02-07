# node-only

yeoman-style boilerplate for a node-only package for npm (babel, no webpack).

## setup

clone this, then 

```bash
$ yarn
$ yarn build
$ yarn install-globally
```


## use it

```bash
$ gen-node-only
? project npm name? thingy
💥

$ ls thingy
LICENSE.md   README.md    package.json src

$ tree thingy
thingy
├── LICENSE.md
├── README.md
├── package.json
└── src
    └── index.js

1 directory, 4 files
```

