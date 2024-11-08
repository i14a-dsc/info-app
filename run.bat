@echo off
:a
setlocal
pushd %~dp0
node . -A
endlocal
goto a
