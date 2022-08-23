# starter-nestjs

[![Test](https://github.com/Dup4/starter-nestjs/actions/workflows/test.yml/badge.svg)](https://github.com/Dup4/starter-nestjs/actions/workflows/test.yml)
[![Lint](https://github.com/Dup4/starter-nestjs/actions/workflows/lint.yml/badge.svg)](https://github.com/Dup4/starter-nestjs/actions/workflows/lint.yml)
[![codecov](https://codecov.io/gh/Dup4/starter-nestjs/branch/main/graph/badge.svg)](https://codecov.io/gh/Dup4/starter-nestjs)
[![GitHub release](https://img.shields.io/github/release/Dup4/starter-nestjs.svg)](https://GitHub.com/Dup4/starter-nestjs/releases/)

## Usage

### Docker

```bash
#! /bin/bash

TOP_DIR="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"

docker run \
    -d \
    --restart=always \
    --name=starter-nestjs \
    -p 3000:3000 \
    -e TZ=Asia/Shanghai \
    -v "${TOP_DIR}"/config:/app/config \
    dup4/starter-nestjs:latest
```

## License

[MIT](./LICENSE) License © 2022 [Dup4](https://github.com/Dup4)
