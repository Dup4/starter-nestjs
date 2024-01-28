# starter-nestjs

[![Test](https://github.com/Dup4/starter-nestjs/actions/workflows/test.yml/badge.svg)](https://github.com/Dup4/starter-nestjs/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Dup4/starter-nestjs/branch/main/graph/badge.svg)](https://codecov.io/gh/Dup4/starter-nestjs)
[![GitHub release](https://img.shields.io/github/release/Dup4/starter-nestjs.svg)](https://GitHub.com/Dup4/starter-nestjs/releases/)

## Usage

### Docker

```bash
#! /bin/bash

CUR_DIR="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

docker run \
    -d \
    --restart=always \
    --name=starter-nestjs \
    -p 3000:3000 \
    -e TZ=Asia/Shanghai \
    -v "${CUR_DIR}"/config:/app/config \
    dup4/starter-nestjs:latest
```

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/Dup4">
    <img src='https://cdn.jsdelivr.net/gh/Dup4/static/sponsors-output/sponsors.svg' alt="Logos from Sponsors" />
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 - PRESENT [Dup4][dup4]

[dup4]: https://github.com/Dup4
