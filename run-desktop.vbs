Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "e:\programing\projects\CC-mina"
WshShell.Run "node desktop-runner.js", 0, False
Set WshShell = Nothing
