# NASA Frontend
NCKU NASA judge Frontend service

- [Install](#Install)
- [Remove](#Remove)

## Install
1. clone this repo and cd into nasa-judge.

```bash
git clone https://github.com/NCKU-NASA/nasa-judge
cd nasa-judge
```

2. run `bash install.sh -h` to see help
```bash
Usage: install.sh [options]
Options:
  -h, --help                            display this help message and exit.
  -hn, --hostname HOSTNAME              hostname.
  -f, --fastmode                        build only.
  -d, --webdir DIR                      dir for fronend.
  -bu, --backendurl URL                 url of backend.
  -vu, --vncproxyurl URL                url of vncproxy.
  -e, --emails email1,email2...         emails for letsencrypt
  -c, --cert                            cert info.
      -cn                                   cert cn
      -ds, --domains domain1,domain2...     cert domains
```

3. run `install.sh` with options

```bash
bash install.sh [options]
```

5. Restart it with systemd.
``` bash
systemctl restart nginx.service
```

## Remove
### TODO