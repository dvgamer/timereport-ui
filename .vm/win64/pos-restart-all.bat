@echo off
nssm restart pos-devops
nssm restart pos-api
nssm restart pos-auth
nssm restart pos-logger-1
nssm restart pos-logger-2
nssm restart pos-socket