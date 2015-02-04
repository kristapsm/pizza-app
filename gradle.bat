@setlocal

@call .\bootstrap\bootstrap.bat || exit /b 1
%GRADLE_HOME%\bin\gradle %*

@endlocal