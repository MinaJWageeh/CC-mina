Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & Replace(WScript.ScriptFullName, "run-desktop.vbs", "Classic-Control-Studio.bat") & Chr(34), 0
Set WshShell = Nothing
