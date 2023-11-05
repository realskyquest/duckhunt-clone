If you are on Windows, you might get a blank white screen. The reason for this is, accessing localhost from a UWP context is disabled by default. Run the following command with administrative privileges on the command prompt to fix this.

CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"

we recommend you to install the WebView2 runtime on Windows.

#RESOURCE HACKER

--// VERSION INFO

1 VERSIONINFO
FILEVERSION 1,0,0,0
PRODUCTVERSION 1,0,0,0
FILEOS 0x4
FILETYPE 0x1
{
BLOCK "StringFileInfo"
{
	BLOCK "000004B0"
	{
		VALUE "CompanyName", "realskyquest"
		VALUE "FileDescription", "made with phaser.js 3 + vite, audio from pixabay, art and design by realskyquest"
		VALUE "FileVersion", "1.0.0.0"
		VALUE "InternalName", "duckhunt-clone.exe"
		VALUE "LegalCopyright", "© realskyquest. All rights reserved."
		VALUE "OriginalFilename", "duckhunt-clone.exe"
		VALUE "ProductName", "duckhunt-clone.exe"
		VALUE "ProductVersion", "1.0.0"
		VALUE "Assembly Version", "1.0.0.0"
	}
}

BLOCK "VarFileInfo"
{
	VALUE "Translation", 0x0000 0x04B0  
}
}
