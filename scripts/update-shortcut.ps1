$wsh = New-Object -ComObject WScript.Shell
$sc = $wsh.CreateShortcut('C:\Users\Administrator\Desktop\Classic Control Studio.lnk')
$sc.IconLocation = 'e:\programing\projects\CC-mina\app-icon.ico,0'
$sc.Save()
Write-Output "Shortcut icon set to e:\programing\projects\CC-mina\app-icon.ico"
