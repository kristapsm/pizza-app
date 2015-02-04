@echo off
setlocal enabledelayedexpansion

set CLASSPATH=
set DIR=%~DP0
set CACHE=%USERPROFILE%\.bootstrap
if not exist %CACHE% mkdir %CACHE%
set WGET=%DIR%wget.exe
set UNZIPP=%DIR%unzip.exe
echo %PATH% | findstr /srn [\^"] >nul
if "%errorlevel%"=="0" (
  set "PATH=%PATH:"=%"
)

net session >nul 2>&1
if "%errorLevel%" == "0" (
  set ADMIN=Y
  echo Script is running with administration rights
  echo --!date:~4,11! !time:~0,8!-- Script is running with administration rights > "%DIR%console.log"
) else (
    set ADMIN=N
    set PATH=
    echo Script is running without administration rights
    echo --!date:~4,11! !time:~0,8!-- Script is running without administration rights > "%DIR%console.log"
  )
if not "%JENKINS_HOME%" == "" ( 
  set "jenkins=y"
  echo Script is running from Jenkins
  echo --!date:~4,11! !time:~0,8!-- Script is running from Jenkins >> "%DIR%\console.log" 
  ) else ( 
      set "jenkins=n" 
	)
echo --!date:~4,11! !time:~0,8!-- Starting script >> "%DIR%\console.log"
for /f "tokens=1,2,3 delims==" %%a in (%DIR%bootstrap-win.properties) do (
    if "%ADMIN%" == "N" (
      if NOT "%%a" == "NONE" (
	    if not exist %CACHE%\%%b (
          echo Downloading %%b ...
          echo Downloading %%b ... >> "%DIR%console.log"
          @%WGET% --tries=3 --no-check-certificate -e dotbytes=10M --output-document=%CACHE%\%%b.zip %%c 2>>console.log || exit /b 1
          mkdir %CACHE%\%%b
          echo Extracting %CACHE%\%%b.zip ...
          echo --!date:~4,11! !time:~0,8!-- Extracting %CACHE%\%%b.zip ... >> "%DIR%console.log"
          @%UNZIPP% -q %CACHE%\%%b.zip -d %CACHE%\%%b || exit /b 1
		)
      )
    ) else (
		if "%%b" == "eclipse-4.3.2" (
		  if NOT exist "C:\valhalla-bootstrap\" mkdir "C:\valhalla-bootstrap\"
		  if NOT exist "C:\valhalla-bootstrap\%%b" (
		    echo Downloading %%b ...
            echo Downloading %%b ... >> "%DIR%console.log"
		    @%WGET% --tries=3 --no-check-certificate -e dotbytes=10M --output-document=%CACHE%\%%b.zip %%c 2>>"%DIR%console.log" || exit /b 1
		    mkdir C:\valhalla-bootstrap\%%b
		    echo Extracting %CACHE%\%%b.zip ...
			echo --!date:~4,11! !time:~0,8!-- Extracting %CACHE%\%%b.zip ... >> "%DIR%console.log"
		    @%UNZIPP% -q %CACHE%\%%b.zip -d C:\valhalla-bootstrap\%%b || exit /b 1
		  )
		) else (
		    if not exist %CACHE%\%%b (
			  echo Downloading %%b ...
              echo Downloading %%b ... >> "%DIR%console.log"
              @%WGET% --tries=3 --no-check-certificate -e dotbytes=10M --output-document=%CACHE%\%%b.zip %%c 2>>"%DIR%console.log" || exit /b 1
              mkdir %CACHE%\%%b
              echo Extracting %CACHE%\%%b.zip ...
              echo --!date:~4,11! !time:~0,8!-- Extracting %CACHE%\%%b.zip ... >>"%DIR%console.log"
              @%UNZIPP% -q %CACHE%\%%b.zip -d %CACHE%\%%b || exit /b 1
			)
		  )
      )
  if "%ADMIN%" == "N" (
    if NOT "%%a" == "NONE" (
	  set %%a=%CACHE%\%%b
      echo %%a=%CACHE%\%%b
      echo --!date:~4,11! !time:~0,8!-- %%a=%CACHE%\%%b >> "%DIR%console.log"
      set PATH=%CACHE%\%%b\bin;!PATH!
    )
  )
  if "%ADMIN%" == "Y" (
    if NOT "%%a" == "NONE" (
	  set needToSet=n
	  if "%jenkins%" == "y" (
	    set needToSet=y
	  ) else (
	      if "%%a" == "JAVA_HOME" (
	        if NOT "%JAVA_HOME%" == "%CACHE%\%%b" ( set "needToSet=y" ) else ( echo --!date:~4,11! !time:~0,8!-- %%a already set >> "%DIR%console.log" )
	      )
	      if "%%a" == "GRADLE_HOME" (
	        if NOT "%GRADLE_HOME%" == "%CACHE%\%%b" ( set "needToSet=y" ) else ( echo --!date:~4,11! !time:~0,8!-- %%a already set >> "%DIR%console.log" )
	      )
	    )
	  if "!needToSet!" == "y" (
	    if "%jenkins%" == "n" ( set /p answer=Set %%a on your computer?[y/n] ) else ( set "answer=y" )
        if "!answer!" == "y" (
		  if not "%jenkins%" == "y" ( setx %%a "%CACHE%\%%b" /m || exit 1 )
          set %%a=%CACHE%\%%b
          echo %%a=%CACHE%\%%b
          echo --!date:~4,11! !time:~0,8!-- %%a=%CACHE%\%%b >> "%DIR%console.log"
          set PATH=!PATH:;%CACHE%\%%b\bin=!
          set PATH=!PATH:%CACHE%\%%b\bin;=!
          set PATH=%CACHE%\%%b\bin;!PATH!
		  set needToSetPATH=y
        ) else ( echo --!date:~4,11! !time:~0,8!-- %%a was not set >> "%DIR%console.log" )
	  )
    ) else (
        for /f "tokens=1 delims=-" %%g in ("%%b") do (
          if "%%g" == "chefdk" (
            echo --!date:~4,11! !time:~0,8!-- Looking for ChefDK installation in "C:\opscode\" ... >> "%DIR%console.log"
            if NOT exist "C:\opscode\" (
              echo --!date:~4,11! !time:~0,8!-- ChefDK installation not found >> "%DIR%console.log"
              cd %CACHE%\%%b
              echo Install ChefDK in the default location
              start /wait %%b.msi || exit 1
              if exist "C:\opscode\" (
              echo --!date:~4,11! !time:~0,8!-- ChefDK installed in "C:\opscode\" >> "%DIR%console.log"
              )
            ) else (
                echo --!date:~4,11! !time:~0,8!-- ChefDK installation found in "C:\opscode\" . Skipping >> "%DIR%console.log"
              ) 
          )
          if "%%g" == "git" (
            echo --!date:~4,11! !time:~0,8!-- Looking for Git installation in "C:\Program files (x86)\Git\" ... >> "%DIR%console.log"
            if NOT exist "C:\Program files (x86)\Git\" (
			  echo --!date:~4,11! !time:~0,8!-- Git installation not found >> "%DIR%console.log"
			  echo --!date:~4,11! !time:~0,8!-- Looking for Git installation in "C:\Program files\Git\" ... >> "%DIR%console.log"
              if NOT exist "C:\Program files\Git\" (
			    echo --!date:~4,11! !time:~0,8!-- Git installation not found >> "%DIR%console.log"
                cd %CACHE%\%%b
                echo Install GIT in the default location
                start /wait %%b.exe || exit 1
                if exist "C:\Program files (x86)\Git\" (
                  echo --!date:~4,11! !time:~0,8!-- Git installed in "C:\Program files (x86)\Git\" >> "%DIR%console.log"
                )
				if exist "C:\Program files\Git\" (
                  echo --!date:~4,11! !time:~0,8!-- Git installed in "C:\Program files\Git\" >> "%DIR%console.log"
                )
			  ) else (
			      echo --!date:~4,11! !time:~0,8!-- Git installation found in "C:\Program files\Git\" . Skipping >> "%DIR%console.log"
				)
            ) else (
                echo --!date:~4,11! !time:~0,8!-- Git installation found in "C:\Program files (x86)\Git\" . Skipping >> "%DIR%console.log"
              )
          )
          if "%%g" == "vagrant" (
            echo --!date:~4,11! !time:~0,8!-- Looking for Vagrant installation in "C:\HashiCorp\Vagrant\" ... >> "%DIR%console.log"
            if NOT exist "C:\HashiCorp\Vagrant\" (
              echo --!date:~4,11! !time:~0,8!-- Vagrant installation not found >> "%DIR%console.log"
              cd %CACHE%\%%b
              echo Install Vagrant in the default location
              start /wait %%b.msi || exit 1
              if NOT exist %%g-setup (
                mkdir %%g-setup
                echo Extracting %%g-setup
                echo Extracting %%g-setup >>"%DIR%console.log"
                @%UNZIPP% -q %%g-setup.zip -d %%g-setup || exit 1
              )
              if exist "C:\HashiCorp\Vagrant\" (
                echo --!date:~4,11! !time:~0,8!-- Vagrant installed in "C:\HashiCorp\Vagrant\" >> "%DIR%console.log"
                set PATH=!PATH:;C:\HashiCorp\Vagrant\bin=!
                set PATH=!PATH:C:\HashiCorp\Vagrant\bin;=!
                set PATH=C:\HashiCorp\Vagrant\bin;!PATH!
				set needToSetPATH=y
                echo --!date:~4,11! !time:~0,8!-- C:\HashiCorp\Vagrant\ added to PATH >> "%DIR%console.log"
              )
            ) else (
                echo --!date:~4,11! !time:~0,8!-- Vagrant installation found in "C:\HashiCorp\Vagrant\" . Skipping >> "%DIR%console.log"
                set PATH=!PATH:;C:\HashiCorp\Vagrant\bin=!
                set PATH=!PATH:C:\HashiCorp\Vagrant\bin;=!
                set PATH=C:\HashiCorp\Vagrant\bin;!PATH!
				set needToSet=y
                echo --!date:~4,11! !time:~0,8!-- C:\HashiCorp\Vagrant\ added to PATH >> "%DIR%console.log"
              )
          )
          if "%%g" == "VirtualBox" (
            echo --!date:~4,11! !time:~0,8!-- Looking for VirtualBox installation in "C:\Program files\Oracle\VirtualBox\" ... >> "%DIR%console.log"
            if NOT exist "C:\Program files\Oracle\VirtualBox\" (
			  echo --!date:~4,11! !time:~0,8!-- VirtualBox installation not found >> "%DIR%\console.log"
			  echo --!date:~4,11! !time:~0,8!-- Looking for VirtualBox installation in "C:\Program files (x86)\Oracle\VirtualBox\" ... >> "%DIR%console.log"
              if NOT exist "C:\Program files (x86)\Oracle\VirtualBox\" (
			    echo --!date:~4,11! !time:~0,8!-- VirtualBox installation not found >> "%DIR%\console.log"
                cd %CACHE%\%%b
                echo Install VirtualBox in the default location
                start /wait %%b.exe || exit 1
                if exist "C:\Program files\Oracle\VirtualBox\" (
                  echo --!date:~4,11! !time:~0,8!-- VirtualBox installed in "C:\Program files\Oracle\VirtualBox\" >> "%DIR%console.log"
                )
				if exist "C:\Program files (x86)\Oracle\VirtualBox\" (
                  echo --!date:~4,11! !time:~0,8!-- VirtualBox installed in "C:\Program files (x86)\Oracle\VirtualBox\" >> "%DIR%console.log"
                )
			  ) else (
			      echo --!date:~4,11! !time:~0,8!-- VirtualBox installation found in "C:\Program files (x86)\Oracle\VirtualBox\" . Skipping >> "%DIR%console.log"
				)
            ) else (
                echo --!date:~4,11! !time:~0,8!-- VirtualBox installation found in "C:\Program files\Oracle\VirtualBox\" . Skipping >> "%DIR%console.log"
              )
          )
          if "%%g" == "mysql" (
            echo --!date:~4,11! !time:~0,8!-- Looking for MySQL installation in "C:\Program files\MySQL\" ... >> "%DIR%console.log"
            if NOT exist "C:\Program files\MySQL\" (
			  echo --!date:~4,11! !time:~0,8!-- MySQL installation not found >> "%DIR%console.log"
			  echo --!date:~4,11! !time:~0,8!-- Looking for MySQL installation in "C:\Program files (x86)\MySQL\" ... >> "%DIR%console.log"
              if NOT exist "C:\Program files (x86)\MySQL\" (
			    echo --!date:~4,11! !time:~0,8!-- MySQL installation not found >> "%DIR%console.log"
                cd %CACHE%\%%b
                echo Install MySQL in the default location
                start /wait %%b.msi || exit 1
                if exist "C:\Program files\MySQL\" (
                  echo --!date:~4,11! !time:~0,8!-- MySQL installed in "C:\Program files\MySQL\" >> "%DIR%console.log"
                )
				if exist "C:\Program files (x86)\MySQL\" (
                  echo --!date:~4,11! !time:~0,8!-- MySQL installed in "C:\Program files (x86)\MySQL\" >> "%DIR%console.log"
                )
			  ) else (
			      echo --!date:~4,11! !time:~0,8!-- MySQL installation found in "C:\Program files (x86)\MySQL\" . Skipping >> "%DIR%console.log"
			    )
            ) else (
                echo --!date:~4,11! !time:~0,8!-- MySQL installation found in "C:\Program files\MySQL\" . Skipping >> "%DIR%console.log"
              )
          )
        )
      )
  )
)
if "%ADMIN%"=="N" (
  for /f "tokens=1,2,3 delims=+" %%m in ("!PATH!+!GRADLE_HOME!+!JAVA_HOME!") do (
    endlocal
    SET PATH=%%m
	echo PATH=%%m
	set GRADLE_HOME=%%n
	set JAVA_HOME=%%o
    echo Script was not run with administration rights
    echo Only necessary variables were set
    (
    echo --%date:~4,11% %time:~0,8%-- PATH=%%m
    echo Script was not run with administration rights
    echo Only necessary variables were set
    ) >> "%DIR%console.log"
	exit /b 0
  )
) else (
    for /f "tokens=1,2,3 delims=+" %%j in ("!PATH!+!GRADLE_HOME!+!JAVA_HOME!") do (
      echo.
	  if not "%jenkins%" == "y" ( 
	    if "!needToSetPATH!" == "y" ( set /p panswer=Set PATH to %%j ?[y/n] ) else ( set "panswer=n" )
		) else ( 
		    set "panswer=y" 
		  )
      if "!panswer!" == "y" (
        endlocal
		if not "%jenkins%" == "y" ( setx PATH "%%j" /m || exit 1 )
        set PATH=%%j
        echo PATH=%%j
        echo --%date:~4,11% %time:~0,8%-- PATH=%%j >>"%DIR%\console.log"
      ) else (
          echo --%date:~4,11% %time:~0,8%-- PATH was not changed >> "%DIR%console.log"
        )
	endlocal
	set GRADLE_HOME=%%k
	set JAVA_HOME=%%l
    )
	exit /b 0
  )
@echo on