#!/bin/bash

set -e

printhelp()
{
	echo "Usage: $0 [options]
Options:
  -h, --help                            display this help message and exit.
  -d, --webdir DIR                      dir for fronend.
  -bh, --backendhost HOST               host of backend.
  -vh, --vncproxyhost HOST              host of vncproxy.
  -e, --emails email1,email2...         emails for letsencrypt
  -c, --cert                            cert info.
      -cn                                   cert cn
      -ds, --domains domain1,domain2...     cert domains" 1>&2
	exit 1
}

gencert()
{
    output=$(echo "{}" | jq -c ".cn = \"$cn\"")
    echo "$output" | jq -c ".domains = $(echo "\"$domains\"" | jq -c 'split(",")')"
}

dirpath=$(dirname "$0")

webdir="/var/www/nasajudge"
backendhost="localhost:3000"
vncproxyhost="localhost:4000"
emails="[]"
certs="[]"
oncerts=false

while [ "$1" != "" ]
do
    case "$1" in
        -h|--help)
            printhelp
            ;;
        -d|--webdir)
            shift
            if $oncerts
            then
                certs=$(echo "$certs" | jq -c ". + [$(gencert)]")
                oncerts=false
            fi
            webdir=$1
            ;;
        -bh|--backendhost)
            shift
            if $oncerts
            then
                certs=$(echo "$certs" | jq -c ". + [$(gencert)]")
                oncerts=false
            fi
            backendhost=$1
            ;;
        -vh|--vncproxyhost)
            shift
            if $oncerts
            then
                certs=$(echo "$certs" | jq -c ". + [$(gencert)]")
                oncerts=false
            fi
            vncproxyhost=$1
            ;;
        -e|--emails)
            shift
            if $oncerts
            then
                certs=$(echo "$certs" | jq -c ". + [$(gencert)]")
                oncerts=false
            fi
            emails=$(echo "\"$1\"" | jq -c 'split(",")')
            #emails=$(echo $emails | jq -c ". + [\"$1\"]")
            ;;
        -c|--cert)
            shift
            if $oncerts
            then
                certs=$(echo "$certs" | jq -c ". + [$(gencert)]")
                oncerts=false
            fi
            oncert=true
            domains="[]"
            cn=""
            ;;
        -cn)
            shift
            if $oncerts
            then
                cn=$1
            fi
            ;;
        -ds|--domains)
            shift
            if $oncerts
            then
                domains=$(echo "\"$1\"" | jq -c 'split(",")')
            fi
            ;;
    esac
    shift
done

if $oncerts
then
    certs=$(echo "$certs" | jq -c ". + [$(gencert)]")
    oncerts=false
fi

ansible-playbook $dirpath/setup.yml -e "{\"webdir\":\"$webdir\",\"backendhost\":\"$backendhost\",\"vncproxyhost\":\"$vncproxyhost\",\"emails\":$emails, \"certs\":$certs}"

echo ""
echo ""
echo "NASA Judge Frontend install.sh complete."
echo "Fix your config file at /etc/nginx/sites-enabled/nasa"
echo "Then you can use systemctl start nginx.service to start the service"
