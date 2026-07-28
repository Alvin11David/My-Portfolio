@echo off
setlocal
set MAVEN_WRAPPER_DIR=%~dp0.mvn\wrapper
set MAVEN_WRAPPER_JAR=%MAVEN_WRAPPER_DIR%\maven-wrapper.jar
set MAVEN_WRAPPER_PROPERTIES=%MAVEN_WRAPPER_DIR%\maven-wrapper.properties
set MAVEN_PROJECT_DIR=%~dp0
if not exist "%MAVEN_WRAPPER_JAR%" (
    echo Downloading Maven Wrapper...
)
java -cp "%MAVEN_WRAPPER_JAR%" io.takari.maven.wrapper.MavenWrapperMain --maven-wrapperProperties "%MAVEN_WRAPPER_PROPERTIES%" --maven-projectDir "%MAVEN_PROJECT_DIR%" %*
endlocal
