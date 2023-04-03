using System;
using System.IO;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using TestProject.Models;
using TestProject.Utils;

namespace TestProject.Controllers
{
    public class FileController : ApiController
    {
        // GET api/file/list?path={path}
        [HttpGet]
        public IHttpActionResult List(string path = null)
        {
            FileListResponse response = new FileListResponse();

            List<FileListResponse.FileInfo> fileList = new List<FileListResponse.FileInfo>();

            try
            {
                string filePath = string.IsNullOrEmpty(ConfigurationHelper.Path) ? 
                    Path.Combine(Directory.GetParent(Environment.CurrentDirectory).Parent.Parent.FullName, "test_dir")
                    : ConfigurationHelper.Path;

                if (!string.IsNullOrEmpty(path))
                {
                    // filePath = Path.Combine(filePath, path.Replace('/', Path.DirectorySeparatorChar));
                    filePath += Path.DirectorySeparatorChar + path.Replace('/', Path.DirectorySeparatorChar);
                }
                DirectoryInfo dirInfo = new DirectoryInfo(filePath);

                if (!dirInfo.Exists)
                {
                    throw new Exception("Directory does not exist!");
                }

                DirectoryInfo[] directories = dirInfo.GetDirectories("*", SearchOption.TopDirectoryOnly);

                foreach (DirectoryInfo dir in directories)
                {
                    fileList.Add(new FileListResponse.FileInfo("Directory", dir.Name, 0));
                }

                FileInfo[] files = dirInfo.GetFiles("*", SearchOption.TopDirectoryOnly);

                foreach (FileInfo file in files)
                {
                    fileList.Add(new FileListResponse.FileInfo("File", file.Name, file.Length));
                }

                response.FileList = fileList;
                response.Result = true;

            }
            catch (Exception e)
            {
                response.Result = false;
                response.ErrorCode = -2;
                response.ErrorMessage = e.Message;

            }

            return Json(response);
        }

        // GET api/file/download?path={path}
        [HttpGet]
        public HttpResponseMessage Download(string path)
        {
            try
            {
                if (string.IsNullOrEmpty(path))
                {
                    return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                }


                string filePath = string.IsNullOrEmpty(ConfigurationHelper.Path) ?
                    Path.Combine(Directory.GetParent(Environment.CurrentDirectory).Parent.Parent.FullName, "test_dir")
                    : ConfigurationHelper.Path;

                // string filePath = Path.Combine(ConfigurationHelper.Path, path);
                filePath += Path.DirectorySeparatorChar + path.Replace('/', Path.DirectorySeparatorChar);
                if (!File.Exists(filePath))
                {
                    return new HttpResponseMessage(System.Net.HttpStatusCode.NotFound);
                }

                string fileName = Path.GetFileName(filePath);

                HttpResponseMessage fileResponse = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                fileResponse.Content = new StreamContent(new FileStream(filePath, FileMode.Open, FileAccess.Read));
                fileResponse.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                fileResponse.Content.Headers.ContentDisposition.FileName = fileName;
                fileResponse.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");

                return fileResponse;
            }
            catch (Exception)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
            }

        }

        // POST api/file/upload
        [HttpPost]
        // public IHttpActionResult Upload([FromBody] string path, [FromBody] byte[] file)
        public IHttpActionResult Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new Exception("Bad Request!");
            }
            FileResponse response = new FileResponse();

            try
            {
                var path = HttpContext.Current.Request.Form["path"];
                var file = HttpContext.Current.Request.Files.Count > 0 ? HttpContext.Current.Request.Files[0] : null;
                
                if (file != null && file.ContentLength > 0)
                {
                    string filePath = string.IsNullOrEmpty(ConfigurationHelper.Path) ?
                        Path.Combine(Directory.GetParent(Environment.CurrentDirectory).Parent.Parent.FullName, "test_dir")
                        : ConfigurationHelper.Path;

                    // string filePath = Path.Combine(ConfigurationHelper.Path, path, Path.GetFileName(file.FileName));
                    filePath += Path.DirectorySeparatorChar;
                    if (!string.IsNullOrEmpty(path))
                    {
                        filePath += path.Replace('/', Path.DirectorySeparatorChar) + Path.DirectorySeparatorChar;
                    }
                    filePath += Path.GetFileName(file.FileName);

                    file.SaveAs(filePath);

                    if (File.Exists(filePath))
                    {
                        response.Result = true;
                    }
                    else
                    {
                        throw new Exception("Server Internal Error! File save failed.");
                    }

                }
                else
                {
                    throw new Exception("No upload file!");
                }
            }
            catch (Exception e)
            {
                response.Result = false;
                response.ErrorCode = -1;
                response.ErrorMessage = e.Message;
            }

            return Json(response);
        }

        // GET api/file/delete?path={path}
        [HttpDelete]
        public IHttpActionResult Delete(string path)
        {
            FileResponse response = new FileResponse();

            try
            {
                if (string.IsNullOrEmpty(path))
                {
                    throw new Exception("File path incorrect!");
                }

                string filePath = string.IsNullOrEmpty(ConfigurationHelper.Path) ?
                    Path.Combine(Directory.GetParent(Environment.CurrentDirectory).Parent.Parent.FullName, "test_dir")
                    : ConfigurationHelper.Path;
                // string filePath = Path.Combine(ConfigurationHelper.Path, path);
                filePath += Path.DirectorySeparatorChar + path.Replace('/', Path.DirectorySeparatorChar);
                
                FileAttributes attr = File.GetAttributes(filePath);
                if (attr.HasFlag(FileAttributes.Directory))
                {
                    Directory.Delete(filePath, true);
                }
                else
                {
                    File.Delete(filePath);
                }

                response.Result = true;
            }
            catch (Exception e)
            {
                response.Result = false;
                response.ErrorCode = -1;
                response.ErrorMessage = e.Message;
            }

            return Json(response);

        }
    }
}