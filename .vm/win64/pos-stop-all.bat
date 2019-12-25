@echo off
nssm stop pos-devops
nssm stop pos-api
nssm stop pos-auth
nssm stop pos-logger-1
nssm stop pos-logger-2
nssm stop pos-socket
nssm stop pos-sync