Systemd Parity services
==

## Steps to create Service

```
$ sudo nano /etc/systemd/system/parity.service //create file on path pasting parity*.service content
$ sudo systemctl start parity.service //to start service
$ sudo systemctl enable parity.service //to enable serice as daemon

```
