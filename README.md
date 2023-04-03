# File & Directory Browsing Single Page App
This task is to create a web service API that allows users to query the contents of a directory on the web server and a single page web app that can be used to search and browse folders and files.
A server side home directory should be configurable via variable.

## Prerequired
You have install Visual Studio 2019 or newer.
If you want build the Front end on your side, install NPM and Node v18 too.

## Quick Start Guide
Through this web app, you can browse the directories or files recursively on the web server and download or upload files to web server too. Web App is `deep-linkable`[^1] so you can restore the previous state using url.

To start Web App, please follow the below steps.
1. Run Visual Studio and open `TestProject.sln`.
2. Press `F5` or `Ctrl+F5` to run the Web Server.
3. You can visit Web Sever(`http://localhost:8088`) from you web browser.

You can easily change the web server port and root directory path from the project.

### How to change the root path
```
<configuration>
  <appSettings>
    <add key="Path" value="Change the path from here"/>
```

### How to change the web server port from property of TestProject.
```
<ProjectExtensions>
    <VisualStudio>
          ...
          <servers defaultServer="SelfHostServer">
            <server name="SelfHostServer" exePath="" cmdArgs="" url="http://localhost:8088/" workingDir="" />
          </servers>
          ...
    </VisualStudio>
  </ProjectExtensions>
```

## API Doc

| API       | URL                 | METHOD   |
|-----------|---------------------|----------|
| List      | api/file/list       | GET      |
| Download  | api/file/download   | GET      |
| Upload    | api/file/upload     | POST     |
| Delete    | api/file/delete     | DELETE   |


### 1. List endpoint
Through the endpoint, you can easily browse directories and files on the web server. Url should be `api/file/list`.

Results are returned as JSON array format and each element should be prototype as below.

| Field Name    | Description                                                                          |
|---------------|--------------------------------------------------------------------------------------|
| Result        | `True` or `False`                                                                    |
| FileList      | Array of Entry Prototype which contains the browse result                            |
| ErrorCode     | Non-zero means error                                                                 |
| ErrorMessage  | Contains error message if ErrorCode is not Zero                                      |

Entry Prototype
| Field Name    | Description                                                                          |
|---------------|--------------------------------------------------------------------------------------|
| Type   | Indicate the type of entry. `Directory` stands for directory and `File` indicate the file.  |
| Name   | Name of the directory or file                                                               |
| Size   | non-zero integer value for file size, 0 for directory                                       |

To browse the sub directory, send `?path=/xxxx/yyyy` at end of the endpoint.[^2]

### 2. Download endpoint
You can download files from the web server using `api/file/download?path=[relative path]` endpoint.

### 3. Upload endpoint
Also upload file to the web server using `api/file/upload` endpoint.
Contents should be uploaded as `POST`

Contents
| Field Name    | Description                               |
|---------------|-------------------------------------------|
| Path          | Relative path where file will be located  |
| File          | Content of the file                      |

### 4. Delete endpoint
To delete the directory or file, use `api/file/delete?path=[relative path]` endpoint.

## Backend project test
You can test Web Side APIs using `TestProjects.Test`.

## Frontend project test and build
If you want customize the Web page, you can do it from `frontend` project.

### Setup configuration
Rename `.env.example` to `.env` and change the `BACKEND_URL` as you want.
| Env var       | Description                                     |
|---------------|-------------------------------------------------|
| BACKEND_URL   | Web API Server url(eg: http://localhost:8088)   |

### Test 
You can test Front End project as following
```
$ npm install
$ npm run test
```

### Build
After test passed, use `npm run build`.

After build is done, you can see `build` directory inside the `frontend`.
Copy the files under `build` to `TestProject` and overwrite already existing `index.html` and others(`static` directory).

[^1]: The state of the UI should be kept in the URL
[^2]: Path must be relative
