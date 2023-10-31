# goes-viewer

## Installation

Simply clone and enter the repo
```bash
git clone https://github.com/horsaen/goes-viewer && cd goes-viewer
```

Install dependancies
```bash
pnpm install
```

## Support
- GOES HRIT

## Setup
This project is meant for displaying data produced by SatDump, other tools are currently not supported, by are expected to be supported eventually.

Create a .env file with the following fields

```
NEXT_PUBLIC_LIVE_OUTPUT=/ssd/live_output
NEXT_PUBLIC_OTHER_DIRS=[{"dir": "/ssd/2023-07-16_01-37_goes_hrit_1694Mhz", "type": "goes_hrit"}, {"dir": "/asdf/asdfadsf/asdf", "type": "noaa_hrpt"}]
```

`NEXT_PUBLIC_LIVE_OUTPUT` is the main live_output folder from satdump, if there are other folders found outside of the live_output, you can use them with `NEXT_PUBLIC_OTHER_DIRS`
`NEXT_PUBLIC_OTHER_DIRS` is for defining external dirs, make sure that it uses proper JSON syntax, otherwise it won't work, as these dirs can have other names, please include a type along with the dir

Currently these are the supported types:

- goes_hrit

## Using

Build

```bash
pnpm build
```

Start
 
```bash
pnpm start
```

[Access](http://localhost:3000/)