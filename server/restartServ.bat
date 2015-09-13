start cmd /K call bat/pm2/delete.bat
timeout /T 3
start cmd /C call stopServ.bat
timeout /T 3
start cmd /K call startserv.bat